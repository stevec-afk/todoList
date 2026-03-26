const defaultData = [
    {
        title: "Pay Bills",
        description: "Electric and Internet bills due",
        duedate: "2026-10-01", 
        category: "Personal",
        priority: "high"
    },
    {
        title: "Walk the Dog",
        description: "Take Fido to the park",
        duedate: "2026-10-05",
        category: "Personal",
        priority: "medium"
    },
    {
        title: "Finish Project",
        description: "Complete the Odin Project ToDo list",
        duedate: "2026-10-10", 
        category: "Work",
        priority: "low"
    }
];

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
    add: ({ title, description, duedate, category = "Uncategorized", priority}) => {
        const newTodo = todo(title, description, duedate, category, priority);
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
    },
    loadDefaults: () => {
        defaultData.forEach(item => {
            todoManager.add(item);
        })
    }
}; 

export { todoManager }; 