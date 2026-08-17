# Decision Log

## Purpose of the app

The app is a simple goal-tracking demo. It exists to show the basic flow of creating, listing, editing, and deleting goals in a React application.

## Why React + Vite?

The repo uses Vite because it is lightweight and fast for small frontend projects. It is a good fit for an app that is learning state management and component composition.

## Why a custom hook?

The `useGoals` hook encapsulates state transitions. This keeps the logic out of the presentational components and makes the app easier to reason about.

## Why store goal objects instead of strings?

The app needs a unique identifier to support delete and update operations. Strings alone would be less reliable because the UI would have no stable key for distinguishing one item from another.

## Why editing happens inside each item?

Inline editing keeps the interaction close to the data row and avoids extra screens or route complexity. This fits the minimal app scope.

## Why validate empty input?

The app prevents blank goals from being saved. This avoids useless entries and makes the UI easier to use.

## Why is the helper file not fully used yet?

The project appears to have started with a reusable helper pattern, but the main app flow was simplified directly in the UI and hook. This is common in small demo projects where the fastest working path is prioritized over a strict pattern.

## What is intentionally not included?

The app deliberately avoids:

- persistence
- advanced validation
- external API integration
- user authentication
- progress tracking

These are typical next-step features for a real product but are beyond the current minimal demo scope.

## Current technical state

The app successfully builds with Vite and the core flow is operating as expected after wiring the state functions and props together.

## Recommended next change

The strongest improvement would be persisting goals in `localStorage`, because it makes the app useful without introducing backend complexity.
