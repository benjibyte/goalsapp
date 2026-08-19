import { useState } from 'react';

/**
 * @typedef {{ id: string, title: string, completed: boolean }} Goal
 */

const useGoals = () => {
    const [goals, setGoals] = useState(/** @type {Goal[]} */ ([]));

    /** @param {string} title */
    const addGoal = (title) => {
        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
            return;
        }

        const newGoal = {
            id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
            title: trimmedTitle,
            completed: false,
        };

        setGoals((prevGoals) => [...prevGoals, newGoal]);
    };

    /** @param {string} goalId */
    const removeGoal = (goalId) => {
        setGoals((prevGoals) => prevGoals.filter(goal => goal.id !== goalId));
    };

    /**
     * @param {string} goalId
     * @param {string} updatedTitle
     */
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

    /** @param {string} goalId */
    const toggleGoal = (goalId) => {
        setGoals((prevGoals) =>
            prevGoals.map(goal =>
                goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
            )
        );
    };

    return {
        goals,
        addGoal,
        removeGoal,
        updateGoal,
        toggleGoal,
    };
};

export default useGoals;