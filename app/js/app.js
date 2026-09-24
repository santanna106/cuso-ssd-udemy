(function () {
  'use strict';
  var storage = window.RealtorStorage;
  var propertyApi = window.RealtorProperties;
  var tenantApi = window.RealtorTenants;
  var rentalApi = window.RealtorRentals;
  var page = document.body.getAttribute('data-page') || 'dashboard';
  storage.seed();

  function fieldValue(form, name) { return form.elements[name].value; }
  function errorText(errors) { return Object.keys(errors).map(function (key) { return errors[key]; }).join(' '); }
  function propertyForm(property) {
    property = property || {};
    var statuses = storage.propertyStatuses.map(function (status) { var label = window.RealtorUI.statusLabel(status); return '<option value="' + status + '"' + (property.status === status ? ' selected' : '') + '>' + label + '</option>'; }).join('');
    return '<form id="property-form" class="form-card"><div id="form-message"></div><div class="form-grid"><div class="field"><label for="title">Título *</label><input id="title" name="title" required value="' + (property.title || '') + '"></div><div class="field"><label for="address">Endereço *</label><input id="address" name="address" required value="' + (property.address || '') + '"></div><div class="field"><label for="price">Preço mensal *</label><input id="price" name="price" type="number" min="0.01" step="0.01" required value="' + (property.price || '') + '"></div><div class="field"><label for="status">Status *</label><select id="status" name="status" required><option value="">Selecione</option>' + statuses + '</select></div><div class="field"><label for="bedrooms">Quartos *</label><input id="bedrooms" name="bedrooms" type="number" min="1" step="1" required value="' + (property.bedrooms || '') + '"></div><div class="field"><label for="bathrooms">Banheiros *</label><input id="bathrooms" name="bathrooms" type="number" min="1" step="1" required value="' + (property.bathrooms || '') + '"></div><div class="field field--wide"><label for="image">URL da imagem</label><input id="image" name="image" type="url" value="' + (property.image || '') + '"></div><div class="field field--wide"><label for="description">Descrição</label><textarea id="description" name="description">' + (property.description || '') + '</textarea></div></div><div class="form-actions"><button class="button" type="submit">Salvar imóvel</button><a class="button button--quiet" href="properties.html">Cancelar</a></div></form>';
  }
  function tenantForm(tenant) {
    tenant = tenant || {};
    return '<form id="tenant-form" class="form-card"><div id="form-message"></div><div class="form-grid"><div class="field field--wide"><label for="name">Nome completo *</label><input id="name" name="name" required value="' + (tenant.name || '') + '"></div><div class="field"><label for="email">E-mail *</label><input id="email" name="email" type="email" required value="' + (tenant.email || '') + '"></div><div class="field"><label for="phone">Telefone *</label><input id="phone" name="phone" required value="' + (tenant.phone || '') + '"></div><div class="field field--wide"><label for="documentId">Documento *</label><input id="documentId" name="documentId" required value="' + (tenant.documentId || '') + '"></div><div class="field field--wide"><label for="notes">Observações</label><textarea id="notes" name="notes">' + (tenant.notes || '') + '</textarea></div></div><div class="form-actions"><button class="button" type="submit">Salvar inquilino</button><a class="button button--quiet" href="tenants.html">Cancelar</a></div></form>';
  }
  function rentalForm(propertyId) {
    var selectedProperty = propertyApi.getPropertyById(propertyId) || propertyApi.all()[0];
    var propertyOptions = propertyApi.all().map(function (property) { return '<option value="' + property.id + '"' + (property.id === selectedProperty.id ? ' selected' : '') + '>' + property.title + '</option>'; }).join('');
    var tenantOptions = tenantApi.all().map(function (tenant) { return '<option value="' + tenant.id + '">' + tenant.name + '</option>'; }).join('');
    var statusOptions = storage.contractStatuses.map(function (status) { return '<option value="' + status + '"' + (status === 'ativo' ? ' selected' : '') + '>' + status.charAt(0).toUpperCase() + status.slice(1) + '</option>'; }).join('');
    return '<div id="rental-context">' + window.RealtorUI.card(selectedProperty) + '</div><form id="rental-form" class="form-card"><div id="form-message"></div><div class="form-grid"><div class="field field--wide"><label for="propertyId">Imóvel *</label><select id="propertyId" name="propertyId" required>' + propertyOptions + '</select></div><div class="field field--wide"><label for="tenantId">Inquilino *</label><select id="tenantId" name="tenantId" required><option value="">Selecione um inquilino</option>' + tenantOptions + '</select></div><div class="field"><label for="startDate">Início *</label><input id="startDate" name="startDate" type="date" required></div><div class="field"><label for="endDate">Fim *</label><input id="endDate" name="endDate" type="date" required></div><div class="field"><label for="rentAmount">Valor mensal *</label><input id="rentAmount" name="rentAmount" type="number" min="0.01" step="0.01" value="' + selectedProperty.price + '" required></div><div class="field"><label for="contractStatus">Status do contrato *</label><select id="contractStatus" name="contractStatus" required>' + statusOptions + '</select></div></div><div class="form-actions"><button class="button" type="submit">Registrar locação</button><a class="button button--quiet" href="properties.html">Cancelar</a></div></form>';
  }
  function renderRentalPage() {
    var propertyId = new URLSearchParams(window.location.search).get('id');
    var selectedProperty = propertyApi.getPropertyById(propertyId) || propertyApi.all()[0];
    document.getElementById('app').innerHTML = window.RealtorUI.shell('rent-property', '<header class="topbar"><div><p class="eyebrow">Contratos</p><h1>Registrar locação</h1><p class="muted">Associe um imóvel a um inquilino.</p></div></header>' + rentalForm(selectedProperty.id));
    document.getElementById('rental-form').addEventListener('submit', function (event) {
      event.preventDefault(); var form = event.currentTarget; var data = {}; ['propertyId', 'tenantId', 'startDate', 'endDate', 'rentAmount', 'contractStatus'].forEach(function (name) { data[name] = fieldValue(form, name); });
      var warning = rentalApi.hasActiveRental(data.propertyId) ? 'Este imóvel já possui um contrato ativo. Deseja prosseguir mesmo assim?' : 'Confirma o registro desta locação?';
      if (!window.RealtorUI.confirmAction(warning)) return;
      var result = rentalApi.createRental(data);
      if (!result.rental) { document.getElementById('form-message').innerHTML = window.RealtorUI.flash(errorText(result.errors), 'error'); return; }
      storage.setFlash('Locação registrada com sucesso.'); window.location.href = 'properties.html';
    });
  }
  function renderTenants() {
    var search = document.getElementById('tenant-search').value;
    var items = tenantApi.listTenants({ search: search });
    document.getElementById('tenant-results').innerHTML = items.length ? items.map(window.RealtorUI.renderTenantRow).join('') : '<p class="empty">Nenhum inquilino encontrado.</p>';
    document.getElementById('tenant-count').textContent = items.length + (items.length === 1 ? ' inquilino encontrado.' : ' inquilinos encontrados.');
  }
  function renderTenantPage() {
    var content = '<header class="topbar"><div><p class="eyebrow">Carteira</p><h1>Inquilinos</h1><p id="tenant-count" class="muted"></p></div><a class="button" href="add-tenant.html">+ Novo inquilino</a></header><div id="flash"></div><div class="toolbar"><label for="tenant-search">Buscar por nome</label><input id="tenant-search" type="search" placeholder="Digite um nome"></div><section id="tenant-results" class="tenant-list"></section>';
    document.getElementById('app').innerHTML = window.RealtorUI.shell('tenants', content); document.getElementById('tenant-search').addEventListener('input', renderTenants); renderTenants(); var flash = storage.takeFlash(); if (flash) document.getElementById('flash').innerHTML = window.RealtorUI.flash(flash.message, flash.type);
  }
  function renderTenantFormPage(editing) {
    var id = new URLSearchParams(window.location.search).get('id');
    var tenant = editing ? tenantApi.getTenantById(id) : null;
    if (editing && !tenant) { storage.setFlash('Inquilino não encontrado.', 'error'); window.location.href = 'tenants.html'; return; }
    document.getElementById('app').innerHTML = window.RealtorUI.shell('tenants', '<header class="topbar"><div><p class="eyebrow">Carteira</p><h1>' + (editing ? 'Editar inquilino' : 'Novo inquilino') + '</h1><p class="muted">Preencha os dados de contato.</p></div></header>' + tenantForm(tenant));
    document.getElementById('tenant-form').addEventListener('submit', function (event) {
      event.preventDefault(); var form = event.currentTarget; var data = {}; ['name', 'email', 'phone', 'documentId', 'notes'].forEach(function (name) { data[name] = fieldValue(form, name); });
      if (!window.RealtorUI.confirmAction(editing ? 'Confirma as alterações deste inquilino?' : 'Confirma o cadastro deste inquilino?')) return;
      var result = editing ? tenantApi.updateTenant(id, data) : tenantApi.createTenant(data);
      if (!result.tenant) { document.getElementById('form-message').innerHTML = window.RealtorUI.flash(errorText(result.errors), 'error'); return; }
      storage.setFlash(editing ? 'Inquilino atualizado com sucesso.' : 'Inquilino criado com sucesso.'); window.location.href = 'tenants.html';
    });
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
    document.getElementById('app').innerHTML = window.RealtorUI.shell('properties', '<div id="flash"></div>' + content); document.getElementById('status-filter').addEventListener('change', renderProperties); renderProperties(); var flash = storage.takeFlash(); if (flash) document.getElementById('flash').innerHTML = window.RealtorUI.flash(flash.message, flash.type);
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
  if (page === 'dashboard') renderDashboard(); else if (page === 'properties') renderPropertyPage(); else if (page === 'add-property') renderFormPage(false); else if (page === 'edit-property') renderFormPage(true); else if (page === 'tenants') renderTenantPage(); else if (page === 'add-tenant') renderTenantFormPage(false); else if (page === 'edit-tenant') renderTenantFormPage(true); else if (page === 'rent-property') renderRentalPage(); else document.getElementById('app').innerHTML = window.RealtorUI.shell('dashboard', '<section class="form-card"><p class="muted">Fluxo ainda não disponível.</p></section>');
}());
