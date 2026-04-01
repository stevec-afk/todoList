import { todoManager } from "./todo-main";
import { format, isPast, isToday, isTomorrow, isThisMonth } from 'date-fns';
import { renderAllTodos, renderCategories } from "./render";

const $sidebar = document.getElementById("sidebar");
const $newTodoModal = document.getElementById("new-todo-modal");
const $form = document.getElementById("form");
const $mainContent = document.getElementById("content");

// Initializing the HTML form with sane defaults to help validate
// ie - preventing the user from selecting a date in the past
function initializeFormDefaults(){
    const today = format(new Date(), 'yyyy-MM-dd');
    const $formdate = $form.elements["duedate"]
    $formdate.min = today;
};

initializeFormDefaults();

// Event listener for the sidebar
$sidebar.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    const selectedFilter = btn.dataset.category;

    if (!btn) return;

    // Check if button is for a category filter
    if (selectedFilter) {
        const filtered = todoManager.getByCategory(selectedFilter);
        renderAllTodos(filtered);
        return; 
    }

    // if not, then its one of the following static buttons
    switch (btn.id) {
        case "new-task":
            $newTodoModal.showModal();
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
            }
            break;
    }
});

// Event listener for the form modal 
$newTodoModal.addEventListener("click", (e) => {
    const target = e.target.innerText; 

    switch (target) {
        case "":
            break;
        default: $form.reset;
    }
});

// Event listener to submit the form
$form.addEventListener("submit", (e) => {
    if (e.submitter.classList.contains("close-btn")){ 
        $form.reset(); 
        return;
    }

    const data = Object.fromEntries(new FormData(e.target));
    todoManager.add(data);
    renderAllTodos();
    renderCategories();
    $form.reset();
});

// Event listener for the main content
$mainContent.addEventListener("click", (e) => {
    if (e.target.type === 'checkbox') {
        const targetTodo = e.target.closest('.todo-row').dataset.id;
        todoManager.toggleStatus(targetTodo);
        renderAllTodos();
    }
    else if (e.target.classList.contains('details-btn')) {
        // placeholder - open todo details modal
    }

    else return; 
});