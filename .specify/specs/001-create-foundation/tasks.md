# Tarefas - Fundação

- [x] Criar estrutura base em `/app` com `index.html`, `pages/`, `css/styles.css` e módulos `js/` definidos na especificação.
- [x] Verificar se abrir o arquivo principal no navegador é suficiente para ver o app funcionando, sem necessidade de instalar nada ou iniciar um servidor.
- [x] Implementar `app.js` como bootstrap e roteamento básico entre páginas.
- [x] Implementar `storage.js` como camada única de persistência, aplicando a convenção de chaves e mensagens flash definida na constituição.
- [x] Implementar seed automático inicial com dados realistas (mínimo de 6 imóveis e 3 inquilinos).
- [x] Definir e estabilizar o modelo base de locação com referência por `tenantId` e coerência estrutural entre imóvel, inquilino e contrato.
- [x] Implementar `ui.js` com renderização reutilizável (barra lateral, métricas, cards, badges, alertas, mensagens flash e confirmações).
- [x] Implementar módulos de domínio `properties.js`, `tenants.js` e `rentals.js` com contrato base e pontos de extensão, aplicando o padrão de módulos definido na constituição.
- [x] Construir sistema visual *desktop-first* em `styles.css` com tokens e componentes reutilizáveis ​​(botões, formulários, badges, alertas).
- [x] Implementar iconografia SVG *outline* consistente na barra lateral, ações rápidas e metadados dos cards.
- [x] Fixar menu lateral principal com 4 itens (`Dashboard`, `Meus imóveis`, `Novo imóvel`, `Registrar locação`) exibindo título, subtítulo e estado ativo.
- [x] Implementar imagens determinísticas de seed com `https://picsum.photos/seed/<id>/800/500` e fallback visual para falha de carregamento.