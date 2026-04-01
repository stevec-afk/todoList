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

const defaultCategories = ["All Tasks", "Work", "Personal", "School", "Long-term"];

// The library - an array of objects
let myTodoList = [];

// The factory - this is a function that RETURNS an object.
const todo = ({
    title, 
    description, 
    duedate, 
    category, 
    priority, 
    id = crypto.randomUUID(), 
    status = false 
}) => {
    return {
        title,
        description,
        duedate,
        category,
        priority,
        id,
        status,
    };
};

// The librarian - this IS an object, it manages our [] library.
const todoManager =  {
    add: (data) => {
        const newTodo = todo(data);
        myTodoList.push(newTodo);
        todoManager.save();
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
        if (targetTask) {
            targetTask.status = !targetTask.status;
            todoManager.save();
        }
    },
    loadDefaults: () => {
        defaultData.forEach(item => todoManager.add(item));
    },
    save: () => {
        const listString = JSON.stringify(myTodoList);
        localStorage.setItem("myTodoList", listString);
    },
    init: () => {
        const savedData = localStorage.getItem("myTodoList");
        let dataToLoad;

        // Try to parse. If savedData is null, JSON.parse(null) is actually null (not an error).
        // If savedData is "garbage" text, this line will "throw" to the catch block.
        try {
            dataToLoad = JSON.parse(savedData);
        } catch (error) {
            console.error("Save file corrupted, clearing storage.")
            dataToLoad = null;
        }

        const finalArray = dataToLoad || defaultData;
        finalArray.forEach(item => todoManager.add(item));
    },
    resetApp: () => {
        localStorage.clear(); // nukes everything in localStorage! 
        myTodoList = []; // clears the todo list
        todoManager.init(); // re-initialize from defaults
    },
    getCategories: () => {
        // Generates a list of categories from existing todos
        const taskCategories = myTodoList.map(todo => todo.category);
        // Combine the above list with the default categories
        const combined = [...defaultCategories, ...taskCategories]
        // Return a set of unique categories with dupes removed
        return [...new Set(combined)]; 
    },
}; 

export { todoManager }; 