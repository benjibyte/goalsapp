import React from 'react';
import GoalItem from './GoalItem';

const GoalList = ({ goals, onDelete, onEdit, onToggle }) => {
  const activeGoals = goals.filter(goal => !goal.completed);
  const completedGoals = goals.filter(goal => goal.completed);

  return (
    <div className="goal-sections">
      <h2>Your Goals</h2>
      {activeGoals.length === 0 && completedGoals.length === 0 ? (
        <p>No goals yet. Add one above to get started.</p>
      ) : (
        <>
          {activeGoals.length > 0 && (
            <ul>
              {activeGoals.map(goal => (
                <GoalItem key={goal.id} goal={goal} onDelete={onDelete} onEdit={onEdit} onToggle={onToggle} />
              ))}
            </ul>
          )}
          {completedGoals.length > 0 && (
            <section className="completed-goals">
              <h2>Completed</h2>
              <ul>
                {completedGoals.map(goal => (
                  <GoalItem key={goal.id} goal={goal} onDelete={onDelete} onEdit={onEdit} onToggle={onToggle} />
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default GoalList;