# PROMPT.md

Repo workflow: Spec Kit + Roo

- Commands used: /speckit.constitution → /speckit.specify → /speckit.plan → /speckit.tasks → /speckit.implement (manual step execution)
- Principles followed: spec-first, small commits, AI-driven edits, minimal stable demo, doc-code consistency, preserve behavior.
- Key prompts: feature description (role-aware dashboard, localStorage, reset); plan/tasks generation; stepwise implementation with status reports.
- Outcome: frontend-only Next.js demo with employee status updates, manager/admin CRUD, summary chips, reset flow; all persisted in localStorage.
- Lessons: keeping scope demo-only simplified decisions (no backend/RBAC); small tasks enabled safe iteration; seed data plus reset ensures repeatable demos.
