# Plano Técnico — Inquilinos

Esta especificação é implementada como uma funcionalidade autossuficiente de gestão de inquilinos. O plano abrange apenas a listagem, o cadastro, a edição, a validação e a persistência da entidade, sem incluir locações, painel de controle (dashboard) ou outros fluxos derivados.

## Novas páginas
- `app/pages/tenants.html`
- `app/pages/add-tenant.html`
- `app/pages/edit-tenant.html`

## Novo módulo
- `js/tenants.js` (IIFE) expõe `window.RealtorTenants` com:
  - `createTenant(data)`
  - `updateTenant(id, data)`
  - `getTenantById(id)`
  - `listTenants({ search })`
  - `findByDocumentId(documentId)`
  - `validateTenant(data)`

## Extensão do storage.js
- Nova chave: `realtor.tenants`
- Funções: `getTenants()`, `saveTenants(tenants)`
- Função `buildTenantRecord(data, overrides)` análoga a `buildPropertyRecord`
- Estender `ensureSeedData()` para criar 3 inquilinos caso não existam

## Validações específicas
- E-mail: regex básica `^[^\s@]+@[^\s@]+\.[^\s@]+$`.
- DocumentId único: verificação em `createTenant` e `updateTenant`.

## Navegação
- Manter o acesso aos inquilinos dentro da navegação principal do aplicativo, sem depender de acessos rápidos ou telas subsequentes.

## Renderização
- `ui.js` expõe `renderTenantRow(tenant)` para a listagem.
- A listagem exibe dados de contato e documento de forma consistente com o sistema visual base.

## Fora do escopo do plano
- Integração com formulários de locação, contratos ou busca cruzada entre entidades.
- Métricas agregadas para painel de controle ou página inicial.
- Histórico de atividades ou locações por inquilino.