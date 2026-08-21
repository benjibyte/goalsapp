import { useState } from 'react';
import {
    getTemporaryPersistenceSnapshot,
    updateTemporaryPersistence,
} from '../utils/temporaryPersistence';

/**
 * @typedef {{ id: string, title: string, description: string, completed: boolean }} Goal
 */

const useGoals = () => {
    const [goals, setGoals] = useState(() => getTemporaryPersistenceSnapshot().goals);

    const updateGoals = (change) => {
        setGoals((prevGoals) => {
            const nextGoals = change(prevGoals);
            updateTemporaryPersistence('goals', nextGoals);
            return nextGoals;
        });
    };

    /**
     * @param {string} title
     * @param {string} description
     */
    const addGoal = (title, description) => {
        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
            return;
        }

        const newGoal = {
            id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
            title: trimmedTitle,
            description: (description || '').trim(),
            completed: false,
        };

        updateGoals((prevGoals) => [...prevGoals, newGoal]);
    };

    /** @param {string} goalId */
    const removeGoal = (goalId) => {
        updateGoals((prevGoals) => prevGoals.filter(goal => goal.id !== goalId));
    };

    /**
     * @param {string} goalId
     * @param {string} updatedTitle
    * @param {string} updatedDescription
     */
    const updateGoal = (goalId, updatedTitle, updatedDescription) => {
        const trimmedTitle = updatedTitle.trim();

        if (!trimmedTitle) {
            return;
        }

        updateGoals((prevGoals) =>
            prevGoals.map(goal =>
                goal.id === goalId
                    ? { ...goal, title: trimmedTitle, description: (updatedDescription || '').trim() }
                    : goal
            )
        );
    };

    /** @param {string} goalId */
    const toggleGoal = (goalId) => { // This is the function we use to
                                     // "Check off" a goal.
        updateGoals((prevGoals) =>
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
