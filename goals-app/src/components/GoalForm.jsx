import React, { useState } from 'react';

// @ts-ignore
const GoalForm = ({ onAddGoal }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  // @ts-ignore
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Goal cannot be empty');
      return;
    }
    onAddGoal(title, description);
    setTitle('');
    setDescription('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Goal title"
        aria-label="Goal title"
      />
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Description (optional)"
        aria-label="Goal description"
        rows={3}
      />
      <button type="submit">Add Goal</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default GoalForm;