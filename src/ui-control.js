import { todoManager } from './todo-main';
import { format, isPast, isToday, isTomorrow, isThisMonth } from 'date-fns';
import { renderAllTodos, renderCategories } from './render';

const $sidebar = document.getElementById('sidebar');
const $mainContent = document.getElementById('content');
const $addForm = document.getElementById('add-form');
const $editForm = document.getElementById('edit-form')
const $addModal = document.getElementById('add-modal');
const $editModal = document.getElementById('edit-modal');

// Initializing the HTML form with sane defaults to help validate
// ie - preventing the user from selecting a date in the past
function initializeFormDefaults(){
    const today = format(new Date(), 'yyyy-MM-dd');
    const $addDate = $addForm.elements['duedate'];
    $addDate.min = today;
};

initializeFormDefaults();

// Event listener for the sidebar
$sidebar.addEventListener('click', (e) => {
    const btn = e.target.closest("button");
    if (!btn) return; // Checks to make sure a button was clicked

    const selectedFilter = btn.dataset.category;

    // Check if button is for a category filter & apply filter
    if (selectedFilter) {
        const filtered = todoManager.getByCategory(selectedFilter);
        renderAllTodos(filtered);
        return;
    }

    // if not, then its one of the following static buttons
    switch (btn.id) {
        case "new-task":
            $addModal.showModal();
            break;
        case "all-tasks":
            renderAllTodos();
            break;
        case "no-due-date":
            const noDateTasks = todoManager.getAll().filter(t => t.duedate === "");
            renderAllTodos(noDateTasks);
            break;
        case "due-today":
            const todayAndOverdue = todoManager.getAll().filter(t => {
                if (!t.duedate) return false; // Skip tasks with no date
                const date = new Date(t.duedate);
                return isToday(date) || isPast(date);
            });
            renderAllTodos(todayAndOverdue);
            break;
        case "due-tomorrow":
            const tomorrowTasks = todoManager.getAll().filter(t => {
                if (!t.duedate) return false;
                const date = new Date(t.duedate);
                return isTomorrow(date);
            });
            renderAllTodos(tomorrowTasks);
            break;
        case "due-month":
            const monthTasks = todoManager.getAll().filter(t => {
                if (!t.duedate) return false;
                const date = new Date(t.duedate);
                return isThisMonth(date);
            });
            renderAllTodos(monthTasks);
            break;
        case "reset":
            console.log("Reset clicked!");
            if (confirm("Nuke everything and restore defaults?")) {
                todoManager.resetApp();
                console.log("Current Tasks:", todoManager.getAll());
                renderAllTodos();
                renderCategories();
            }
            break;
    }
});

$addForm.addEventListener('submit', (e) => {
    const data = Object.fromEntries(new FormData(e.target));
    if (data.category) data.category = data.category.trim(); // filters blanks

    todoManager.add(data);

    renderAllTodos();
    renderCategories();

    $addForm.reset();
    $addModal.close();
});

// Event listener for the edit todo form
$editForm.addEventListener('submit', (e) => {
    const id = e.target.dataset.id;
    const updatedData = Object.fromEntries(new FormData(e.target));
    if (updatedData.category) updatedData.category = updatedData.category.trim()

    todoManager.update(id, updatedData);

    renderAllTodos();
    renderCategories();
    $editModal.close();
});

// Event listener for the main content
$mainContent.addEventListener('click', (e) => {
    const $targetRow = e.target.closest('.todo-row')
    if (!$targetRow) return; // Check to make sure a todo row was clicked

    const targetTodoId = $targetRow.dataset.id;

    if (e.target.type === 'checkbox') {
        todoManager.toggleStatus(targetTodoId);
        renderAllTodos();
    }
    else if (e.target.closest('.delete-row-btn')) {
        if (window.confirm('Are you sure you want to delete this task?')) {
            todoManager.remove(targetTodoId);
            renderAllTodos();
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