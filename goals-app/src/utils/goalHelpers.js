export const validateGoal = (/** @type {string} */ goal) => {
    if (!goal || goal.trim() === '') {
        return 'Goal cannot be empty';
    }
    if (goal.length > 30) {
        return 'Goal cannot exceed 30 characters';
    }
    return null;
};

export const formatGoal = (/** @type {string} */ goal) => {
    return goal.charAt(0).toUpperCase() + goal.slice(1).toLowerCase();
};