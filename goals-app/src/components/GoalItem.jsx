import React, { useState } from 'react';

// @ts-ignore
const GoalItem = ({ goal, onEdit, onDelete, onToggle }) => {
  const [draft, setDraft] = useState(goal.title);
  const [draftDescription, setDraftDescription] = useState(goal.description || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const handleSave = () => {
    onEdit(goal.id, draft, draftDescription);
    setIsEditing(false);
  };

  const titleLengthClass = goal.title.length > 50
    ? ' goal-title-condensed'
    : goal.title.length > 30
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
          <div className="goal-edit-fields">
            <input
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              aria-label="Goal title"
            />
            <textarea
              value={draftDescription}
              onChange={(event) => setDraftDescription(event.target.value)}
              aria-label="Goal description"
              rows={3}
            />
          </div>
          <div className="goal-item-actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div className="goal-details">
            <div className="goal-title-row">
              <h3 className={`goal-title${titleLengthClass}`} title={goal.title}>
                {goal.title}
              </h3>
              {goal.description && (
                <button
                  className="description-toggle"
                  type="button"
                  onClick={() => setIsDescriptionOpen(isOpen => !isOpen)}
                  aria-expanded={isDescriptionOpen}
                  aria-label={`${isDescriptionOpen ? 'Hide' : 'Show'} description for ${goal.title}`}
                >
                  {isDescriptionOpen ? 'Hide' : 'Details'}
                </button>
              )}
            </div>
            {isDescriptionOpen && goal.description && (
              <div className="goal-description-card" role="region">
                {goal.description}
              </div>
            )}
          </div>
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