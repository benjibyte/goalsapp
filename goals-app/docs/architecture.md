# Goals App Architecture

## Overview

This is a single-page React application. The application state is an in-memory array of goal objects. React re-renders the view when that array changes; there is no router, server API, or persistence layer.

## Component and Data Flow

1. `src/main.jsx` imports the stylesheet and mounts `<App />` inside the DOM element with `id="root"`.
2. `App` calls `useGoals()`, so the hook becomes the single owner of the goal array and its state transitions.
3. `App` passes `addGoal` to `GoalForm` and passes the goal array plus mutation callbacks to `GoalList`.
4. `GoalList` derives `activeGoals` and `completedGoals` by filtering the same array. It does not maintain a second completed-goals store.
5. `GoalItem` renders one goal. Its check button calls `onToggle`, while edit and delete buttons call their corresponding callbacks.
6. A callback updates the array in `useGoals`; the changed state flows down again as props.

This is a unidirectional data-flow design: data moves from the hook through `App` into children, and children communicate requested changes upward through callbacks.

## Data Model

The JSDoc type in `useGoals.js` describes a goal as:

```js
{ id: string, title: string, description: string, completed: boolean }
```

New goals receive a generated ID, a trimmed title, an optional trimmed description, and `completed: false`.

## State Transitions

`useGoals` exposes these operations:

- `addGoal(title, description)`: trims the title, ignores an empty result, trims the optional description, and appends a new goal.
- `removeGoal(goalId)`: creates a new array excluding the matching ID.
- `updateGoal(goalId, updatedTitle, updatedDescription)`: trims the new title and description, then maps the matching goal to a new object with both updated fields.
- `toggleGoal(goalId)`: maps the matching goal to a new object with `completed` inverted.

Each operation uses the functional form of the React state setter. Therefore, the calculation receives the latest previous array, which is important when updates may be queued by React. The array and affected goal objects are replaced rather than mutated in place.

## Responsibilities by File

### `src/main.jsx`

Application entry point. It mounts React using `ReactDOM.createRoot`, wraps `App` in `React.StrictMode`, and loads `index.css`.

### `src/App.jsx`

Composition and prop wiring. It does not own the goal data; it connects the hook's operations to the form and list.

### `src/hooks/useGoals.js`

State-management boundary. It owns the array and contains the rules for creating, deleting, editing, and completing goals.

### `src/components/GoalForm.jsx`

Controlled form. The title input and optional description textarea are stored locally in the form component. On submit, it prevents the browser's default form action, rejects a whitespace-only title, calls `onAddGoal` with both fields, and clears both fields after a successful submission.

### `src/components/GoalList.jsx`

Derived-view component. It filters the supplied array into active and completed subsets, renders the empty message only when both subsets are empty, and renders completed goals inside a visually faded section.

### `src/components/GoalItem.jsx`

Single-goal interaction component. It renders the short title with a Details toggle. The optional description appears in smaller text inside an absolutely positioned floating card when opened, so it does not participate in the goal row's flex sizing. Edit mode owns temporary title and description drafts; committed fields, completion status, and deletion remain owned by `useGoals`.

### `src/utils/goalHelpers.js`

Exports `validateGoal` and `formatGoal`, but no current component imports either function. They have no effect on the running application until they are wired into the form or hook.

## Limitations

- A refresh loses all goals because state is not persisted.
- Completion is a boolean only; there are no timestamps, progress values, categories, or ordering controls.
- Validation is limited to rejecting empty or whitespace-only titles. The `validateGoal` helper's 100-character rule is not currently used by the UI.
- There are no automated tests in the repository.
