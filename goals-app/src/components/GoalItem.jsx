import React, { useState } from 'react';

// @ts-ignore
const GoalItem = ({ goal, onEdit, onDelete, onToggle }) => {
  const [draft, setDraft] = useState(goal.title);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onEdit(goal.id, draft);
    setIsEditing(false);
  };

  const titleLengthClass = goal.title.length > 70
    ? ' goal-title-condensed'
    : goal.title.length > 40
      ? ' goal-title-compact'
      : '';

  return (
    <li className={`goal-item${goal.completed ? ' completed' : ''}`}>
      <button
        className="complete-button"
        onClick={() => onToggle(goal.id)}
        aria-label={goal.completed ? `Mark ${goal.title} as active` : `Complete ${goal.title}`}
        title={goal.completed ? 'Mark as active' : 'Complete goal'}
      >
        ✓
      </button>
      {isEditing ? (
        <>
          <input
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />
          <div className="goal-item-actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <h3 className={`goal-title${titleLengthClass}`} title={goal.title}>
            {goal.title}
          </h3>
          <div className="goal-item-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(goal.id)} id="delete-button">
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default GoalItem;