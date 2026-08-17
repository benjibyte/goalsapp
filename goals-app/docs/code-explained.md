# How the Goals App Code Works

## 1. Startup and render process

The app starts in `src/main.jsx`:

```jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

This tells React to mount the `App` component inside the `#root` element from `index.html`.

## 2. Top-level component structure

In `src/App.jsx`:

```jsx
const { goals, addGoal, removeGoal, updateGoal } = useGoals();
```

The app calls `useGoals`, which gives the component access to the list of goals and the functions needed to change it.

Then it renders:

```jsx
<GoalForm onAddGoal={addGoal} />
<GoalList goals={goals} onDelete={removeGoal} onEdit={updateGoal} />
```

That means the form and list are controlled by the state exposed by the hook.

## 3. State ownership

The actual list of goals is owned by `src/hooks/useGoals.js`.

```js
const [goals, setGoals] = useState([]);
```

This is the central data store for the app. All mutations happen through this hook, which keeps the logic in one place.

### Add goal

```js
const addGoal = (title) => {
  const trimmedTitle = title.trim();

  if (!trimmedTitle) {
    return;
  }

  const newGoal = {
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    title: trimmedTitle,
  };

  setGoals((prevGoals) => [...prevGoals, newGoal]);
};
```

This prevents empty titles and creates a new goal object with a unique `id`.

### Remove goal

```js
const removeGoal = (goalId) => {
  setGoals((prevGoals) => prevGoals.filter(goal => goal.id !== goalId));
};
```

This filters the list and removes the matching goal.

### Update goal

```js
const updateGoal = (goalId, updatedTitle) => {
  const trimmedTitle = updatedTitle.trim();

  if (!trimmedTitle) {
    return;
  }

  setGoals((prevGoals) =>
    prevGoals.map(goal =>
      goal.id === goalId ? { ...goal, title: trimmedTitle } : goal
    )
  );
};
```

This updates only the matching item while leaving the rest of the list unchanged.

## 4. Form behavior

In `src/components/GoalForm.jsx`:

- the component tracks local form state with `useState('')`
- it validates the value before submission
- it calls `onAddGoal(goal)` if the value is not empty
- it clears the field and resets the validation state afterward

This is a simple controlled input pattern in React.

## 5. List rendering

In `src/components/GoalList.jsx`:

```jsx
{goals.length === 0 ? (
  <p>No goals yet. Add one above to get started.</p>
) : (
  <ul>
    {goals.map(goal => (
      <GoalItem key={goal.id} goal={goal} onDelete={onDelete} onEdit={onEdit} />
    ))}
  </ul>
)}
```

If the list is empty, an empty-state message is shown. Otherwise, each goal is rendered as a `GoalItem`.

## 6. Item editing behavior

In `src/components/GoalItem.jsx`, each item owns a local `draft` state while editing:

```jsx
const [draft, setDraft] = useState(goal.title);
const [isEditing, setIsEditing] = useState(false);
```

The component switches between two views:

- normal view: title + edit/delete buttons
- editing view: text input + save/cancel buttons

When save is clicked:

```jsx
onEdit(goal.id, draft);
setIsEditing(false);
```

This calls the update function from the parent state hook.

## 7. Utility helpers

`src/utils/goalHelpers.js` provides helper functions for validation and formatting:

```js
export const validateGoal = (goal) => { ... };
export const formatGoal = (goal) => { ... };
```

These are good reusable utility patterns, but the app is currently not fully wired to use them in the main form/edit flow. They serve as a simple baseline for future consistency checks.

## 8. Why the code works well for a small app

This project keeps responsibilities separated:

- `App` composes the UI
- `useGoals` owns the data
- `GoalForm` handles input
- `GoalList` and `GoalItem` handle rendering and editing

This is a standard React pattern and is easy to extend as the app grows.

## 9. Where the app is still limited

The app does not persist data. That means the list resets whenever the page is refreshed. For a real user-facing app, the next step would be to persist to `localStorage` or a backend.

The project also has underused helpers and a minimal styling layer, which suggests it was created as a learning/app demo rather than a full production feature set.
