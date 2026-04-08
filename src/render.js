import { todoManager } from "./todo-main";

const $mainContent = document.getElementById('content');

function createHtmlElement (type, content, classes, id){ 
    const element = document.createElement(type);
    if (content) element.innerText = content;
    if (id) element.id = id;
    if (classes) classes.forEach((myClass) => element.classList.add(myClass));
    
    return element;
}
// Create a row on the DOM for 1 todo element
function createTaskRow (todo) {
    // Create a container for 1 todo
    const $todoRow = createHtmlElement('div', undefined, ['todo-row']);
    $todoRow.dataset.id = todo.id; // Attach the todo ID to the container

    // Add input checkbox for todo.status
    const $checkbox = createHtmlElement('input');
    $checkbox.type = 'checkbox';
    $checkbox.checked = todo.status;

    // If the todo is completed, add a CSS class for strikethough text
    const $todoTitle = createHtmlElement('span', todo.title);
    if (todo.status === true) {
        $todoTitle.classList.add('completed');
    }
    const $dueDate = createHtmlElement('span', todo.duedate);
 
    // a "more details" button that will bring up a modal
    const $detailsBtn = createHtmlElement('button', '...', ['details-btn']);

    const $deleteBtn = createHtmlElement('button', undefined, ['delete-row-btn']);
    const $trashIcon = createHtmlElement('span', 'delete', ['material-icons']);
    $deleteBtn.appendChild($trashIcon);

    // Append everything to the todo row from left to right
    $todoRow.appendChild($checkbox);
    $todoRow.appendChild($todoTitle);
    $todoRow.appendChild($dueDate);
    $todoRow.appendChild($detailsBtn);
    $todoRow.appendChild($deleteBtn);
    return $todoRow;
}

function renderAllTodos (todoList = todoManager.getAll()){
    $mainContent.innerHTML = '';

    // If the todo list is empty, show the empty message.
    if (todoList.length === 0 ){
        const $emptymsg = createHtmlElement('p', 'Nothing to do here!', ['empty-msg']);
        $mainContent.appendChild($emptymsg);
    }
    else {
        todoList.forEach((todo) => {
            const $newRow = createTaskRow(todo);
            $mainContent.appendChild($newRow);
        });
    }
    const $newTodoButton = createHtmlElement('button', 'Add new task', ['add-task-inline']);
    $newTodoButton.setAttribute('command', 'show-modal');
    $newTodoButton.setAttribute('commandfor', 'add-modal');
    $mainContent.appendChild($newTodoButton);
}

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

export { renderAllTodos, renderCategories };