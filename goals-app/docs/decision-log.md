# Decision Log

This document records the current implementation choices and their consequences. It describes decisions visible in the repository, not features that are merely planned.

## Purpose

The application is a focused learning example for React state, controlled inputs, callback props, immutable array updates, and derived rendering. Its domain is goal tracking, but it is not yet a production data-management system.

## React and Vite

React supplies component rendering and state hooks. Vite supplies the development server and production build. The server is configured to open the browser on port 3000, and the build output goes to `dist/`.

## One state owner

Goal state lives in `useGoals` rather than in `GoalList` or `GoalItem`. This creates one source of truth: the UI cannot accidentally maintain separate active and completed copies. `GoalList` derives those views with `filter`.

## Goal objects instead of strings

Each goal has an ID because rendering, editing, deletion, and completion toggling need to identify one goal reliably. The `title` is the short primary label, while `description` stores optional supporting detail. The `completed` boolean is part of the same object because completion changes the goal's state and therefore its rendered section.

## Immutable updates

The hook uses `map`, `filter`, array spread, and object spread. These operations create replacement arrays or objects rather than mutating existing state. That makes the state transitions explicit and gives React new references with which to detect updates.

## Inline editing

Editing is colocated with `GoalItem` because the component needs temporary title and description drafts plus edit-mode state for one row. The committed title and description still belong to the hook. This separates temporary interaction state from application state.

## Collapsed descriptions

Descriptions are optional and hidden inside a native `<details>` disclosure for each goal. This keeps the list scannable, especially on mobile, while allowing the user to open supporting detail on demand. The description uses a smaller font than the title and remains editable through the item's Edit action.

## Completion interaction

The same circular check button toggles both directions: active to completed and completed back to active. This avoids an irreversible UI action and keeps the operation symmetric. Completed goals remain editable and deletable because completion changes classification, not ownership or existence.

## Validation boundary

The form rejects whitespace-only input for immediate feedback. `useGoals.addGoal` and `updateGoal` also trim and reject blank values, protecting the state layer from invalid callers. The separate `validateGoal` helper is not currently used, so its 100-character rule is not part of the app's behavior.

## Deliberate limitations

The project currently has no:

- persistence across refreshes
- backend or external API
- authentication or user separation
- automated test suite
- timestamps, categories, priorities, or progress percentages

These omissions keep the example small, but they also define why the current state model should not be treated as production storage.

## Next architectural step

Persistence is the clearest next addition. `localStorage` would extend the current single-user client-side model with relatively little infrastructure; a backend would be appropriate only when synchronization, authentication, or multi-device access becomes a requirement.
