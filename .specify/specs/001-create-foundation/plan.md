# Plano Técnico - Estrutura

## Arquitetura

Frontend estático multipáginas em `/app,` executável com `file://`. A solução se organiza por domínios e módulos de responsabilidade única para manter baixo acomplamento 

## Responsabilidades de módulos JS

- `app.js` — inicializacao, routeamento básico entre páginas, partida geral
- `storage.js` — leitura, escrita, seed inicial e utilidades sobre Local Storage
- `ui.js` — navbar, cards, botões, formulários, alertas, badges e render reutilisáveis
- `properties.js` — contrato base do domínio de propiedades e pontos de extensão
- `tenants.js` — contrato base do domínio de inquilinos e pontos de extensão
- `rentals.js` — contrato base do domínio de aluguéis e pontos de extensão

## Decisiones tecnicas

1. Padão de módulo:
  - Se implementa o padão de módulos definido pela  constituição em todos os arquivos de `app/js`.
  - `app.js` orquestra o começo e delega as APIs públicas por dominio.

2. Persistencia:
  - `storage.js` concentra operações de leitura/escrita, seed e menssageria flash.
  - as chaves e convenções de persistencia se consumem desde a definição canônica da constituição.
  - Inicialização idempotente: seed apenas quando não existem dados prévios

3. Sistema visual reusável:
  - Tokens de design centralizados em `styles.css`.
  - Convenção BEM relaxada (`block`, `block__element`, `block--modifier`).
  - Shell comum: sidebar + header + contenido principal.
  - Iconografia SVG outline centralizada en `ui.js` e estilizada em `styles.css`.
  - Menu lateral principal fixo com 4 entradas e estado ativo por `activeKey` em `mountShell`.

4. Seed de imagens:
  - `createSeedPhotoUrl(id)` gera `https://picsum.photos/seed/<id>/800/500`.
  - A URL final persiste no campo `image`.
    - Fallback visual em cards quando a imagem na carga (`is-fallback`).

5. Accesibilidad mínima:
  - labels associadas a inputs.
  - `alt` descritiva em imágenes.
  - foco visible em elementos interativos.

## Sem duplicação normativa

- Este plano não redefine restrições globais de stack, alcance e modelo de datos.
- Quando uma decisão é normativa, se referencia a constituição em lugar da repetição.

## Rastreabilidade com spec e constitution

Este plano detalha decisões de implementação.
Regras imutáveis ​​e o escopo geral permanecem em `.specify/memory/constitution.md`; critérios funcionais de aceitação estão em `spec.md`.