# Contracts

This front-end demo does not expose external APIs. Contracts here define UI/data contracts for the demo flows.

- Dashboard views: role-aware rendering (employee sees own tasks; manager/admin see all tasks and controls).
- Forms: task create/edit with required title/status, optional description/assignee role; inline validation messages.
- Summary stats: totals and counts by status, updated immediately after task mutations.
- Reset action: clears or reseeds localStorage and refreshes lists/stats/empty state.
