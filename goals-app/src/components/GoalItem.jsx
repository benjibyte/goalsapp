import React from 'react';

const GoalItem = ({ goal, onEdit, onDelete }) => {
  return (
    <div className="goal-item">
      <h3>{goal.title}</h3>
      <p>{goal.description}</p>
      <div className="goal-item-actions">
        <button onClick={() => onEdit(goal.id)}>Edit</button>
        <button onClick={() => onDelete(goal.id)}>Delete</button>
      </div>
    </div>
  );
};

export default GoalItem;