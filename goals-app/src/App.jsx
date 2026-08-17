import React from 'react';
import GoalForm from './components/GoalForm';
import GoalList from './components/GoalList';
import useGoals from './hooks/useGoals';

const App = () => {
  const { goals, addGoal, removeGoal, updateGoal } = useGoals();

  return (
    <div className="app">
      <h1>Goals App</h1>
      <GoalForm onAddGoal={addGoal} />
      <GoalList goals={goals} onDelete={removeGoal} onEdit={updateGoal} />
    </div>
  );
};

export default App;