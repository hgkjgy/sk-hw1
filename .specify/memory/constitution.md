<!--
Sync Impact Report
- Version: N/A → 1.0.0
- Modified Principles: Initialized (all principles defined)
- Added Sections: Core Principles (concretized), Execution Constraints & Scope Control, Development Workflow, Governance
- Removed Sections: None
- Templates requiring updates:
  - .specify/templates/plan-template.md ✅ updated
  - .specify/templates/spec-template.md ✅ reviewed (no change)
  - .specify/templates/tasks-template.md ✅ reviewed (no change)
- Follow-up TODOs: None
-->

# sk-hw1 Constitution

## Core Principles

### I. Spec-First Development
- No implementation starts without an approved spec and plan derived from it.
- All design and scope decisions must trace back to the current spec.
Rationale: Prevents rework and ensures every change is intentional and reviewable.

### II. Small, Traceable Commits
- Commit in minimal, reviewable increments mapped to a single task or spec slice.
- Each commit must keep the system in a buildable and testable state.
Rationale: Enables clear history, easier reviews, and fast rollback when needed.

### III. AI-Driven Workflow Only
- No manual code edits outside the prescribed AI-driven commands/workflows.
- All changes must be generated through the governed automation pipeline.
Rationale: Preserves auditability and consistency of the development process.

### IV. Scope Alignment
- Implementation must stay aligned with the current spec and planned scope.
- Any scope change requires updating the spec/plan before coding.
Rationale: Prevents scope creep and keeps delivery predictable.

### V. Minimal, Stable, Testable Demo First
- Prefer the smallest demo that is stable, testable, and delivers value.
- Defer non-critical extras until the minimal slice is proven.
Rationale: Ensures usable increments and reduces unfinished work-in-progress.

### VI. Documentation-Implementation Consistency
- Documentation and implementation must be updated together for every change.
- Mismatches are treated as defects and must be resolved before release.
Rationale: Keeps knowledge accurate and reduces onboarding and maintenance risk.

### VII. Preserve Completed Behavior
- Runtime fixes must maintain all previously completed behavior with regression
  coverage when relevant.
- Add tests or checks to prove no regressions for any fix.
Rationale: Protects shipped value and prevents recurring defects.

## Execution Constraints & Scope Control
- All work items must reference the governing spec/plan section they implement.
- Changes outside approved scope are rejected until the spec/plan is amended.
- Automation logs (commands, outputs) are the source of truth for change history.

## Development Workflow
- Start with `/speckit.plan` and `/speckit.spec` to capture scope before coding.
- Break work into tasks aligned to user stories; each task yields one small commit.
- Run tests relevant to the touched surface area before and after each change.
- Update documentation in the same change set as code modifications.
- For fixes, add regression coverage proving preserved behavior.

## Governance
- This constitution supersedes conflicting process guidance in this repository.
- Amendments require documenting changes, version bumping per semantic rules, and
  updating dependent templates before adoption.
- Compliance is checked at plan creation, code review, and release gates; work
  that violates core principles is blocked until corrected.
- Versioning: MAJOR for principle removals or incompatible governance changes;
  MINOR for new principles or materially expanded guidance; PATCH for clarifying
  or editorial changes.

**Version**: 1.0.0 | **Ratified**: 2026-03-11 | **Last Amended**: 2026-03-11
