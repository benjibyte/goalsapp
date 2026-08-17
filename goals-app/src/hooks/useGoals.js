import { useState } from 'react';

const useGoals = () => {
    const [goals, setGoals] = useState([]);

    const addGoal = (goal) => {
        setGoals((prevGoals) => [...prevGoals, goal]);
    };

    const removeGoal = (goalId) => {
        setGoals((prevGoals) => prevGoals.filter(goal => goal.id !== goalId));
    };

    const updateGoal = (updatedGoal) => {
        setGoals((prevGoals) => 
            prevGoals.map(goal => (goal.id === updatedGoal.id ? updatedGoal : goal))
        );
    };

    return {
        goals,
        addGoal,
        removeGoal,
        updateGoal,
    };
};

export default useGoals;