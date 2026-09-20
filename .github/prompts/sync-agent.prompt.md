---
name: sync-agent
description: Sincroniza AGENTS.md com as últimas mudanças do projeto. Se não existe, o cria desde zero.
---

Objetivo
- Manter `AGENTS.md` sempre atualizado com as últimas mudanças do projeto.
- Se `AGENTS.md` não existe, criá-lo desde zero com uma guia completa e accionável do agente.

Entradas
- BASE_DIR: ./
- AGENT_FILE: AGENTS.md


Fluxo obrigatório

1. Ler o contexto de trabalho e as regras:
  - .github/copilot-instructions.md
  - .specify/memory/constitution.md
  - spec ativa: spec.md, plan.md, tasks.md

2. Detectar alterações relevantes no projeto:
  - Inspecionar a estrutura atual de pastas e arquivos.
  - Priorizar alterações em `/app`, `.specify` e `.github`.
  - Identificar adições, remoções e modificações que afetem o comportamento do sistema ou o fluxo de trabalho.

3. Sincronizar `AGENTS.md`:
  - Se existir: atualizar apenas o necessário (abordagem incremental, sem reescrever tudo).
  - Se não existir: criá-lo com a estrutura inicial completa.
  - Preservar conteúdo manual útil, desde que não contradiga o estado real do repositório.
  - Remover informações obsoletas ou inconsistentes.

4. Estrutura necessária para `AGENTS.md` (mínimo):
  - Resumo do projeto.
  - Stack e restrições técnicas.
  - Estrutura de pastas vigente.
  - Módulos principais e responsabilidades.
  - Fluxos operacionais do agente (como contribuir, validar alterações e manter a consistência).
  - Regras de Spec-Driven Development aplicáveis ​​ao repositório.
  - Lista de arquivos críticos e suas finalidades.
  - Seção "Última sincronização" com a data atual e um breve resumo das alterações detectadas.

5. Critérios de qualidade:
  - Conteúdo claro, acionável e sem ambiguidades.
  - Não inventar arquivos, comandos ou capacidades inexistentes.
  - Manter a coerência com a constituição e a spec ativa.
  - Usar ASCII.

Saída obrigatória ao finalizar

1. Indicar se `AGENTS.md` foi criado ou atualizado.
2. Resumir as alterações aplicadas em `AGENTS.md`.
3. Listar os arquivos do projeto considerados para a sincronização.
4. Confirmar que as informações estão alinhadas com `.specify` e com o estado atual do repositório.