import React from 'react';
import GoalItem from './GoalItem';

const GoalList = ({ goals, onDelete, onEdit }) => {
  return (
    <div>
      <h2>Your Goals</h2>
      {goals.length === 0 ? (
        <p>No goals yet. Add one above to get started.</p>
      ) : (
        <ul>
          {goals.map(goal => (
            <GoalItem
              key={goal.id}
              goal={goal}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default GoalList;