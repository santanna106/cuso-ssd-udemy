# Spec 003: Gestão de Inquilinos


## Estado
Em implementação (listagem, cadastro e edição concluídos)

## Dependências
- 001-create-foundation

## Contexto
Esta especificação introduz a segunda entidade de negócio do sistema como uma funcionalidade autossuficiente: a gestão de inquilinos. Ela deve poder ser compreendida e implementada sem pressupor a existência de aluguéis, painel de controle (dashboard) ou outras telas futuras.

## Objetivo
Permitir registrar, listar e editar inquilinos com uma interface consistente, validações claras e integridade de dados, mantendo a aplicação preparada para crescer gradualmente.

## Páginas

### `pages/tenants.html` — Listagem
- Listagem completa de inquilinos
- Cada item exibe: nome, e-mail, telefone, documento e um resumo das observações (se houver)
- Busca básica por nome (mínimo viável)
- Mensagem visual caso não haja inquilinos
- Ações: editar, ver detalhes (opcional)

### `pages/add-tenant.html` — Cadastro
- Formulário com validações para:
  - `name` (obrigatório)
  - `email` (obrigatório, formato válido)
  - `phone` (obrigatório)
  - `documentId` (obrigatório, único)
  - `notes` (opcional)

### `pages/edit-tenant.html` — Edição
- Carrega dados existentes
- Permite atualizar todos os campos, exceto `id`
- Atualiza `updatedAt`

## Modelo

```
Tenant {
  id: string
  name: string
  email: string
  phone: string
  documentId: string
  notes: string
  createdAt: ISO date
  updatedAt: ISO date
}
```

## Regras de negócio

- `documentId` deve ser único entre os inquilinos.
- `email` deve passar por uma validação básica de formato.
- Validação obrigatória antes da persistência dos dados.
- Mensagens visuais de sucesso/erro.
- Confirmação visível antes de salvar alterações relevantes.
- A exclusão de inquilinos não está prevista nesta versão.

## Evolução gradual

- Esta especificação cobre apenas o CRUD básico de inquilinos. - Qualquer relação futura com aluguéis, contratos, dashboard ou métricas globais deverá ser definida em especificações posteriores.

## Dados de teste

- Mínimo de 3 inquilinos de *seed* com dados realistas distintos.

## Critérios visuais

- Listagem com *cards* ou linhas consistentes com o sistema visual do projeto.
- Reutilização de componentes de formulário, *badges* e mensagens existentes.

## Fora do escopo desta especificação

- Exclusão de inquilinos
- Histórico detalhado de aluguéis por inquilino
- Integração com formulários de aluguel ou contratos
- Dashboard, métricas globais ou acessos rápidos na tela inicial
- Importação em massa
- Verificação externa de identidade