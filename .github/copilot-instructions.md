# Instruções do Copilot

Sempre utilize o Spec-Driven Development neste repositório.

Antes de fazer alterações, identifique a spec ativa e leia nesta ordem:

- .specify/memory/constitution.md
- .specify/specs/<spec-ativa>/spec.md
- .specify/specs/<spec-ativa>/plan.md
- .specify/specs/<spec-ativa>/tasks.md

Regras:
- Considere os documentos `.specify` como a fonte da verdade.
- Não implemente funcionalidades que não estejam descritas em `spec.md`.
- Siga o `plan.md` para a arquitetura e a sequência de execução.
- Realize o trabalho tarefa por tarefa, com base em `tasks.md`.
- Trabalhe apenas em itens pendentes (`- [ ]`) e marque-os quando forem realmente concluídos.
- Se não houver tarefas pendentes, não reimplemente: valide a consistência entre a constituição, a spec, o plano, as tarefas e o código existente.
- Após cada alteração, explique qual tarefa foi concluída e quais arquivos foram modificados.
