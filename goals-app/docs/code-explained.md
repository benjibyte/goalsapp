# How the Goals App Code Works

This guide follows one piece of data from browser startup through user interaction. The key idea is that `useGoals` owns committed application state, while components either display that state or hold temporary UI state.

## 1. Startup

`index.html` provides an empty `<div id="root"></div>`. `src/main.jsx` gives that element to React:

```jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

`StrictMode` is a development aid that helps expose certain problems; it does not create a second application state for production users.

## 2. State is created in the custom hook

`App` calls the hook and receives both data and operations:

```jsx
const { goals, addGoal, removeGoal, updateGoal, toggleGoal } = useGoals();
```

The state is an array of objects shaped like:

```js
{
  id: '...',
  title: 'Read a chapter',
  description: 'Read pages 20 through 35.',
  completed: false
}
```

The hook's setter is not passed to children. Instead, children receive named callbacks. This preserves the hook as the boundary that defines valid state transitions.

## 3. Adding a goal

`GoalForm` is a controlled component: its title input and optional description textarea values come from React state, and their `onChange` handlers update that state. On submit, it prevents the browser's default page navigation and rejects an empty trimmed title.

For a valid submission, it calls `onAddGoal(title, description)`. `App` has connected that prop to `addGoal` from the hook. The hook trims both fields, creates an ID using `crypto.randomUUID()` when available or a timestamp fallback, sets `completed` to `false`, and appends the object.

The second validation in the hook is intentional defense at the state boundary: callers other than the current form cannot insert a blank title through `addGoal`.

## 4. Rendering active and completed goals

`GoalList` does not duplicate the data. It derives two views from one array:

```jsx
const activeGoals = goals.filter(goal => !goal.completed);
const completedGoals = goals.filter(goal => goal.completed);
```

Active goals render in the main list. When at least one goal is completed, completed goals render in a separate `<section className="completed-goals">`. The CSS reduces that section's opacity and the item receives a line-through style.

The empty message appears only when both derived arrays are empty. Thus, completing the last active goal does not show the empty state; it shows the completed section instead.

## 5. Completing and restoring a goal

Every `GoalItem` displays a check button. Its label changes according to state so assistive technology can distinguish “Complete goal” from “Mark as active.” Clicking it calls `onToggle(goal.id)`.

The hook implements the transition by mapping over the previous array:

```js
const toggleGoal = (goalId) => {
  setGoals((prevGoals) =>
    prevGoals.map(goal =>
      goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
    )
  );
};
```

The object spread creates a replacement object for the matching goal. No goal object or array is mutated in place. On the next render, `GoalList` places the goal in the other section because the filter result changed.

## 6. Editing and deleting

`GoalItem` owns temporary title and description drafts, plus its edit-mode flag:

```jsx
const [draft, setDraft] = useState(goal.title);
const [draftDescription, setDraftDescription] = useState(goal.description || '');
const [isEditing, setIsEditing] = useState(false);
```

Normal mode displays the title inside a collapsed native `<details>` element. Opening it reveals the optional description in a smaller font. Edit mode displays inputs for both fields plus Save and Cancel. Save calls `onEdit(goal.id, draft, draftDescription)`; the hook trims both values and rejects blank titles before replacing only the matching goal. Cancel discards the local drafts by leaving the committed goal unchanged.

Delete calls `onDelete(goal.id)`. The hook uses `filter` to create an array without that goal.

## 7. Why `key={goal.id}` matters

When mapping goals to `GoalItem` components, `GoalList` supplies the stable ID as React's `key`. React uses keys to match items between renders. This is especially important when a goal moves between the active and completed lists.

## 8. The helper module

`src/utils/goalHelpers.js` exports `validateGoal` and `formatGoal`. Neither function is imported by the current UI, so neither affects runtime behavior. In particular, `validateGoal` contains a 100-character rule that the form does not currently enforce.

## 9. Persistence and scope

The state exists only for the current page session. A full refresh recreates the hook with an empty array. Adding persistence would require a deliberate choice such as synchronizing with `localStorage` or loading and saving through a backend.
