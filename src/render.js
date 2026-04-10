import { todoManager } from "./todo-main";

const $mainContent = document.getElementById('content');

function createHtmlElement (type, content, classes, id){ 
    const element = document.createElement(type);
    if (content) element.innerText = content;
    if (id) element.id = id;
    if (classes) classes.forEach((myClass) => element.classList.add(myClass));
    
    return element;
}
// Helper for creating a row on the DOM for 1 todo element
function createTaskRow (todo) {
    const $todoRow = createHtmlElement('div', undefined, ['todo-row']);
    $todoRow.dataset.id = todo.id; // Attach the todo ID to the container

    // Add input checkbox for todo.status
    const $checkbox = createHtmlElement('input');
    $checkbox.type = 'checkbox';
    $checkbox.checked = todo.status;

    // If the todo is completed, add a CSS class for strikethough text
    const $todoTitle = createHtmlElement('span', todo.title);
    if (todo.status === true) $todoTitle.classList.add('completed');

    // Create the rest of the elements for the todo
    const $dueDate = createHtmlElement('span', todo.duedate);
    const $detailsBtn = createHtmlElement('button', '...', ['details-btn']);
    const $deleteBtn = createHtmlElement('button', undefined, ['delete-row-btn']);
    const $trashIcon = createHtmlElement('span', 'delete', ['material-icons']);
    $deleteBtn.appendChild($trashIcon);

    // Append everything to the todo row from left to right
    $todoRow.append($checkbox, $todoTitle, $dueDate, $detailsBtn, $deleteBtn);
    return $todoRow;
}

// This "dumb" function ONLY accepts a list of todos and renders them
// This function does not make decisions, it only renders. 
function renderTodos (todoList){
    $mainContent.innerHTML = ''; // Clean slate

    if (todoList.length === 0 ){ // Check for empty list
        const $emptymsg = createHtmlElement('p', 'Nothing to do here!', ['empty-msg']);
        $mainContent.appendChild($emptymsg);
    } else {
        todoList.forEach((todo) => {
            const $newRow = createTaskRow(todo);
            $mainContent.appendChild($newRow);
        });
    }
    // Add an additional "new todo" button at the bottom of the list. 
    const $newTodoButton = createHtmlElement('button', 'Add new task', ['add-task-inline']);
    $newTodoButton.setAttribute('command', 'show-modal');
    $newTodoButton.setAttribute('commandfor', 'add-modal');
    $mainContent.appendChild($newTodoButton);
}

// Dynamically renders the category buttons based on which categories exist. 
function renderCategories () {
    const $categoriesContainer = document.getElementById('categories');
    const categories = todoManager.getCategories();
    $categoriesContainer.innerHTML = '';

    categories.forEach(item => {
        const catButton = createHtmlElement('button', item, ['category-button']);
        catButton.dataset.category = item;
        $categoriesContainer.appendChild(catButton);
    });
}

export { renderTodos, renderCategories };