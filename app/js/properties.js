(function () {
  'use strict';
  var storage = window.RealtorStorage;
  function all() { return storage.read('properties'); }
  function find(id) { return all().filter(function (item) { return item.id === id; })[0]; }
  function save(property) { var items = all(); items.push(property); storage.write('properties', items); return property; }
  window.RealtorProperties = { all: all, find: find, save: save };
}());