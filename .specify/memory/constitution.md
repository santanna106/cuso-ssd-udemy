# Constituicao do Projeto
> Este aruivo define as regras imutáveis desse projeto. Nenhuma spec, plan nem tarefa pode contradizer esse aquivos. Diante qualquer dúvida ou conflito, este documento é uma fonte de verdade superior.


---

## 1. Descrição do projeto

Aplicação web de **gestão de renda de propriedades** construída utilizando o Sped-Driven Development. Permite registrar propriedades, inquilinos e contratos de renda
com persistência local no navegador.

## 2. Stack Tecnológico

- **Linguagens permitidas** HTML, CSS e Javascript vanilla unicamente.
- **Persistencia:** Local Storage do navegador
- **Proibido:** frameworks (React, Vue, JQeury), bibliotecas npm, Typescript, preprocessadores CSS e qualquer backend.
- **Sem gestor de pacotes:** npm, yarn e pnmp eles estão fora do escopo. Esse projeto não deve ter nenhum `package.json`

## Estrutura dos arquivos

Todo código funcional deverá ficar dentro da pasta `/app`. Não deverá ser criado nenhum arquivo fora desta pasta.

```
app/
    index.html
    css/styles.css
    js/
        app.js
        storage.js
        ui.js
        properties.js
        tenant.js
        rentals.js
    pages/
        properties.html
        add-property.html
        edit-property.html
        rent-property.html
        tenants.html
        add-tenant.html
        edit-tenant.html
        
```

A aplicação deve se abrir desde `app/index.html` com `file://` sem a necessidade de servidor

## 4. Padrões de código

- Cada arquivo JS é um **IIFE** que expões sua API em um `window.RealtorXxx`
- Não se usa `import`/`export` ESM para garantir compatibilidade com `file://`
- Sem `async/await` salvo quando realmente justificado
- Separação de estrita responsabilidades:
  
| Módulo | Reponsalidade |
|---|---|
| `app.js` | Bootstrap, inicialização e routemaneto entre páginas |
| `storage.js` | Única camada autorizada para ler/escreber no Local Storage |
| `ui.js` | Renderizar componentes reutilizáveis: navbar, cards, badges, alertas, formulários |
| `properties.js` | Dominio de propriedades: CRUD e validação |
| `tenants.js` | Dominio de inquilinos: CRUD e validações |
| `rentals.js` | Dominio de alugueis: registro e consistência de Dados |


---

## 5. Persistência de Dados

- **Somente `storage.js`** acessa o  `localStorage`. Nenhum outro módulo poderá acessa-lo diretamente
- Chaes com namespaces obrigatórios:
  - `realtor.properties`
  - `realtor.tenants`
  - `realtor.rentals`
  - `realtor.flash` (mensagens entre páginas)
- Na primeira inicialização, se não houver dados, uma seed automática é gerada.

---


## 6. Entidades de domínio

l sistema possui três entidades. As specs devem respeitar estes modelos.

**Propiedade:** `id`, `title`, `address`, `price`, `description`, `status`, `bedrooms`, `bathrooms`, `image`, `createdAt`, `updatedAt`

**Inquilino:** `id`, `name`, `email`, `phone`, `documentId`, `notes`, `createdAt`, `updatedAt`

**Aluguel:** `id`, `propertyId`, `tenantId`, `startDate`, `endDate`, `rentAmount`, `contractStatus`, `createdAt`

Estados da propiedade: `disponible` | `rentada` | `en mantenimiento`

Estados do contrato: `ativo` | `pendente` | `finalizado`

Os estados são definidos em `storage.js` e deverão ser reutilizados em todos os módulos.

---

## 7. Critérios de UI/UX

- Estilo moderno, limpo e profissional. Referencia visual: Notion, Google Keep, dashboards de gestão.

- **Desktop-first**  com adaptação responsiva em tablet e mobile.
- Composição global: sidebar lateral fija + área de conteúdo principal.
- Componentes obrigatórios e reutilizáveis: navbar, cards de propiedade, cards de métricas, acessos rápidos, indicadores de status, formulários, alertas e mensagens flash.
- Visual: sombras suaves, bordas arredondadas, espaçamento generoso, hierarquia tipográfica clara.
- Iconografía: SVG outline, sem emojis nem caracteres Unicode como íconos funcionais.

---

## 8. Reglas de qualidade

- Todo formulario valida campos obrigatórios antes de persistir.
- Toda ação sensível (criar, editar, mudar estado) deve mostrar a confirmação ao usuário.
- Toda operação deve mostrar mensagens visuáis de êxito ou erro.
- As mensagens entre páginas se transmitem via `realtor.flash` no Local Storage.

---

## 9. Dados de teste

- Mínimo **6 propiedades** com estados variados (`disponível`, `alugada`, `em manutenção`).
- Mínimo **3 inquilinos** com dados realistas.
- Os aluguéis de seed devem referenciar propriedades e inquilinos do seed por `id`.
- Cada propriedade tem imagen determinada via `https://picsum.photos/seed/<id>/800/500`.
- O campo `image`  persiste com a URL final no Local Storage.
- Se a imagem externa falha, o card mostra um fallback sem quebrar o layout.

---

## 10. Organização das specs

- Cada feature/regra de negocio é armazenada em sua própria spec dentro de `.specify/specs/`.
- Não se permite uma spec monolítica.
- Ordem de leitura obrigatória antes de qualquer mudança: `constitution.md` → `spec.md` → `plan.md` → `tasks.md`.
  
---

## 11. Fora de Escopo

Os seguintes temas estão explícitamente excluidos deste projecto:

- Autenticação e autorização
- Backend com base de dados remota
- Pagamentos ou faturamento
- Integração com serviços externos
- Eliminação de entidades (fora do escopo desta versão)

---
