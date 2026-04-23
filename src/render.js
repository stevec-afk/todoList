import { todoManager } from "./todo-main";
import { settingsManager } from "./settings";

const $mainContent = document.getElementById("content");

function createHtmlElement(type, content, classes, id) {
    const element = document.createElement(type);
    if (content) element.innerText = content;
    if (id) element.id = id;
    if (classes) classes.forEach((myClass) => element.classList.add(myClass));

    return element;
}
// Helper for creating a row on the DOM for 1 todo element
function createTaskRow(todo) {
    const priorityClass = `prio-${todo.priority}`;
    const $todoRow = createHtmlElement("div", undefined, ["todo-row", priorityClass]);
    $todoRow.dataset.id = todo.id; // Attach the todo ID to the container

    // Add input checkbox for todo.status
    const $checkbox = createHtmlElement("input");
    $checkbox.type = "checkbox";
    $checkbox.checked = todo.status;

    // If the todo is completed, add a CSS class for strikethough text
    const $todoTitle = createHtmlElement("span", todo.title, ["task-title"]);
    if (todo.status === true) $todoTitle.classList.add("completed");

    // Create the rest of the elements for the todo
    const $dueDate = createHtmlElement("span", todo.duedate, ["task-date"]);
    const $detailsBtn = createHtmlElement("button", "...", ["details-btn"]);
    const $deleteBtn = createHtmlElement("button", undefined, ["delete-row-btn"]);
    const $trashIcon = createHtmlElement("span", "delete", ["material-icons"]);
    $deleteBtn.appendChild($trashIcon);

    // Append everything to the todo row from left to right
    $todoRow.append($checkbox, $todoTitle, $dueDate, $detailsBtn, $deleteBtn);
    return $todoRow;
}

// Updates the currrent view using the UI state saved in settingsManager
// Also maps the currentView name to the appropriate human readable string
function updateView() {
    const { currentView } = settingsManager.getPrefs();
    let mappedView;

    switch (currentView) {
        case "all-tasks":
            mappedView = "All Tasks";
            break;
        case "due-today":
            mappedView = "Due Today";
            break;
        case "due-tomorrow":
            mappedView = "Due Tomorrow";
            break;
        case "due-month":
            mappedView = "Due This Month";
            break;
        case "no-due-date":
            mappedView = "No Due Date";
            break;
        default:
            mappedView = currentView;
    }

    const $viewContainer = createHtmlElement("h2", mappedView, undefined, "current-view");
    $mainContent.appendChild($viewContainer);
}

// This "dumb" function ONLY accepts a list of todos and renders them
// This function does not make decisions, it only renders.
function renderTodos(todoList) {
    $mainContent.innerHTML = ""; // Clean slate
    updateView();
    // Add an additional "new todo" button at the bottom of the list.
    const $newTodoButton = createHtmlElement("button", "Add new task", ["add-task-inline"]);
    $newTodoButton.setAttribute("command", "show-modal");
    $newTodoButton.setAttribute("commandfor", "add-modal");

    if (todoList.length === 0) {
        // Check for empty list
        const $emptymsg = createHtmlElement("p", "Nothing to do here!", ["empty-msg"]);
        $mainContent.appendChild($emptymsg);
        $mainContent.appendChild($newTodoButton);
        return;
    } else {
        todoList.forEach((todo) => {
            const $newRow = createTaskRow(todo);
            $mainContent.appendChild($newRow);
        });
    }

    const $newTodoRow = createHtmlElement("div", undefined, undefined, "new-todo-row");
    $newTodoRow.appendChild($newTodoButton);
    $mainContent.appendChild($newTodoRow);
}

// Dynamically renders the category buttons based on which categories exist.
function renderCategories() {
    const $categoriesContainer = document.getElementById("categories");
    const categories = todoManager.getCategories();
    $categoriesContainer.innerHTML = "";

    categories.forEach((item) => {
        const catButton = createHtmlElement("button", undefined, ["category-button"]);
        const icon = createHtmlElement("span", "label", ["material-icons"]);
        const text = createHtmlElement("span", item);
        catButton.append(icon, text);
        catButton.dataset.category = item;
        $categoriesContainer.appendChild(catButton);
    });
}

export { renderTodos, renderCategories };
