import React, { useState } from 'react';

const GoalForm = ({ onAddGoal }) => {
  const [goal, setGoal] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!goal.trim()) {
      setError('Goal cannot be empty');
      return;
    }
    onAddGoal(goal);
    setGoal('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Enter your goal"
      />
      <button type="submit">Add Goal</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default GoalForm;