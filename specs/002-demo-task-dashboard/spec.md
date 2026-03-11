# Feature Specification: Demo Task Dashboard

**Feature Branch**: `002-demo-task-dashboard`  
**Created**: 2026-03-11  
**Status**: Draft  
**Input**: User description: "請為這個專案建立 baseline specification。

我要做的是一個前端 demo 任務管理 dashboard，需求如下：

- 支援三種 demo 角色：employee、manager、admin
- 需要有 demo login flow
- dashboard 要根據角色顯示不同內容
- employee 可以更新自己的 task 狀態
- manager 和 admin 可以管理所有 tasks
- manager 和 admin 可以新增 demo task
- 要顯示 summary statistics
- auth state 與 task state 要存到 localStorage
- 需要 reset demo data 流程
- 需要基本 form validation
- 當沒有任務時要顯示 empty state

請保持專案為 demo-focused：
- 不需要真正後端驗證
- 不需要資料庫持久化
- 不需要 production 等級 RBAC
- 除非只是為了 demo 相容性，否則不要接真實 API"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Demo Login & Role Dashboard (Priority: P1)

Employee, manager, or admin selects a demo role, signs in via demo login, and sees a dashboard tailored to that role, including role-appropriate tasks and summary statistics. Empty state is shown when no tasks exist for the role.

**Why this priority**: Enables core demo entry and role-based visibility; all other flows depend on this.

**Independent Test**: User selects a role, completes demo login, and sees role-specific dashboard with tasks or empty state plus summary stats without any real backend calls.

**Acceptance Scenarios**:

1. **Given** a visitor opens the demo, **When** they choose employee and log in, **Then** they see the employee dashboard with their tasks (or empty state) and current summary stats.
2. **Given** a manager logs in, **When** the dashboard loads, **Then** it shows all tasks and summary stats and exposes management controls (create/edit/delete).
3. **Given** no tasks exist for a role, **When** the dashboard loads, **Then** an empty state message and CTA appear instead of a blank table.

---

### User Story 2 - Employee Updates Own Task Status (Priority: P2)

Employee views their assigned tasks and updates status (e.g., To Do, In Progress, Done) with basic validation; changes persist across reloads via localStorage and update summary stats.

**Why this priority**: Demonstrates task progression for the employee role and persistence behavior.

**Independent Test**: Employee logs in, edits one task status, sees confirmation and updated summary; after page reload, the change remains.

**Acceptance Scenarios**:

1. **Given** an employee has tasks, **When** they change a task status to a valid value, **Then** the dashboard updates the task, summary stats recalc, and the change persists after reload.
2. **Given** an employee enters an invalid status or leaves required fields empty, **When** they attempt to save, **Then** validation prevents the change and shows an inline message.

---

### User Story 3 - Manager/Admin Manage Tasks & Reset Demo (Priority: P3)

Manager/admin can create, edit, or delete any task, with validation, and can trigger a reset that clears demo data and restores defaults; summary stats update immediately and empty state appears when no tasks remain.

**Why this priority**: Shows administrative control, data seeding/reset, and cross-role visibility.

**Independent Test**: Manager logs in, creates a new task, edits another, deletes one, observes stats update, triggers reset, and sees default or empty state restored across roles after reload.

**Acceptance Scenarios**:

1. **Given** a manager/admin is on the dashboard, **When** they create a task with required fields, **Then** it appears in the list for all roles per visibility rules and stats update immediately.
2. **Given** a manager/admin edits or deletes a task, **When** they save the change, **Then** the update is reflected for all roles and persists after reload.
3. **Given** demo data has been modified, **When** the manager/admin triggers reset, **Then** localStorage is cleared or reseeded to defaults and the dashboard shows empty state or seed tasks accordingly.

### Edge Cases

- Demo login without selecting a role should be blocked with validation.
- localStorage unavailable or full: fall back to in-memory session (non-persistent) with a warning in the UI.
- Duplicate task titles: allow but ensure unique task IDs to avoid collisions.
- Invalid status values or missing required fields prevent submission with inline error messaging.
- Reset flow confirms intent to avoid accidental data loss.
- Empty state must render gracefully after bulk delete or reset.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Provide a demo login that lets users choose a role (employee, manager, admin) without real authentication.
- **FR-002**: Show a role-based dashboard view: employee sees only their tasks; manager/admin see all tasks and management controls.
- **FR-003**: Persist auth role selection and task data to localStorage; fallback to in-memory session if persistence fails.
- **FR-004**: Allow employees to update status of their own tasks only; enforce valid statuses (To Do, In Progress, Done).
- **FR-005**: Allow manager/admin to create tasks with required fields (title, status, optional description/assignee) and validation.
- **FR-006**: Allow manager/admin to edit or delete any task; updates must persist and refresh visible lists immediately.
- **FR-007**: Display summary statistics (counts per status and total tasks) that update immediately after any task change.
- **FR-008**: Provide a reset action that clears or reseeds demo data in localStorage and refreshes the dashboard accordingly.
- **FR-009**: Show a clear empty state with guidance/CTA whenever no tasks are available for the active role.
- **FR-010**: Apply basic form validation (required fields, allowed status values) with inline feedback before saving changes.
- **FR-011**: Avoid real backend calls or production-grade RBAC; all data remains client-side for demo purposes.

### Key Entities *(include if feature involves data)*

- **DemoUserSession**: role (employee/manager/admin), display name or identifier, session state persisted in localStorage.
- **Task**: id, title, status, description (optional), createdByRole, assignedRole (or owner), timestamps for created/updated.
- **SummaryStats**: counts by status, total tasks; derived from current task list per role visibility.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can select a role and reach the role-specific dashboard within 30 seconds without backend dependencies.
- **SC-002**: Task updates persist across reloads: after a status change and page reload, 100% of changes remain visible for the appropriate roles.
- **SC-003**: Manager/admin can create a task and see it listed with updated summary stats within 1 second of submission.
- **SC-004**: Reset action clears or reseeds demo data and shows empty state or defaults within 2 seconds, with confirmation shown to the user.
- **SC-005**: Empty state messaging appears whenever zero tasks exist for the active role, with a visible CTA to add or reset tasks.
- **SC-006**: Form validation blocks submissions with missing required fields or invalid statuses 100% of the time and shows inline guidance.

## Assumptions

- Valid status values: To Do, In Progress, Done.
- Seed data (if used) is minimal and purely client-side; no network calls are required.
- Roles are selected via a demo login UI; no username/password is required.
- localStorage is expected to be available; if not, in-memory state is used for the session only.
- Tasks are visible to manager/admin; employees see only tasks assigned to employee role.
