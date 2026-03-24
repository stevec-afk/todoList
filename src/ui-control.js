import { todoManager } from "./todo-main";
import { format } from 'date-fns';

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

// Event listner for the sidebar
$sidebar.addEventListener("click", (e) => {
    const target = e.target.innerText;

    switch (target) {
        case "Add Task":
            $newTodoModal.showModal();
            break;
        case "reset":
            // reset the data
            break;
        default: break;
    }
});

// Event listner for the form modal 
$newTodoModal.addEventListener("click", (e) => {
    const target = e.target.innerText; 

    switch (target) {
        case "":
            break;
        default: $form.reset;
    }
});

// Event listner to submit the form
$form.addEventListener("submit", (e) => {
    if (e.submitter.classList.contains("close-btn")){ 
        $form.reset(); 
        return;
    }

    const data = Object.fromEntries(new FormData(e.target));
    todoManager.add(data);
    $form.reset();
});

// Event listner for the main content
$mainContent.addEventListener("click", (e) => {
    const target = e.target.innerText; 

    switch (target) {
        case "":
            break;
        default: break;
    }
});