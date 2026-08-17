# Goals App Architecture

## Overview

This project is a lightweight React application for tracking personal goals. The app has a single primary workflow: the user enters a goal, the list renders the saved goals, and each item can be edited or deleted.

The structure is intentionally simple and matches a beginner-friendly Vite React setup.

## Primary Application Flow

1. The app starts in `src/main.jsx` and mounts the root component.
2. `src/App.jsx` calls the custom hook `useGoals`.
3. The hook owns the `goals` state array and exposes functions to add, remove, and update goals.
4. `GoalForm` sends new goal text into the hook.
5. `GoalList` receives the list and renders each goal item.
6. `GoalItem` handles inline editing and deletion for a single goal.

## File-by-File Summary

### `src/main.jsx`

This file is the mount point for the React app. It renders the application inside `React.StrictMode` and imports the global stylesheet.

### `src/App.jsx`

`App` is the top-level composition component. It orchestrates the stateful hook and passes the correct handlers down to the form and list components.

### `src/hooks/useGoals.js`

This is the main state management layer for the app. It maintains the `goals` array in React state and exposes:

- `addGoal(title)`
- `removeGoal(goalId)`
- `updateGoal(goalId, updatedTitle)`

The hook uses a generated ID for each goal and trims whitespace before saving to prevent empty values.

### `src/components/GoalForm.jsx`

This form accepts a goal string from the user. It validates that the field is not empty and calls `onAddGoal` with the submitted value.

### `src/components/GoalList.jsx`

This component receives the array of goals and displays either:

- a friendly empty-state message, or
- a list of `GoalItem` components.

### `src/components/GoalItem.jsx`

Each goal item is rendered here. It supports inline editing and deletion. When in edit mode, it shows a text input and save/cancel actions; otherwise it renders the title and edit/delete buttons.

### `src/utils/goalHelpers.js`

This file contains utility helpers for validation and formatting. The current app uses a minimal validation pattern but does not currently integrate these helpers into the main component flow.

## State Design

The app uses a single source of truth for goals:

- `goals` is stored in `useGoals`
- child components receive only the data they need
- mutation functions are passed as callbacks from the parent

This is a simple and clear pattern for a small app and keeps the flow easy to trace.

## Decisions and Trade-offs

### Why a custom hook?

The hook centralizes state logic so the app does not have to keep goal operations inside the top-level component. This makes the code easier to test and reason about.

### Why simple objects for goals?

Each goal is represented as an object with:

- `id`
- `title`

This is enough for the app's functionality and keeps the data model easy to understand.

### Why inline editing in the item component?

The edit logic lives near the goal row so the user can modify a single item without a separate page or dialog.

## Current Behavior

The app currently supports:

- adding a new goal
- deleting an existing goal
- editing the title of an existing goal
- showing a helpful empty-state message when there are no goals

## Limitations

The current app is intentionally limited:

- it stores data only in React state, so it resets on refresh
- it does not persist to localStorage or a backend
- it does not include categories, completion tracking, or timestamps
- the helper utilities are present but not yet fully integrated into the main UI flow

## Suggested Next Improvements

- persist goals in `localStorage`
- add goal completion toggles
- move validation into a consistent shared utility path with the form and hook
- add a cleaner visual layout and responsive styling
