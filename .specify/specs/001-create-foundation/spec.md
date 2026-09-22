# Spec 001: Fundamentos do projeto

## Estado
implementado

## Dependências
nenhuma

## Contexto
Define a base técnica e visual compartilhada por todas as funcionalidades do sistema. Esta especificação concentra-se em resultados verificáveis ​​da implementação dos fundamentos; as regras imutáveis ​​(stack, limites, modelo canônico e escopo) são herdadas da constituição e não são redefinidas aqui.

## Objetivo
Estabelecer uma estrutura técnica e visual consistente sobre a qual construir as funcionalidades (dashboard, imóveis, inquilinos, aluguéis).

## Referência normativa
Esta especificação herda e respeita integralmente o arquivo `.specify/memory/constitution.md`. Em caso de conflito, a constituição prevalece.

## Critérios de aceitação

1. O aplicativo funciona ao abrir diretamente `/app/index.html` via `file://`, sem servidor ou etapas de build.

2. A estrutura base existe dentro de `/app`:
	- `index.html`
	- `css/styles.css`
	- `js/app.js`, `js/storage.js`, `js/ui.js`, `js/properties.js`, `js/tenants.js`, `js/rentals.js`
	- `pages/properties.html`, `pages/add-property.html`, `pages/edit-property.html`, `pages/rent-property.html`, `pages/tenants.html`, `pages/add-tenant.html`, `pages/edit-tenant.html`

3. A base de módulos JS em `/app/js` aplica o padrão e as regras transversais definidas na constituição, verificáveis ​​em `app.js`, `storage.js`, `ui.js`, `properties.js`, `tenants.js` e `rentals.js`.

4. A persistência da base é centralizada em `js/storage.js`, incluindo dados iniciais (*seed*) e mensagens *flash* entre páginas, de acordo com a convenção de chaves estabelecida na constituição. 5. O sistema visual base é *desktop-first* e reutilizável:
	- layout com barra lateral + conteúdo principal
	- cards de métricas e cards de entidade
	- formulários, *badges*, alertas e mensagens *flash*
	- iconografia SVG estilo *outline* consistente
	- menu lateral principal com 4 itens: `Dashboard`, `Minhas propriedades`, `Nova propriedade`, `Registrar aluguel`

6. *Seed* inicial:
	- no mínimo 6 propriedades com estados variados
	- no mínimo 3 inquilinos realistas
	- aluguéis coerentes, referenciando propriedade e inquilino por `id`
	- imagem determinística por propriedade via `https://picsum.photos/seed/<id>/800/500`
	- *fallback* visual quando uma imagem não carrega

7. A base da UI implementa de ponta a ponta o fluxo mínimo de interação em páginas e componentes reutilizáveis, mantendo validação, confirmação e *feedback* visual conforme a constituição.

## Fora do escopo

Aplicam-se diretamente as restrições de fora do escopo definidas na constituição.