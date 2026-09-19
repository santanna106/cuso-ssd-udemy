(function () {
  'use strict';
  var storage = window.RealtorStorage;
  function all() { return storage.read('tenants'); }
  function find(id) { return all().filter(function (item) { return item.id === id; })[0]; }
  function save(tenant) { if (!tenant.name || !tenant.email) throw new Error('Nome e e-mail são obrigatórios.'); var items = all(); items.push(tenant); storage.write('tenants', items); return tenant; }
  window.RealtorTenants = { all: all, find: find, save: save };
}());