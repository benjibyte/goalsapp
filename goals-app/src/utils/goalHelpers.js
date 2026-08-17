export const validateGoal = (goal) => {
    if (!goal || goal.trim() === '') {
        return 'Goal cannot be empty';
    }
    if (goal.length > 100) {
        return 'Goal cannot exceed 100 characters';
    }
    return null;
};

export const formatGoal = (goal) => {
    return goal.charAt(0).toUpperCase() + goal.slice(1).toLowerCase();
};