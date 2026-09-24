# Plano Técnico — Locações

## Página
- `app/pages/rent-property.html`

## Módulo
- `js/rentals.js` expõe:
  - `createRental(data)` — cria a locação e atualiza o status da propriedade associada
  - `listRentalsByPropertyId(propertyId)`

## Fluxo de criação
1. O usuário acessa `rent-property.html?id=<propertyId>` (ou seleciona a partir de um seletor).
2. A propriedade é carregada via `RealtorProperties.getPropertyById(id)` para exibir o contexto.
3. O dropdown de inquilinos é preenchido com os inquilinos disponíveis nos dados do aplicativo.
4. Validação no cliente: datas, valor, campos obrigatórios.
5. Confirmação via modal antes da persistência dos dados.
6. `RealtorRentals.createRental(data)` invoca `RealtorProperties.updateProperty(propertyId, { status: 'rentada' })` se o contrato estiver `activo`.
7. Mensagem de sucesso (flash message) e redirecionamento para o fluxo principal de propriedades.

## Validações
- `startDate` e `endDate` devem ser passíveis de conversão para datas válidas.
- `endDate > startDate`.
- `rentAmount` deve ser um valor numérico positivo.
- `contractStatus` deve estar entre `['activo', 'pendiente', 'finalizado']`.
- `propertyId` e `tenantId` devem existir.