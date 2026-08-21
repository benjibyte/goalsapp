import React, { useState } from 'react';

const ReminderItem = ({ reminder, onEdit, onDelete, onToggle }) => {
  const [draft, setDraft] = useState(reminder.title);
  const [draftDescription, setDraftDescription] = useState(reminder.description || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const handleSave = () => {
    onEdit(reminder.id, draft, draftDescription);
    setIsEditing(false);
  };

  return (
    <li className={`goal-item${reminder.completed ? ' completed' : ''}`}>
      <button
        className="complete-button"
        onClick={() => onToggle(reminder.id)}
        aria-label={reminder.completed ? `Mark ${reminder.title} as active` : `Complete ${reminder.title}`}
        title={reminder.completed ? 'Mark as active' : 'Complete reminder'}
      >
        ✓
      </button>
      {isEditing ? (
        <>
          <div className="goal-edit-fields">
            <input type="text" value={draft} onChange={(event) => setDraft(event.target.value)} aria-label="Reminder title" />
            <textarea value={draftDescription} onChange={(event) => setDraftDescription(event.target.value)} aria-label="Reminder description" rows={3} />
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
              <h3 className="goal-title" title={reminder.title}>{reminder.title}</h3>
              {reminder.description && (
                <button
                  className="description-toggle"
                  type="button"
                  onClick={() => setIsDescriptionOpen(isOpen => !isOpen)}
                  aria-expanded={isDescriptionOpen}
                  aria-label={`${isDescriptionOpen ? 'Hide' : 'Show'} description for ${reminder.title}`}
                >
                  {isDescriptionOpen ? 'Hide' : 'Details'}
                </button>
              )}
            </div>
            {isDescriptionOpen && reminder.description && (
              <div className="goal-description-card" role="region">{reminder.description}</div>
            )}
          </div>
          <div className="goal-item-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(reminder.id)} id="delete-button">Delete</button>
          </div>
        </>
      )}
    </li>
  );
};

export default ReminderItem;