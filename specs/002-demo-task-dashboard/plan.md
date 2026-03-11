# Implementation Plan: Demo Task Dashboard

**Branch**: `002-demo-task-dashboard` | **Date**: 2026-03-11 | **Spec**: specs/002-demo-task-dashboard/spec.md
**Input**: Feature specification from `/specs/002-demo-task-dashboard/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Deliver a front-end demo task management dashboard with role-aware views (employee/manager/admin), demo login, localStorage-backed auth/task state, summary statistics, reset flow, empty states, and basic validation. Implement with Next.js App Router and TypeScript, prioritizing a minimal stable demo and small, traceable steps.

### In-scope for this iteration (demo-focused)
- Demo login with role selection (employee, manager, admin) without real auth backend.
- Role-aware dashboard views with task lists per role visibility.
- Employee updates own task status (valid statuses only) with inline validation.
- Manager/admin create/edit/delete tasks with validation and immediate UI/state updates.
- Summary statistics recalculated on task changes (per-status counts, total).
- Persistence in localStorage for auth role and tasks; in-memory fallback if unavailable.
- Reset demo data action to clear or reseed localStorage and refresh UI/empty state.
- Empty state rendering when no tasks for active role.
- Documentation updates alongside code changes.

### Out-of-scope (placeholders/future)
- Real backend authentication or identity management.
- Production-grade RBAC or security hardening.
- External API integrations beyond demo/local behavior.
- Persistent database storage.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript (Next.js App Router)  
**Primary Dependencies**: Next.js, React, localStorage (browser), light UI lib if needed (TBD minimal)  
**Storage**: localStorage for demo auth/task state; in-memory fallback when unavailable  
**Testing**: Vitest/React Testing Library (lightweight UI/unit), manual UI validation for demo flows  
**Target Platform**: Modern desktop browsers  
**Project Type**: Front-end demo dashboard (Next.js App Router)  
**Performance Goals**: Responsive interactions; summary updates within ~1s after task change  
**Constraints**: Client-only (no real backend/RBAC); keep demo minimal and stable; avoid real APIs unless needed for demo parity  
**Scale/Scope**: Small demo scope: role-aware dashboard, task CRUD per role, summary stats, reset, validation, empty states

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Spec-First: Spec and plan are approved before any implementation work starts.
- Scope Alignment: Planned work maps to explicit spec sections; scope changes
  require spec/plan updates first.
- Small, Traceable Commits: Break tasks into minimal, independently testable
  slices with one task per commit.
- AI-Driven Workflow: All code changes are produced through governed commands;
  no manual edits outside the AI pipeline.
- Minimal, Stable, Testable Demo: Prioritize the smallest demo that is stable
  and testable before expanding scope.
- Documentation Consistency: Doc updates are included with every related code
  change—no mismatches allowed.
- Preserve Completed Behavior: Plans include regression coverage for any area
  touched to ensure no previously completed behavior regresses.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
src/
└── app/                # Next.js App Router
    ├── (dashboard)/    # role-aware routes/layouts
    ├── components/     # UI components (forms, lists, stats, empty states)
    ├── lib/            # localStorage helpers, demo data seeding
    └── styles/         # minimal styling if needed

tests/
└── ui/                 # lightweight UI/unit tests (Vitest/RTL)
```

**Structure Decision**: Single Next.js App Router front-end with role-aware dashboard under `src/app`, shared UI components, and localStorage utilities in `src/app/lib`.

## Phase 0: Research (completed)

- Clarified persistence (localStorage + in-memory fallback), status values, role visibility, reset strategy, minimal UI scope, and light testing approach. See research.md.

## Phase 1: Design & Contracts

- Data model captured in data-model.md (DemoUserSession, Task, SummaryStats, validation rules).
- UI/data contracts documented in contracts/README.md.
- Quickstart drafted for setup/run/usage notes.

## Constitution Check (post-design)

- Spec-First: ✅ spec and plan present.
- Scope Alignment: ✅ plan maps to spec; out-of-scope items listed.
- Small, Traceable Commits: ✅ planned as small slices per task/feature area.
- AI-Driven Workflow: ✅ will use governed commands only.
- Minimal, Stable, Testable Demo: ✅ scoped to minimal demo flows.
- Documentation Consistency: ✅ doc updates included (quickstart, contracts, data model).
- Preserve Completed Behavior: ✅ reset and persistence flows include regression expectations.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | All planned work aligns with constitution gates | N/A |
