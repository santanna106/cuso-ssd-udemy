# Spec 004 - Gerenciar locações

## Estado
Em implementação (registro e consistência de locações concluídos)

## Dependências
- 001-create-foundation
- 002-manage-properties
- 003-manage-tenants

## Contexto
Permite registrar o contrato de locação de um imóvel, mantendo a consistência entre o status do imóvel e a existência do contrato. Essa funcionalidade deve poder evoluir gradualmente, sem depender de integrações posteriores.

## Objetivo
Permitir registrar uma locação em menos de um minuto, com validação, confirmação e atualização automática do status do imóvel associado.

## Páginas

### `pages/rent-property.html` — Registro de locação
- Seleção ou identificação do imóvel (via query string `?id=` ou seletor)
- Seleção de inquilino a partir de um dropdown preenchido com inquilinos disponíveis nos dados do app
- Campos do contrato:
  - `startDate` (obrigatório)
  - `endDate` (obrigatório, posterior a `startDate`)
  - `rentAmount` (obrigatório, numérico > 0)
  - `contractStatus` (obrigatório, padrão `activo`)
- Exibir contexto do imóvel selecionado (imagem, título, endereço, preço sugerido)
- Confirmação visível antes de salvar

## Modelo

```
Rental {
  id: string
  propertyId: string
  tenantId: string
  startDate: ISO date
  endDate: ISO date
  rentAmount: number
  contractStatus: 'activo' | 'pendiente' | 'finalizado'
  createdAt: ISO date
}
```

## Regras de negócio

- É possível registrar uma locação a qualquer momento.
- Ao registrar uma locação com status `activo`, o imóvel associado muda para `rentada`.
- `endDate` deve ser posterior a `startDate`.
- `rentAmount` deve ser um número positivo.
- Validação obrigatória antes da persistência.
- Confirmação prévia ao salvar.
- Mensagem visual após sucesso ou erro.
- Se o imóvel já estiver `rentada` com um contrato ativo, alertar o usuário antes de prosseguir.

## Critérios visuais

- Reutilizar componentes de formulário e mensagens existentes. - Exibir o cartão de contexto da propriedade de forma consistente com os cartões do catálogo.

## Fora do escopo desta especificação

- Listagem dedicada de contratos
- Cancelamento, rescisão antecipada ou renovação automática
- Pagamentos, recibos ou lembretes
- Histórico de alterações de status