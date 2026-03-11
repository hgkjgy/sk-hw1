# Research: Demo Task Dashboard

## Decisions

- **Local persistence**: Use `localStorage` as primary store for demo auth role and task data. Rationale: Client-only requirement; meets persistence need without backend. Alternative: IndexedDB (overkill) or cookies (less structured).
- **Fallback when unavailable**: Maintain in-memory session store if `localStorage` is unavailable/full, with user warning. Rationale: Ensures demo remains usable. Alternative: Fail closed (would block demo).
- **Status values**: To Do, In Progress, Done. Rationale: Simple, aligns to spec. Alternative: Add Blocked; deferred to keep demo minimal.
- **Role visibility**: Employee sees only employee tasks; manager/admin see all tasks. Rationale: Matches spec and keeps logic simple. Alternative: Per-user ownership; not needed for demo.
- **Reset strategy**: Clear or reseed `localStorage` to default seed set; reload derived state. Rationale: Deterministic reset for demo. Alternative: Hard refresh only; less explicit.
- **UI scope**: Minimal components (forms, lists, summary stats, empty state) with basic validation and inline errors. Rationale: Demo-focused, fast to implement. Alternative: Full design system; out of scope.
- **Testing**: Light unit/UI tests with Vitest + React Testing Library for state helpers and key flows; manual validation for demo flows. Rationale: Balanced effort for demo. Alternative: Heavy E2E; out of scope.

## Open Points

- None; current scope is sufficiently defined for demo implementation.
