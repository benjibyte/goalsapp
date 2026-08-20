# Goals App

Goals App is a small client-side React application for practicing state, component composition, and event-driven updates. A user can add a goal, edit its title, delete it, or mark it complete. Completed goals are rendered in a separate faded section and can be returned to the active list.

## Features

- Add non-empty goals with an optional longer description through a controlled form.
- Edit a goal title inline.
- Delete goals.
- Toggle completion with the circular check button.
- Render active and completed goals in separate areas.
- Show an empty state when no goals exist.

## Run Locally

Requirements: Node.js and npm.

```sh
npm install
npm run dev
```

Vite opens the browser automatically and serves the app at `http://localhost:3000`, as configured in `vite.config.js`.

To create a production build:

```sh
npm run build
```

The build is written to `dist/`. To preview that build locally, run `npm run serve`.

## Project Structure

```text
src/
   App.jsx                 Composes the form and goal list.
   main.jsx                Mounts React at the #root element.
   index.css               Global and component styles.
   components/
      GoalForm.jsx          Controlled input and submit validation.
      GoalList.jsx          Splits goals into active and completed sections.
      GoalItem.jsx          Displays one goal and its actions.
   hooks/
      useGoals.js           Owns goal state and state transitions.
   utils/
      goalHelpers.js        Reusable helpers currently not imported by the UI.
```

## Data Model

Each goal is represented in memory as:

```js
{
   id: 'stable identifier',
   title: 'Read a chapter',
   description: 'Read pages 20 through 35 and write down three key ideas.',
   completed: false
}
```

The `id` distinguishes goals during rendering and update/delete operations. The `completed` boolean determines which section receives the goal.

## Important Limitation

Goals live only in React state. Refreshing the page clears them; there is no localStorage, backend, authentication, or multi-user data layer.