const $sidebar = document.getElementById("sidebar");
const $newTodoModal = document.getElementById("newTodoModal");
const $form = document.getElementById("form");
const $mainContent = document.getElementById("content");

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
    // Do stuff with the data
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