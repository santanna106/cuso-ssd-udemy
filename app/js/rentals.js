(function () {
  'use strict';
  var storage = window.RealtorStorage;
  function all() { return storage.read('rentals'); }
  function active() { return all().filter(function (rental) { return rental.contractStatus === 'ativo'; }); }
  function save(rental) { if (!rental.propertyId || !rental.tenantId || !rental.startDate || !rental.rentAmount) throw new Error('Imóvel, inquilino, início e valor são obrigatórios.'); var items = all(); items.push(rental); storage.write('rentals', items); return rental; }
  window.RealtorRentals = { all: all, active: active, save: save };
}());