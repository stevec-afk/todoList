// The library - an array of objects
let myTodoList = [];

// The factory - this is a function that RETURNS an object.
const todo = (title, description, duedate, category, priority) => {
    // define internal logic and private variables here
    let status = false;
    const id = Date.now();

    const getStatus = () => status;
    const toggleComplete = () => status = !status;

    return {
        // object that contains the properties and methods we want
        title,
        description,
        duedate,
        category,
        priority,
        id,
        getStatus,
        toggleComplete
    };
};

// The librarian - this IS an object, it manages our [] library.
const todoManager =  {
    add: (title, desc, date, cat, prio) => {
        const newTodo = todo(title, desc, date, cat, prio);
        myTodoList.push(newTodo);
    },
    getAll: () => [...myTodoList],
    remove: (id) => { 
        myTodoList = myTodoList.filter(task => task.id !== id ); 
    },
    getByCategory: (category) => {
        return myTodoList.filter(task => task.category === category);
    },
    toggleStatus: (id) => {
        const targetTask = myTodoList.find(task => task.id === id);
        targetTask.toggleComplete();
    }
}; 

export { todoManager }; 