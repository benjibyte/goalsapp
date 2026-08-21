import React, { useState } from 'react';

const ReminderForm = ({ onAddReminder }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim()) {
      setError('Reminder cannot be empty');
      return;
    }
    onAddReminder(title, description);
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
        placeholder="Reminder title"
        aria-label="Reminder title"
      />
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Description (optional)"
        aria-label="Reminder description"
        rows={3}
      />
      <button type="submit">Add Reminder</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default ReminderForm;