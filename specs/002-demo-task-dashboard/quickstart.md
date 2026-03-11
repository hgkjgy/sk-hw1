# Quickstart: Demo Task Dashboard

## Prerequisites
- Node.js and pnpm/npm/yarn installed
- Modern browser

## Setup
1. Install dependencies: `pnpm install` (or `npm install` / `yarn install`).
2. Run dev server: `pnpm dev` (or `npm run dev` / `yarn dev`).
3. Open the app in the browser (default: http://localhost:3000).

## Using the Demo
1. Choose a role (employee, manager, admin) and log in (demo-only, no backend).
2. View the role-aware dashboard:
   - Employee: sees own tasks; can update status.
   - Manager/Admin: see all tasks; can create/edit/delete tasks.
3. Observe summary statistics updating after each task change.
4. Use reset to clear or reseed demo data; empty state shows when no tasks exist.

## Notes
- Data is stored in `localStorage`; if unavailable, session-only memory is used.
- No real authentication, external APIs, or persistent database are used.
- Keep changes minimal and demo-focused.
