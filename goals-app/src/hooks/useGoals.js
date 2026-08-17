import { useState } from 'react';

const useGoals = () => {
    const [goals, setGoals] = useState([]);

    const addGoal = (title) => {
        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
            return;
        }

        const newGoal = {
            id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
            title: trimmedTitle,
        };

        setGoals((prevGoals) => [...prevGoals, newGoal]);
    };

    const removeGoal = (goalId) => {
        setGoals((prevGoals) => prevGoals.filter(goal => goal.id !== goalId));
    };

    const updateGoal = (goalId, updatedTitle) => {
        const trimmedTitle = updatedTitle.trim();

        if (!trimmedTitle) {
            return;
        }

        setGoals((prevGoals) =>
            prevGoals.map(goal =>
                goal.id === goalId ? { ...goal, title: trimmedTitle } : goal
            )
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