# Especificação 002 - Gestão de propriedades

## Status
Em implementação

## Dependências
- 001-create-foundation

## Contexto
Esta especificação define a primeira capacidade de negócio do sistema: a administração do catálogo de propriedades. Ela deve ser autossuficiente e compreensível por si só, sem pressupor a existência de outras entidades, visualizações ou fluxos adicionais.

## Objetivo
Permitir ao usuário criar, editar, listar e filtrar propriedades por meio de uma interface visualmente coerente, mantendo a integridade dos dados e garantindo uma experiência clara tanto em desktop quanto em dispositivos móveis.

## Páginas

### `pages/properties.html` — Listagem
- Lista completa de propriedades
- Cada card exibe: imagem, título, endereço, preço, breve descrição, quartos, banheiros, status e a ação principal de edição
- Filtro por status
- Indicador visual do status
- Mensagem visual caso não haja resultados
- Exatamente 3 propriedades por linha em desktop
- Adaptação responsiva para tablets e dispositivos móveis

### `pages/add-property.html` — Criação
- Formulário para cadastrar uma propriedade com validações para:
  - `title` (título), `address` (endereço), `price` (preço), `description` (descrição), `status` (status), `bedrooms` (quartos), `bathrooms` (banheiros), `image` (imagem)

### `pages/edit-property.html` — Edição
- Carregamento de dados existentes
- Edição mantendo a coerência
- Atualização do campo `updatedAt` ao salvar

## Modelo

```txt
Property {
  id: string
  title: string
  address: string
  price: number
  description: string
  status: 'disponível' | 'alugada' | 'em manutenção'
  bedrooms: number
  bathrooms: number
  image: string
  createdAt: string
  updatedAt: string
}
```

## Regras de negócio

- Propriedades podem ser criadas a qualquer momento.
- Propriedades podem ser atualizadas a qualquer momento.
- O status pode alternar entre `disponível`, `alugada` e `em manutenção`.
- A imagem é opcional; se não for fornecida, uma URL determinística baseada no `id` é atribuída.
- Validação obrigatória antes da persistência.
- Mensagens visuais de sucesso/erro após cada operação.
- Confirmação visível antes de salvar alterações relevantes.
- A exclusão de propriedades não está prevista nesta versão.
- O módulo de propriedades não depende de relacionamentos com outras entidades para atender a esta especificação.

## Critérios visuais
- Estrutura visual consistente em todos os cards
- Altura uniforme para a seção de imagem/cabeçalho
- Distribuição consistente do corpo (body), mesmo com variações no comprimento do título ou da descrição
- Alinhamento consistente de preço e botões de ação entre os cards
- Variações de texto não quebram o alinhamento geral

## Fora do escopo desta especificação
- Registro de contratos ou aluguéis
- Gestão de inquilinos ou outras entidades relacionadas
- Dashboard, métricas globais ou acessos rápidos na tela inicial
- Fluxos dependentes de outras funcionalidades do sistema
- Busca por texto, ordenações avançadas
- Exclusão de propriedades