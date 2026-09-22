# Plano Técnico - Gerenciamento de Propriedades
Esta especificação é implementada como uma funcionalidade autossuficiente de administração de propriedades. O plano cobre apenas a listagem, inclusão, edição, validação e persistência do catálogo, sem incluir dashboards, contratos, inquilinos ou outros fluxos derivados.

## Páginas
- `app/pages/properties.html`
- `app/pages/add-property.html`
- `app/pages/edit-property.html`

## Módulo
- `js/properties.js` expõe:
  - `createProperty(data)`
  - `updateProperty(id, data)`
  - `getPropertyById(id)`
  - `listProperties({ status })`
  - `validateProperty(data)`

## Validações
- Campos obrigatórios: title, address, price, status, bedrooms, bathrooms.
- `price`, `bedrooms`, `bathrooms` devem ser números > 0.
- `description` deve ser persistida como texto legível para o card e para a edição.
- `image` opcional; se vazia, é atribuída uma URL determinística via `createSeedPhotoUrl(id)`.

## Renderização
- `ui.js` expõe `renderPropertyCard(property)` com grid de 3 colunas em desktop.
- O filtro por status é implementado no cliente, sem recarregar a página.
- O card mantém uma estrutura visual estável, mesmo que o comprimento do título, da descrição ou dos metadados varie.
- A ação principal disponível nesta especificação é editar a propriedade.

## Persistência
- Toda operação de I/O passa por `storage.js` com a chave `realtor.properties`.
- Cada propriedade persiste o modelo base completo definido em `000-foundation`.
- `updatedAt` é atualizado automaticamente a cada `updateProperty`.

## Fora do escopo do plano
- Métricas agregadas para a página inicial ou dashboard.
- Disponibilidade derivada de contratos ou fluxos de locação.
- Relação de propriedades com inquilinos ou outras entidades.