# Guia do agente

## Resumo do projeto

Realtor e uma aplicacao web estatica para gestao de renda de propriedades. O app permite consultar propriedades, inquilinos e locacoes, com dados persistidos no Local Storage do navegador. A entrada principal e `app/index.html`, que pode ser aberta diretamente com `file://`.

## Stack e restricoes tecnicas

## Estrutura vigente

[context_after]
```text
app/
  index.html
  css/
    styles.css
  js/
    app.js
    properties.js
    rentals.js
    storage.js
    tenants.js
    ui.js
  pages/
    add-property.html
    add-tenant.html
    edit-property.html
    edit-tenant.html
    properties.html
    rent-property.html
    tenants.html
.github/
  copilot-instructions.md
  prompts/
    execute-spec.prompt.md
    sync-agent.prompt.md
.specify/
  memory/
    constitution.md
  specs/
    001-create-foundation/
      plan.md
      spec.md
      tasks.md
```

## Modulos principais

- `app.js`: inicializa o armazenamento, identifica `data-page`, carrega dados e renderiza dashboard, listagem de propriedades e placeholders dos fluxos ainda nao implementados.
- `storage.js`: define chaves, estados, seed inicial, leitura e escrita no Local Storage, mensagens flash e URLs deterministicas de imagens.
- `ui.js`: fornece o shell com sidebar, navegacao, icones SVG, badges, cards de propriedades, mensagens flash e confirmacoes.
- `properties.js`: leitura, busca e inclusao de propriedades.
- `tenants.js`: leitura, busca e inclusao de inquilinos, com validacao de nome e e-mail.
- `rentals.js`: leitura, filtro de locacoes ativas e inclusao de locacoes, com validacao dos campos basicos.
- `styles.css`: tokens visuais, layout desktop-first, componentes, estados e responsividade.

## Fluxo operacional do agente

1. Ler `.github/copilot-instructions.md`.
2. Identificar a spec ativa em `.specify/specs/`.
3. Ler nesta ordem: `constitution.md`, `spec.md`, `plan.md` e `tasks.md`.
4. Inspecionar o estado atual e priorizar mudancas em `app/`, `.specify/` e `.github/`.
5. Implementar somente tarefas pendentes (`- [ ]`) e marcar uma tarefa como concluida apenas depois da validacao.
6. Preservar APIs globais, caminhos relativos das paginas e compatibilidade com abertura direta de `app/index.html`.
7. Validar abrindo `app/index.html` no navegador, verificando a renderizacao, navegacao, seed e ausencia de erros no console. Nao ha comando de build ou suite automatizada configurada.
8. Manter este arquivo atualizado quando a estrutura, os fluxos ou as regras mudarem.

## Regras de Spec-Driven Development

- Os documentos em `.specify` sao a fonte da verdade.
- A constituicao prevalece sobre spec, plano e tarefas em caso de conflito.
- Nao implementar comportamento fora de `spec.md`.
- Seguir a arquitetura e a sequencia definidas em `plan.md`.
- Trabalhar tarefa por tarefa. Quando nao houver tarefas pendentes, validar a consistencia entre os documentos e o codigo em vez de reimplementar.
- `storage.js` e o unico modulo autorizado a acessar `localStorage`.
- Usar as chaves `realtor.properties`, `realtor.tenants`, `realtor.rentals` e `realtor.flash`.
- Reutilizar os estados de propriedade e contrato definidos em `storage.js`.

## Arquivos criticos

- `.github/copilot-instructions.md`: regras obrigatorias de trabalho do agente.
- `.specify/memory/constitution.md`: restricoes imutaveis, stack, modelos e criterios de qualidade.
- `.specify/specs/001-create-foundation/spec.md`: spec ativa e seu estado.
- `.specify/specs/001-create-foundation/plan.md`: arquitetura e decisoes tecnicas da fundacao.
- `.specify/specs/001-create-foundation/tasks.md`: rastreabilidade das tarefas da fundacao.
- `app/index.html`: ponto de entrada do dashboard e ordem de carregamento dos scripts.
- `app/js/storage.js`: contrato de persistencia, seed e estados canonicos.
- `app/js/app.js`: bootstrap e roteamento baseado em `data-page`.
- `app/js/ui.js`: shell e componentes de apresentacao compartilhados.
- `app/css/styles.css`: sistema visual e layout responsivo.

## Ultima sincronizacao

2026-09-20. `AGENTS.md` foi criado a partir da estrutura atual, da constituicao, da spec ativa, do plano, das tarefas e das APIs dos modulos. Todas as tarefas da spec `001-create-foundation` ja estao marcadas como concluidas. O guia registra que o arquivo real do modulo de inquilinos e `app/js/tenants.js` e que nao ha build, testes automatizados ou dependencias de pacote configurados.