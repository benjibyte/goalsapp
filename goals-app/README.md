# Goals App

Goals App is a small mobile-first client-side React application for practicing state, component composition, and event-driven updates. A user can add goals and reminders, edit their titles, delete them, or mark them complete. Completed items are rendered in a separate faded section and can be returned to the active list.

## Features

- Add non-empty goals with an optional longer description through a controlled form.
- Edit a goal title inline.
- Delete goals.
- Toggle completion with the circular check button.
- Render active and completed goals in separate areas.
- Show an empty state when no goals exist.
- Add, edit, delete, complete, and restore reminders with optional descriptions.
- Publish goals and reminders through a temporary persistence module and browser event.

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
   App.jsx                 Composes the goal and reminder forms and lists.
   main.jsx                Mounts React at the #root element.
   index.css               Global and component styles.
   components/
      GoalForm.jsx          Controlled input and submit validation.
      GoalList.jsx          Splits goals into active and completed sections.
      GoalItem.jsx          Displays one goal and its actions.
      ReminderForm.jsx      Controlled reminder input and submit validation.
      ReminderItem.jsx      Displays one reminder and its actions.
      ReminderList.jsx      Splits reminders into active and completed sections.
   hooks/
      useGoals.js           Owns goal state and state transitions.
      useReminders.js       Owns reminder state and state transitions.
   utils/
      goalHelpers.js        Reusable helpers currently not imported by the UI.
      temporaryPersistence.js Temporary export and subscription boundary.
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

## Temporary Persistence Export

`src/utils/temporaryPersistence.js` keeps the latest `{ goals, reminders }` snapshot in memory and exports functions for an external program running in the same JavaScript environment:

- `getTemporaryPersistenceSnapshot()` reads a defensive snapshot.
- `replaceTemporaryPersistence(data)` replaces both collections.
- `updateTemporaryPersistence(collection, items)` updates one collection.
- `subscribeToTemporaryPersistence(callback)` subscribes to changes.

In a browser, every update also emits `goals-app:data-changed` on `window`, with the snapshot in `event.detail`. This is intentionally temporary: refreshing the page clears data, and a real external server still needs an API adapter to write the received snapshot to a database.