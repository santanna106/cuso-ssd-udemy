(function () {
  'use strict';
  var storage = window.RealtorStorage;
  var propertyApi = window.RealtorProperties;
  var page = document.body.getAttribute('data-page') || 'dashboard';
  storage.seed();

  function fieldValue(form, name) { return form.elements[name].value; }
  function errorText(errors) { return Object.keys(errors).map(function (key) { return errors[key]; }).join(' '); }
  function propertyForm(property) {
    property = property || {};
    var statuses = storage.propertyStatuses.map(function (status) { var label = window.RealtorUI.statusLabel(status); return '<option value="' + status + '"' + (property.status === status ? ' selected' : '') + '>' + label + '</option>'; }).join('');
    return '<form id="property-form" class="form-card"><div id="form-message"></div><div class="form-grid"><div class="field"><label for="title">Título *</label><input id="title" name="title" required value="' + (property.title || '') + '"></div><div class="field"><label for="address">Endereço *</label><input id="address" name="address" required value="' + (property.address || '') + '"></div><div class="field"><label for="price">Preço mensal *</label><input id="price" name="price" type="number" min="0.01" step="0.01" required value="' + (property.price || '') + '"></div><div class="field"><label for="status">Status *</label><select id="status" name="status" required><option value="">Selecione</option>' + statuses + '</select></div><div class="field"><label for="bedrooms">Quartos *</label><input id="bedrooms" name="bedrooms" type="number" min="1" step="1" required value="' + (property.bedrooms || '') + '"></div><div class="field"><label for="bathrooms">Banheiros *</label><input id="bathrooms" name="bathrooms" type="number" min="1" step="1" required value="' + (property.bathrooms || '') + '"></div><div class="field field--wide"><label for="image">URL da imagem</label><input id="image" name="image" type="url" value="' + (property.image || '') + '"></div><div class="field field--wide"><label for="description">Descrição</label><textarea id="description" name="description">' + (property.description || '') + '</textarea></div></div><div class="form-actions"><button class="button" type="submit">Salvar imóvel</button><a class="button button--quiet" href="properties.html">Cancelar</a></div></form>';
  }
  function renderProperties() {
    var filter = document.getElementById('status-filter');
    var status = filter ? filter.value : '';
    var items = propertyApi.listProperties({ status: status });
    document.getElementById('property-results').innerHTML = items.length ? items.map(window.RealtorUI.card).join('') : '<p class="empty">Nenhum imóvel encontrado para este filtro.</p>';
    document.getElementById('property-count').textContent = items.length + (items.length === 1 ? ' imóvel encontrado.' : ' imóveis encontrados.');
  }
  function renderPropertyPage() {
    var content = '<header class="topbar"><div><p class="eyebrow">Carteira</p><h1>Meus imóveis</h1><p id="property-count" class="muted"></p></div><a class="button" href="add-property.html">+ Novo imóvel</a></header><div class="toolbar"><label for="status-filter">Filtrar por status</label><select id="status-filter"><option value="">Todos</option>' + storage.propertyStatuses.map(function (status) { return '<option value="' + status + '">' + window.RealtorUI.statusLabel(status) + '</option>'; }).join('') + '</select></div><section id="property-results" class="property-grid"></section>';
    document.getElementById('app').innerHTML = window.RealtorUI.shell('properties', content); document.getElementById('status-filter').addEventListener('change', renderProperties); renderProperties();
  }
  function renderFormPage(editing) {
    var id = new URLSearchParams(window.location.search).get('id');
    var property = editing ? propertyApi.find(id) : null;
    if (editing && !property) { storage.setFlash('Imóvel não encontrado.', 'error'); window.location.href = 'properties.html'; return; }
    var title = editing ? 'Editar imóvel' : 'Novo imóvel';
    document.getElementById('app').innerHTML = window.RealtorUI.shell(editing ? 'properties' : 'add-property', '<header class="topbar"><div><p class="eyebrow">Carteira</p><h1>' + title + '</h1><p class="muted">Preencha os dados da propriedade.</p></div></header>' + propertyForm(property));
    document.getElementById('property-form').addEventListener('submit', function (event) {
      event.preventDefault(); var form = event.currentTarget; var data = {}; ['title', 'address', 'price', 'description', 'status', 'bedrooms', 'bathrooms', 'image'].forEach(function (name) { data[name] = fieldValue(form, name); });
      if (!window.RealtorUI.confirmAction(editing ? 'Confirma as alterações deste imóvel?' : 'Confirma o cadastro deste imóvel?')) return;
      var result = editing ? propertyApi.updateProperty(id, data) : propertyApi.createProperty(data);
      if (!result.property) { document.getElementById('form-message').innerHTML = window.RealtorUI.flash(errorText(result.errors), 'error'); return; }
      storage.setFlash(editing ? 'Imóvel atualizado com sucesso.' : 'Imóvel criado com sucesso.'); window.location.href = 'properties.html';
    });
  }
  function renderDashboard() { var items = propertyApi.all(); document.getElementById('app').innerHTML = window.RealtorUI.shell('dashboard', '<header class="topbar"><div><p class="eyebrow">Visão geral</p><h1>Bom dia, gestor.</h1><p class="muted">Acompanhe o que está acontecendo com seus imóveis.</p></div><a class="button" href="pages/add-property.html">+ Novo imóvel</a></header><div id="flash"></div><section class="panel"><div class="panel-heading"><h2>Imóveis recentes</h2><a class="button button--quiet" href="pages/properties.html">Ver todos</a></div><div class="property-grid">' + items.slice(0, 3).map(window.RealtorUI.card).join('') + '</div></section>'); var flash = storage.takeFlash(); if (flash) document.getElementById('flash').innerHTML = window.RealtorUI.flash(flash.message, flash.type); }
  if (page === 'dashboard') renderDashboard(); else if (page === 'properties') renderPropertyPage(); else if (page === 'add-property') renderFormPage(false); else if (page === 'edit-property') renderFormPage(true); else document.getElementById('app').innerHTML = window.RealtorUI.shell('dashboard', '<section class="form-card"><p class="muted">Fluxo ainda não disponível.</p></section>');
}());
