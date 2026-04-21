const defaults = {
    showCompleted: true,
    darkMode: false,
    sidebarCollapsed: false,
    currentView: 'all-tasks'
};

let preferences = { ...defaults };

const settingsManager = {
    init: () => {
        const saved = localStorage.getItem('todo_settings');
        if (saved) {
            preferences = JSON.parse(saved);
        }
    },
    getPrefs: () => ({ ...preferences }),
    update: (key, value) => {
        if (key in preferences) {
            preferences[key] = value;
            localStorage.setItem('todo_settings', JSON.stringify(preferences));
        }
    },
    reset: () => {
        preferences = { ...defaults };
        localStorage.setItem('todo_settings', JSON.stringify(preferences));
    }
}

export { settingsManager }