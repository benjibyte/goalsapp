import React, { useState } from 'react';

const GoalItem = ({ goal, onEdit, onDelete }) => {
  const [draft, setDraft] = useState(goal.title);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onEdit(goal.id, draft);
    setIsEditing(false);
  };

  return (
    <li className="goal-item">
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
          <h3>{goal.title}</h3>
          <div className="goal-item-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(goal.id)}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
};

export default GoalItem;