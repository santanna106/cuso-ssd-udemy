(function () {
  'use strict';
  var keys = { properties: 'realtor.properties', tenants: 'realtor.tenants', rentals: 'realtor.rentals', flash: 'realtor.flash' };
  var propertyStatuses = ['disponible', 'rentada', 'en mantenimiento'];
  var contractStatuses = ['ativo', 'pendente', 'finalizado'];
  function read(key, fallback) { try { var value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch (error) { return fallback; } }
  function write(key, value) { localStorage.setItem(key, JSON.stringify(value)); return value; }
  function now() { return new Date().toISOString(); }
  function createSeedPhotoUrl(id) { return 'https://picsum.photos/seed/' + id + '/800/500'; }
  function seed() {
    if (!read(keys.properties, null)) {
      var properties = [
        ['prop-01', 'Casa Jardim Norte', 'Rua das Acácias, 120', 2450, 'disponible', 3, 2], ['prop-02', 'Apartamento Aurora', 'Av. Central, 845', 1850, 'rentada', 2, 1],
        ['prop-03', 'Loft do Parque', 'Rua do Parque, 44', 2100, 'disponible', 1, 1], ['prop-04', 'Sobrado das Palmeiras', 'Alameda Sul, 902', 3200, 'en mantenimiento', 4, 3],
        ['prop-05', 'Casa Brisa', 'Rua da Praia, 18', 2750, 'rentada', 3, 2], ['prop-06', 'Studio Horizonte', 'Rua Nova, 301', 1400, 'disponible', 1, 1]
      ].map(function (item) { return { id: item[0], title: item[1], address: item[2], price: item[3], description: 'Imóvel preparado para uma nova história.', status: item[4], bedrooms: item[5], bathrooms: item[6], image: createSeedPhotoUrl(item[0]), createdAt: now(), updatedAt: now() }; });
      write(keys.properties, properties);
    }
    if (!read(keys.tenants, null)) {
      write(keys.tenants, [
        { id: 'tenant-01', name: 'Marina Costa', email: 'marina.costa@email.com', phone: '(11) 98888-1100', documentId: '123.456.789-00', notes: 'Perfil organizado.', createdAt: now(), updatedAt: now() },
        { id: 'tenant-02', name: 'Rafael Mendes', email: 'rafael.mendes@email.com', phone: '(11) 97777-2200', documentId: '234.567.890-11', notes: 'Prefere contato por e-mail.', createdAt: now(), updatedAt: now() },
        { id: 'tenant-03', name: 'Beatriz Lima', email: 'beatriz.lima@email.com', phone: '(11) 96666-3300', documentId: '345.678.901-22', notes: 'Contrato anual.', createdAt: now(), updatedAt: now() }
      ]);
    }
    if (!read(keys.rentals, null)) write(keys.rentals, [{ id: 'rental-01', propertyId: 'prop-02', tenantId: 'tenant-01', startDate: '2026-01-10', endDate: '2027-01-09', rentAmount: 1850, contractStatus: 'ativo', createdAt: now() }, { id: 'rental-02', propertyId: 'prop-05', tenantId: 'tenant-02', startDate: '2026-02-01', endDate: '2027-01-31', rentAmount: 2750, contractStatus: 'ativo', createdAt: now() }]);
  }
  window.RealtorStorage = { keys: keys, propertyStatuses: propertyStatuses, contractStatuses: contractStatuses, read: function (name) { return read(keys[name], []); }, write: function (name, value) { return write(keys[name], value); }, setFlash: function (message, type) { write(keys.flash, { message: message, type: type || 'success' }); }, takeFlash: function () { var flash = read(keys.flash, null); localStorage.removeItem(keys.flash); return flash; }, createSeedPhotoUrl: createSeedPhotoUrl, seed: seed };
}());