const data = {
  goals: [],
  reminders: [],
};

const subscribers = new Set();

const getSnapshot = () => ({
  goals: [...data.goals],
  reminders: [...data.reminders],
});

const notify = () => {
  const snapshot = getSnapshot();

  subscribers.forEach((subscriber) => subscriber(snapshot));

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('goals-app:data-changed', {
      detail: snapshot,
    }));
  }
};

export const getTemporaryPersistenceSnapshot = getSnapshot;

export const replaceTemporaryPersistence = (nextData) => {
  data.goals = [...(nextData.goals || [])];
  data.reminders = [...(nextData.reminders || [])];
  notify();
};

export const updateTemporaryPersistence = (collection, items) => {
  if (!Object.prototype.hasOwnProperty.call(data, collection)) {
    throw new Error(`Unknown temporary persistence collection: ${collection}`);
  }

  data[collection] = [...items];
  notify();
};

export const subscribeToTemporaryPersistence = (subscriber) => {
  subscribers.add(subscriber);
  return () => subscribers.delete(subscriber);
};

// External programs can import the functions above or listen for this event in the browser.