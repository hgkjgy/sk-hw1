# Tasks: Demo Task Dashboard

**Input**: Design documents from `/specs/002-demo-task-dashboard/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Light unit/UI tests where specified; primary validation via manual demo flows.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 Initialize Next.js App Router project with TypeScript in `./` (if not already) and set feature branch context.
- [ ] T002 Add base folder structure per plan: `src/app/(dashboard)/`, `src/app/components/`, `src/app/lib/`, `src/app/styles/`.
- [ ] T003 [P] Add minimal styling support (global CSS) in `src/app/globals.css` or `src/app/styles/`.
- [ ] T004 [P] Scaffold demo layout shell for dashboard route in `src/app/(dashboard)/layout.tsx` with role-aware placeholders.

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T005 Implement localStorage helper with in-memory fallback in `src/app/lib/storage.ts` (get/set/clear with availability check).
- [ ] T006 Seed demo tasks and session defaults utility in `src/app/lib/demo-data.ts` (roles, tasks, defaults).
- [ ] T007 Establish shared types (Role, Task, SummaryStats) in `src/app/lib/types.ts`.
- [ ] T008 [P] Add summary computation helper in `src/app/lib/summary.ts` (counts per status, total) using types.

## Phase 3: User Story 1 - Demo Login & Role Dashboard (Priority: P1) 🎯 MVP

**Goal**: Role selection and dashboard shell per role with summary + empty state.

**Independent Test**: Select role → login → see role-specific dashboard with tasks or empty state and summary stats (no real backend).

- [ ] T009 Implement demo login UI (role picker + submit) in `src/app/(dashboard)/login/page.tsx` storing role via storage helper.
- [ ] T010 Wire dashboard route guard to load role/session from storage and redirect unauthenticated users in `src/app/(dashboard)/page.tsx`.
- [ ] T011 Render role-aware dashboard shell with task list placeholder and summary chips in `src/app/(dashboard)/page.tsx`.
- [ ] T012 [P] Implement summary chips component using helper in `src/app/components/SummaryChips.tsx`.
- [ ] T013 Show empty state component when no tasks for role in `src/app/components/EmptyState.tsx`.
- [ ] T014 Persist selected role to storage on login and load on dashboard init.

## Phase 4: User Story 2 - Employee Updates Own Task Status (Priority: P2)

**Goal**: Employee can view and update own task status with validation and persistence.

**Independent Test**: Employee logs in, sees own tasks, changes status to a valid value, summary updates, change persists after reload.

- [ ] T015 Render employee task list filtered by role in `src/app/components/TaskList.tsx` using stored tasks.
- [ ] T016 Add status update control for employee tasks with allowed values in `src/app/components/TaskList.tsx`.
- [ ] T017 Validate status selection (To Do, In Progress, Done) before save; block invalid entries.
- [ ] T018 Persist employee status changes to storage and recompute summary in task update handler.
- [ ] T019 Reload from storage on page load to confirm persistence for employee flow.

## Phase 5: User Story 3 - Manager/Admin Manage Tasks & Reset Demo (Priority: P3)

**Goal**: Manager/admin can create/edit/delete tasks, see stats update, and reset demo data.

**Independent Test**: Manager creates/edits/deletes tasks, sees updates reflected and persisted; reset restores defaults/empty state.

- [ ] T020 Add manager/admin task list view (all tasks) in `src/app/components/TaskList.tsx` with role checks.
- [ ] T021 Implement task create form (title required, status allowed values, optional description/assignee role) in `src/app/components/TaskForm.tsx`.
- [ ] T022 Implement task edit/delete controls for manager/admin in `src/app/components/TaskList.tsx`.
- [ ] T023 Validate required fields and statuses; show inline errors on form submit.
- [ ] T024 Persist task create/edit/delete to storage and recompute summary.
- [ ] T025 Implement reset action to clear/reseed storage and refresh dashboard view in `src/app/(dashboard)/page.tsx`.
- [ ] T026 Ensure empty state renders correctly after reset or full delete.

## Phase N: Polish & Cross-Cutting Concerns

- [ ] T027 [P] Add light UI polish (spacing/typography) in `src/app/styles/`.
- [ ] T028 [P] Add minimal unit/UI tests for helpers/components (storage, summary, task list interactions) in `tests/ui/`.
- [ ] T029 Update docs: add feature summary and usage notes to `README.md` and align with `specs/002-demo-task-dashboard/quickstart.md`.
- [ ] T030 Manual runtime validation pass of primary flows; if any runtime issues found, add fix tasks referencing the failing path.

## Dependencies & Execution Order

- Setup → Foundational → US1 → US2 → US3 → Polish.
- US2 depends on storage/types/helpers (Phase 2) and dashboard shell (US1).
- US3 depends on storage/types/helpers and task list components from US2.

## Parallel Opportunities

- Setup styling (T003) can run in parallel with layout scaffold (T004).
- Summary helper (T008) can proceed parallel to storage/types (T005–T007) once types drafted.
- Summary chips (T012) parallel with empty state (T013) after dashboard shell (T011) exists.
- Tests/polish (T027–T028) can run parallel after core stories stabilize.

## Implementation Strategy

- MVP: Complete US1 to demonstrate role login + dashboard shell with summary/empty state.
- Incremental: Add US2 (employee status updates/persistence), then US3 (manager/admin CRUD + reset).
- Keep commits small: align each task to one commit; update docs alongside code changes.
