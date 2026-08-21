import React from 'react';
import GoalForm from './components/GoalForm';
import GoalList from './components/GoalList';
import ReminderForm from './components/ReminderForm';
import ReminderList from './components/ReminderList';
import useGoals from './hooks/useGoals';
import useReminders from './hooks/useReminders';

const App = () => {
  const { goals, addGoal, removeGoal, updateGoal, toggleGoal } = useGoals();
  const { reminders, addReminder, removeReminder, updateReminder, toggleReminder } = useReminders();

  return (
    <div className="app">
      <h1>Goals App</h1>
      <GoalForm onAddGoal={addGoal} />
      <GoalList
        goals={goals}
        onDelete={removeGoal}
        onEdit={updateGoal}
        onToggle={toggleGoal}
      />
      <ReminderForm onAddReminder={addReminder} />
      <ReminderList
        reminders={reminders}
        onDelete={removeReminder}
        onEdit={updateReminder}
        onToggle={toggleReminder}
      />
    </div>
  );
};

export default App;