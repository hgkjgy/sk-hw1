# Demo Task Dashboard (Spec Kit + Roo)

Frontend-only demo task dashboard built with Next.js App Router + TypeScript. Roles: employee, manager, admin. Local-only storage (localStorage) for auth role and tasks. Created via Spec Kit workflows executed by Roo.

## Features
- Demo login with role selection (no real auth/backend)
- Role-aware dashboards: employee sees own tasks; manager/admin see all
- Employee can update task status
- Manager/Admin can create/edit/delete tasks
- Summary chips update immediately after changes
- Reset demo clears localStorage and redirects to login

## Tech
- Next.js 14.2.35 (App Router, React 18)
- TypeScript
- localStorage for demo state (with seed data fallback)

## Run
```
npm install
npm run dev
```
Open http://localhost:3000 and choose a role.

## Notes
- Demo-only: no backend, no production RBAC, minimal styling
- Data is local to the browser (cleared by Reset Demo)
