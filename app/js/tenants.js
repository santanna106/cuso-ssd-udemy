(function () {
  'use strict';
  var storage = window.RealtorStorage;
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function all() { return storage.getTenants(); }
  function getTenantById(id) { return all().filter(function (item) { return item.id === id; })[0]; }
  function findByDocumentId(documentId) { var value = String(documentId || '').trim(); return all().filter(function (item) { return item.documentId === value; })[0]; }
  function validateTenant(data, currentId) {
    var errors = {};
    ['name', 'email', 'phone', 'documentId'].forEach(function (field) { if (!data[field] || String(data[field]).trim() === '') errors[field] = 'Este campo é obrigatório.'; });
    if (data.email && !emailPattern.test(String(data.email).trim())) errors.email = 'Informe um e-mail válido.';
    var duplicate = findByDocumentId(data.documentId);
    if (data.documentId && duplicate && duplicate.id !== currentId) errors.documentId = 'Este documento já está cadastrado.';
    return { valid: Object.keys(errors).length === 0, errors: errors };
  }
  function normalize(data) { return { name: String(data.name || '').trim(), email: String(data.email || '').trim(), phone: String(data.phone || '').trim(), documentId: String(data.documentId || '').trim(), notes: String(data.notes || '').trim() }; }
  function createTenant(data) {
    var tenant = normalize(data); var validation = validateTenant(tenant);
    if (!validation.valid) return { tenant: null, errors: validation.errors };
    tenant = storage.buildTenantRecord(tenant); var items = all(); items.push(tenant); storage.saveTenants(items);
    return { tenant: tenant, errors: {} };
  }
  function updateTenant(id, data) {
    var tenant = normalize(data); var validation = validateTenant(tenant, id); var items = all(); var index = items.findIndex(function (item) { return item.id === id; });
    if (!validation.valid) return { tenant: null, errors: validation.errors };
    if (index === -1) return { tenant: null, errors: { form: 'Inquilino não encontrado.' } };
    tenant = storage.buildTenantRecord(tenant, { id: id, createdAt: items[index].createdAt, updatedAt: new Date().toISOString() }); items[index] = tenant; storage.saveTenants(items);
    return { tenant: tenant, errors: {} };
  }
  function listTenants(options) { var search = String((options || {}).search || '').trim().toLowerCase(); return all().filter(function (item) { return !search || item.name.toLowerCase().indexOf(search) !== -1; }); }
  function save(tenant) { var result = createTenant(tenant); if (!result.tenant) throw new Error(Object.keys(result.errors).map(function (key) { return result.errors[key]; }).join(' ')); return result.tenant; }
  window.RealtorTenants = { all: all, find: getTenantById, createTenant: createTenant, updateTenant: updateTenant, getTenantById: getTenantById, listTenants: listTenants, findByDocumentId: findByDocumentId, validateTenant: validateTenant, save: save };
}());
