---
name: execute-spec
description: Modelo reutilizável para executar qualquer spec. Basta alterar o SPEC_NAME e executar o fluxo completo do SDD.
---

Configuração
- SPEC_NAME: 002-manage-properties

Regra de resolução de caminhos:
- SPEC_DIR = .specify/specs/{SPEC_NAME}
- SPEC_FILE = {SPEC_DIR}/spec.md
- PLAN_FILE = {SPEC_DIR}/plan.md
- TASKS_FILE = {SPEC_DIR}/tasks.md

Fluxo obrigatório

1. Ler e seguir:
  - .github/copilot-instructions.md
  - AGENTS.md
  - specify/memory/constitution.md
  - {SPEC_FILE}
  - {PLAN_FILE}
  - {TASKS_FILE}

2. Usar estes documentos como única fonte de verdade para o trabalho a ser executado.
3. Antes de criar ou editar, inspecionar o estado atual da /app e do {TASKS_FILE}; respeitar o que já foi implementado.
4. Executar apenas as verificações pendentes (- [ ]) no {TASKS_FILE} em sequência.
5. Marcar cada verificação no {TASKS_FILE} à medida que for realmente concluída.
6. Criar ou estender arquivos apenas dentro da estrutura obrigatória definida pela spec ativa.
7. Não introduzir frameworks, npm, backend ou arquivos funcionais fora da /app.
8. Toda persistência deve passar por js/storage.js usando as chaves:
  - realtor.properties
  - realter.tenants
  - realtor.rentals
  - realtor.flash
9. Parar apenas se houver ambiguidade real ou contradição entre os documentos.

Saída obrigatória ao finalizar

1. O que foi construído ou modificado.
2. Quais arquivos foram criados ou modificados.
3. Quais tarefas do {TASKS_FILE} foram marcadas como concluídas.
4. Atualização da seção de ESTADO no arquivo {SPEC_FILE} para indicar que está em implementação.
5. O que resta pendente (se aplicável). 
6. Quais especializações dependentes podem progredir graças a essas mudanças.