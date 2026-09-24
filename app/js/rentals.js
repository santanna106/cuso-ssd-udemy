(function () {
  'use strict';
  var storage = window.RealtorStorage;
  var properties = window.RealtorProperties;
  var tenants = window.RealtorTenants;
  function all() { return storage.read('rentals'); }
  function active() { return all().filter(function (rental) { return rental.contractStatus === 'ativo'; }); }
  function listRentalsByPropertyId(propertyId) { return all().filter(function (rental) { return rental.propertyId === propertyId; }); }
  function hasActiveRental(propertyId) { return active().some(function (rental) { return rental.propertyId === propertyId; }); }
  function validateRental(data) {
    var errors = {};
    ['propertyId', 'tenantId', 'startDate', 'endDate', 'rentAmount', 'contractStatus'].forEach(function (field) { if (!data[field] || String(data[field]).trim() === '') errors[field] = 'Este campo é obrigatório.'; });
    if (data.propertyId && !properties.getPropertyById(data.propertyId)) errors.propertyId = 'Selecione um imóvel válido.';
    if (data.tenantId && !tenants.getTenantById(data.tenantId)) errors.tenantId = 'Selecione um inquilino válido.';
    var start = data.startDate ? new Date(data.startDate) : null; var end = data.endDate ? new Date(data.endDate) : null;
    if (data.startDate && isNaN(start.getTime())) errors.startDate = 'Informe uma data válida.';
    if (data.endDate && isNaN(end.getTime())) errors.endDate = 'Informe uma data válida.';
    if (start && end && !isNaN(start.getTime()) && !isNaN(end.getTime()) && end <= start) errors.endDate = 'A data final deve ser posterior à inicial.';
    if (data.rentAmount && (!Number.isFinite(Number(data.rentAmount)) || Number(data.rentAmount) <= 0)) errors.rentAmount = 'Informe um valor maior que zero.';
    if (data.contractStatus && storage.contractStatuses.indexOf(data.contractStatus) === -1) errors.contractStatus = 'Selecione um status válido.';
    return { valid: Object.keys(errors).length === 0, errors: errors };
  }
  function createRental(data) {
    var rental = { propertyId: String(data.propertyId || '').trim(), tenantId: String(data.tenantId || '').trim(), startDate: String(data.startDate || '').trim(), endDate: String(data.endDate || '').trim(), rentAmount: Number(data.rentAmount), contractStatus: data.contractStatus || 'ativo' };
    var validation = validateRental(rental);
    if (!validation.valid) return { rental: null, errors: validation.errors };
    var property = properties.getPropertyById(rental.propertyId);
    if (rental.contractStatus === 'ativo') {
      var updated = properties.updateProperty(property.id, { title: property.title, address: property.address, price: property.price, description: property.description, status: 'rentada', bedrooms: property.bedrooms, bathrooms: property.bathrooms, image: property.image });
      if (!updated.property) return { rental: null, errors: { propertyId: 'Não foi possível atualizar o status do imóvel.' } };
    }
    rental.id = 'rental-' + Date.now(); rental.createdAt = new Date().toISOString(); var items = all(); items.push(rental); storage.write('rentals', items);
    return { rental: rental, errors: {} };
  }
  function save(rental) { var result = createRental(rental); if (!result.rental) throw new Error(Object.keys(result.errors).map(function (key) { return result.errors[key]; }).join(' ')); return result.rental; }
  window.RealtorRentals = { all: all, active: active, save: save, createRental: createRental, listRentalsByPropertyId: listRentalsByPropertyId, hasActiveRental: hasActiveRental, validateRental: validateRental };
}());
