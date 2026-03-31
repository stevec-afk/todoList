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

function createTaskRow (todo) {
    const $todoRow = createHtmlElement('div', undefined, ['todo-row']);
    const $todoTitle = createHtmlElement('span', todo.title);
    
    const $checkbox = createHtmlElement('input');
    $checkbox.type = 'checkbox';
    $checkbox.checked = todo.status;

    const $dueDate = createHtmlElement('span', todo.duedate);

    const $detailsBtn = createHtmlElement('button', '...', ['details-btn']);

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