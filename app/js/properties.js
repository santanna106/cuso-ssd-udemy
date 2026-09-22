(function () {
  'use strict';
  var storage = window.RealtorStorage;
  function all() { return storage.read('properties'); }
  function find(id) { return all().filter(function (item) { return item.id === id; })[0]; }
  function validateProperty(data) {
    var errors = {};
    ['title', 'address', 'price', 'status', 'bedrooms', 'bathrooms'].forEach(function (field) {
      if (data[field] === undefined || data[field] === null || String(data[field]).trim() === '') errors[field] = 'Este campo é obrigatório.';
    });
    ['price', 'bedrooms', 'bathrooms'].forEach(function (field) {
      if (data[field] !== undefined && data[field] !== '' && (!Number.isFinite(Number(data[field])) || Number(data[field]) <= 0)) errors[field] = 'Informe um número maior que zero.';
    });
    if (data.status && storage.propertyStatuses.indexOf(data.status) === -1) errors.status = 'Selecione um status válido.';
    return { valid: Object.keys(errors).length === 0, errors: errors };
  }
  function normalize(data) {
    return { title: String(data.title || '').trim(), address: String(data.address || '').trim(), price: Number(data.price), description: String(data.description || '').trim(), status: data.status, bedrooms: Number(data.bedrooms), bathrooms: Number(data.bathrooms), image: String(data.image || '').trim() };
  }
  function createProperty(data) {
    var property = normalize(data); var validation = validateProperty(property);
    if (!validation.valid) return { property: null, errors: validation.errors };
    property.id = 'prop-' + Date.now(); property.createdAt = new Date().toISOString(); property.updatedAt = property.createdAt;
    if (!property.image) property.image = storage.createSeedPhotoUrl(property.id);
    var items = all(); items.push(property); storage.write('properties', items);
    return { property: property, errors: {} };
  }
  function updateProperty(id, data) {
    var property = normalize(data); var validation = validateProperty(property);
    if (!validation.valid) return { property: null, errors: validation.errors };
    var items = all(); var index = items.findIndex(function (item) { return item.id === id; });
    if (index === -1) return { property: null, errors: { form: 'Imóvel não encontrado.' } };
    property.id = id; property.createdAt = items[index].createdAt; property.updatedAt = new Date().toISOString();
    if (!property.image) property.image = storage.createSeedPhotoUrl(id);
    items[index] = property; storage.write('properties', items); return { property: property, errors: {} };
  }
  function listProperties(options) {
    options = options || {}; return all().filter(function (item) { return !options.status || item.status === options.status; });
  }
  window.RealtorProperties = { all: all, find: find, createProperty: createProperty, updateProperty: updateProperty, listProperties: listProperties, validateProperty: validateProperty };
}());