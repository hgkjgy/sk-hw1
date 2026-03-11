# Data Model: Demo Task Dashboard

## Entities

### DemoUserSession
- role: enum { employee, manager, admin }
- displayName: string (optional, demo label)
- lastLoginAt: timestamp (optional, for display)
- persisted: boolean (true if stored in localStorage)

### Task
- id: string (client-generated unique ID)
- title: string (required)
- status: enum { To Do, In Progress, Done } (required)
- description: string (optional)
- assignedRole: enum { employee, manager, admin } (for visibility/ownership)
- createdByRole: enum { employee, manager, admin }
- createdAt: timestamp
- updatedAt: timestamp

### SummaryStats (derived)
- total: number
- byStatus: { toDo: number, inProgress: number, done: number }

## Validation Rules
- Task.title: required, non-empty
- Task.status: must be one of { To Do, In Progress, Done }
- Task.assignedRole: must be a valid role
- Employee can update status only on tasks where assignedRole = employee
- Manager/admin can create/edit/delete any task

## State Persistence
- Primary store: localStorage keys for auth role/session and task list
- Fallback: in-memory store if localStorage unavailable/full (non-persistent)

## Derived Behavior
- SummaryStats recalculated on any task create/update/delete or status change.
- Empty state shown when filtered task list is empty for active role.
- Reset clears or reseeds localStorage and recomputes derived state.
