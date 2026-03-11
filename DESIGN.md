# DESIGN.md

## Goal
Deliver a frontend-only demo task dashboard with role-aware views and local persistence to illustrate Spec Kit + Roo orchestration: spec-first, small commits, AI-driven edits, and alignment between docs and implementation.

## Modules
- App shell: Next.js App Router layout, global styles
- Auth/session: demo role selection stored in localStorage
- Task data: localStorage-backed list with seed data; summary derivation
- Employee view: filtered tasks + status updates
- Manager/Admin controls: create/edit/delete tasks, change status/assignee
- Reset flow: clears localStorage (role + tasks) and returns to login

## Why orchestration/spec-driven workflow
- Spec-first ensures scope clarity (roles, CRUD, reset) before coding
- Plan/tasks enforce small, traceable increments and demo focus (no backend)
- Documentation (spec, plan, tasks, README, quickstart) stays consistent via governed edits
- Local-only architecture kept minimal per constitution (minimal stable demo)
