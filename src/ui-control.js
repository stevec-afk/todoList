import { format, isPast, isToday, isTomorrow, isThisMonth } from 'date-fns';
import { todoManager } from './todo-main';
import { settingsManager } from './settings';
import { renderTodos, renderCategories } from './render';

const $sidebar = document.getElementById('sidebar');
const $mainContent = document.getElementById('content');
const $addForm = document.getElementById('add-form');
const $editForm = document.getElementById('edit-form')
const $addModal = document.getElementById('add-modal');
const $editModal = document.getElementById('edit-modal');
const $header = document.getElementById('header');

// The date view map - this defines the logic for the date filters
const dateFilter = {
    'due-today': (list) => {
        return list.filter(t => {
            if (!t.duedate) return false;
            const date = new Date(t.duedate);
            return isToday(date) || isPast(date);
        });
    },

    'due-tomorrow': (list) => {
        return list.filter(t => {
            if (!t.duedate) return false;
            return isTomorrow(new Date(t.duedate));
        });
    },

    'due-month': (list) => {
        return list.filter(t => {
            if (!t.duedate) return false;
            return isThisMonth(new Date(t.duedate));
        });
    },

    'no-due-date': (list) => list.filter(t => !t.duedate),
};

// The UI coordinator - applies filters and then refreshes the UI
function refreshUI() {
    const { currentView, showCompleted } = settingsManager.getPrefs();
    const allTodos = todoManager.getAll();
    let filteredTodos = [];

    if (currentView === 'all-tasks') {
        filteredTodos = allTodos;
    }
    else if (dateFilter[currentView]) { // if current view is a date filter
        filteredTodos = dateFilter[currentView](allTodos);
    }
    else { // if current view is a category filter
        filteredTodos = todoManager.getByCategory(currentView); 
    }

    if (!showCompleted) { // if showCompleted box is toggled
        filteredTodos = filteredTodos.filter(t => !t.status);
    }

    renderTodos(filteredTodos);
}

// Initializing the HTML form with sane defaults to help validate
// ie - preventing the user from selecting a date in the past
function initializeFormDefaults(){
    const today = format(new Date(), 'yyyy-MM-dd');
    const $addDate = $addForm.elements['duedate'];
    $addDate.min = today;
}
initializeFormDefaults();

// Helper function to toggle the theme - update me. 
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', targetTheme);
}

// Event listener for the sidebar
$sidebar.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return; // Checks to make sure a button was clicked
    $sidebar.classList.remove('active'); // Hides the sidebar after a click
    if (btn.id === 'close-sidebar') return; // Close the sidebar on X button tap

    if(btn.id === 'reset') {
        console.log('Reset clicked!');
        if (confirm('Nuke everything and restore defaults?')) {
            todoManager.resetApp();
            console.log('Current Tasks:', todoManager.getAll());
            renderCategories();
            refreshUI();
        }
        return;
    }

    // Udpate the current view with either category, or button ID, 
    // depending on what was clicked. If category does not exist, use ID instead. 
    // Assumes that if a button has a category & ID, we are using the category.
    settingsManager.update('currentView', btn.dataset.category || btn.id);
    refreshUI();
});

// Event listener for the 'add new todo' form
$addForm.addEventListener('submit', (e) => {
    const data = Object.fromEntries(new FormData(e.target));
    if (data.category) data.category = data.category.trim(); // filters blanks

    todoManager.add(data);
    renderCategories();
    refreshUI();

    $addForm.reset();
    $addModal.close();
});

// Event listener for the 'edit todo' form
$editForm.addEventListener('submit', (e) => {
    const id = e.target.dataset.id;
    const updatedData = Object.fromEntries(new FormData(e.target));
    if (updatedData.category) updatedData.category = updatedData.category.trim()

    todoManager.update(id, updatedData);
    renderCategories();
    refreshUI();
    $editModal.close();
});

// Event listener for the header
$header.addEventListener('click', (e) => {
    if (e.target.closest('#menu-toggle')) {
        $sidebar.classList.toggle('active');
        return;
    }

    // >insert code to handle night mode and hide completed buttons<
});

// Event listener for the main content
$mainContent.addEventListener('click', (e) => {
    const $targetRow = e.target.closest('.todo-row')
    if (!$targetRow) return; // Check to make sure a todo row was clicked

    const targetTodoId = $targetRow.dataset.id;

    if (e.target.type === 'checkbox') {
        todoManager.toggleStatus(targetTodoId);
        refreshUI();
    }
    else if (e.target.closest('.delete-row-btn')) {
        if (window.confirm('Are you sure you want to delete this task?')) {
            todoManager.remove(targetTodoId);
            refreshUI();
            renderCategories();
        }
    }
    else if (e.target.closest('.details-btn')) {
        $editForm.reset(); // Reset the edit form

        const task = todoManager.getById(targetTodoId);
        document.getElementById('edit-title').value = task.title;
        document.getElementById('edit-desc').value = task.description;
        document.getElementById('edit-cat').value = task.category;
        document.getElementById('edit-date').value = task.duedate;
        document.getElementById('edit-prio').value = task.priority;
        $editForm.dataset.id = targetTodoId;
        $editModal.showModal();
    }
});

export { refreshUI };