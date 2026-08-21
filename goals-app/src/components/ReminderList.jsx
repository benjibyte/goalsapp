import React from 'react';
import ReminderItem from './ReminderItem';

const ReminderList = ({ reminders, onDelete, onEdit, onToggle }) => {
  const activeReminders = reminders.filter(reminder => !reminder.completed);
  const completedReminders = reminders.filter(reminder => reminder.completed);

  return (
    <div className="goal-sections">
      <h2>Your Reminders</h2>
      {activeReminders.length === 0 && completedReminders.length === 0 ? (
        <p>No reminders yet. Add one above to get started.</p>
      ) : (
        <>
          {activeReminders.length > 0 && (
            <ul>
              {activeReminders.map(reminder => (
                <ReminderItem key={reminder.id} reminder={reminder} onDelete={onDelete} onEdit={onEdit} onToggle={onToggle} />
              ))}
            </ul>
          )}
          {completedReminders.length > 0 && (
            <section className="completed-goals">
              <h2>Completed</h2>
              <ul>
                {completedReminders.map(reminder => (
                  <ReminderItem key={reminder.id} reminder={reminder} onDelete={onDelete} onEdit={onEdit} onToggle={onToggle} />
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default ReminderList;