# Tarefas — Gerenciar Inquilinos

## Armazenamento e modelo
- [x] Adicionar chave `realtor.tenants` em `storage.js`
- [x] Implementar `buildTenantRecord(data, overrides)` em `storage.js`
- [x] Implementar `getTenants()` e `saveTenants()` em `storage.js`
- [x] Estender `ensureSeedData()` para criar 3 inquilinos realistas, caso não existam

## Módulo de domínio
- [x] Criar `js/tenants.js` (IIFE) que exponha `window.RealtorTenants`
- [x] Implementar `createTenant`, `updateTenant`, `getTenantById`, `listTenants`, `findByDocumentId`
- [x] Implementar `validateTenant(data)` para centralizar regras de validação
- [x] Validar e-mail com regex básica
- [x] Validar unicidade de `documentId` na criação e edição

## Páginas
- [x] Criar `pages/tenants.html` com listagem e busca básica por nome
- [x] Criar `pages/add-tenant.html` com formulário validado
- [x] Criar `pages/edit-tenant.html` com carregamento de dados existentes e atualização de `updatedAt`
- [x] Exibir estado de vazio quando não houver inquilinos
- [x] Exibir mensagens de sucesso/erro e confirmações

## UI compartilhada
- [x] Manter acesso aos inquilinos na navegação base do aplicativo
- [x] Implementar `renderTenantRow(tenant)` em `ui.js`

## Verificação
- [x] Validar se, ao limpar o Local Storage, são gerados 3 inquilinos coerentes
- [x] Validar busca básica por nome e unicidade de `documentId`