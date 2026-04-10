let preferences = {
    showCompleted: true,
    darkMode: false,
    sidebarCollapsed: false,
    currentView: 'all-tasks'
};

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
    }
}

export { settingsManager }