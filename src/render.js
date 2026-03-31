import { todoManager } from "./todo-main";

const $mainContent = document.getElementById('content');

function createHtmlElement (type, content, classes, id){ 
    const element = document.createElement(type);
    if (content) element.innerText = content;
    if (id) element.id = id;
    if (classes) classes.forEach((myClass) => element.classList.add(myClass));
    
    return element;
}

function clearContent () {
    $mainContent.innerHTML = '';
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

    // Append everything to the todo row from left to right
    $todoRow.appendChild($checkbox);
    $todoRow.appendChild($todoTitle);
    $todoRow.appendChild($dueDate);
    $todoRow.appendChild($detailsBtn);
    return $todoRow;
}

function renderAllTodos (){
    clearContent();
    const todoList = todoManager.getAll();
    todoList.forEach((todo) => {
        const $newRow = createTaskRow(todo);
        $mainContent.appendChild($newRow);
    });
}

export { clearContent, renderAllTodos };