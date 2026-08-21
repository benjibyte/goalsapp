import { useState } from 'react';
import {
    getTemporaryPersistenceSnapshot,
    updateTemporaryPersistence,
} from '../utils/temporaryPersistence';

/**
 * @typedef {{ id: string, title: string, description: string, completed: boolean }} Reminder
 */

const useReminders = () => {
    const [reminders, setReminders] = useState(() => getTemporaryPersistenceSnapshot().reminders);

    const updateReminders = (updater) => {
        setReminders((previousReminders) => {
            const nextReminders = updater(previousReminders);
            updateTemporaryPersistence('reminders', nextReminders);
            return nextReminders;
        });
    };

    /**
     * @param {string} title
     * @param {string} description
     */
    const addReminder = (title, description) => {
        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
            return;
        }

        updateReminders((previousReminders) => [...previousReminders, {
            id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
            title: trimmedTitle,
            description: (description || '').trim(),
            completed: false,
        }]);
    };

    /** @param {string} reminderId */
    const removeReminder = (reminderId) => {
        updateReminders((previousReminders) => previousReminders.filter(
            reminder => reminder.id !== reminderId
        ));
    };

    /**
     * @param {string} reminderId
     * @param {string} updatedTitle
     * @param {string} updatedDescription
     */
    const updateReminder = (reminderId, updatedTitle, updatedDescription) => {
        const trimmedTitle = updatedTitle.trim();

        if (!trimmedTitle) {
            return;
        }

        updateReminders((previousReminders) => previousReminders.map(reminder => (
            reminder.id === reminderId
                ? { ...reminder, title: trimmedTitle, description: (updatedDescription || '').trim() }
                : reminder
        )));
    };

    /** @param {string} reminderId */
    const toggleReminder = (reminderId) => {
        updateReminders((previousReminders) => previousReminders.map(reminder => (
            reminder.id === reminderId
                ? { ...reminder, completed: !reminder.completed }
                : reminder
        )));
    };

    return {
        reminders,
        addReminder,
        removeReminder,
        updateReminder,
        toggleReminder,
    };
};

export default useReminders;