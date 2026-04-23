// Some default data to display when resetting the app
const defaultData = [
    {
        title: "Pay Bills",
        description: "Electric and Internet bills due",
        duedate: "2026-03-15",
        category: "Personal",
        priority: "high",
    },
    {
        title: "Walk the Dog",
        description: "Take Fido to the park",
        duedate: "2026-04-01",
        category: "Personal",
        priority: "medium",
    },
    {
        title: "Finish Project",
        description: "Complete the Odin Project ToDo list",
        duedate: "2026-10-10",
        category: "Work",
        priority: "low",
    },
];

const defaultCategories = ["Work", "Personal", "School", "Long-term"];

// The Library - an array of objects
let myTodoList = [];

// The Factory - this is a function that RETURNS an object.
const todo = ({
    title,
    description,
    duedate,
    category,
    priority,
    id = generateID(),
    status = false,
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

// This is needed because crypto.randomUUID breaks when using dev server, ie.: localhost:3000
function generateID() {
    // If the browser supports crypto.randomUUID (Secure context)
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    // Fallback for insecure contexts (like mobile dev over IP)
    return (
        Math.random().toString(36).substring(2, 11) + Math.random().toString(36).substring(2, 11)
    );
}

// The Librarian - this IS an object, it manages our [] library.
// specifically, todoManager manages the state of our todo list object.
const todoManager = {
    add: (data) => {
        const newTodo = todo(data);
        myTodoList.push(newTodo);
        todoManager.save();
    },
    getAll: () => [...myTodoList],
    remove: (id) => {
        myTodoList = myTodoList.filter((task) => task.id !== id);
        todoManager.save();
    },
    getByCategory: (category) => {
        return myTodoList.filter((task) => task.category === category);
    },
    toggleStatus: (id) => {
        const targetTask = myTodoList.find((task) => task.id === id);
        if (targetTask) {
            targetTask.status = !targetTask.status;
            todoManager.save();
        }
    },
    loadDefaults: () => {
        defaultData.forEach((item) => todoManager.add(item));
    },
    save: () => {
        const listString = JSON.stringify(myTodoList);
        localStorage.setItem("myTodoList", listString);
    },
    init: () => {
        const savedData = localStorage.getItem("myTodoList");
        let dataToLoad;

        // Try to parse the data in localstorage. If savedData is null,
        // JSON.parse(null) is actually null (not an error).
        // If savedData is "garbage" text, this line will "throw" to the catch block.
        try {
            dataToLoad = JSON.parse(savedData);
        } catch {
            console.error("Save file corrupted, clearing storage.");
            dataToLoad = null;
        }

        const finalArray = dataToLoad || defaultData;
        finalArray.forEach((item) => todoManager.add(item));
    },
    resetApp: () => {
        localStorage.clear(); // !!CAUTION!! nukes **E V E R Y T H I N G** in localStorage!
        myTodoList = [];
        todoManager.init(); // re-initialize from defaults
    },
    getCategories: () => {
        // 1. Generates a list of categories from existing todos,
        // 2. combines it with the default categories,
        // 3. and then removes duplicates.
        const taskCategories = myTodoList
            .map((todo) => todo.category)
            .filter((cat) => cat && cat.trim() !== ""); // removes blanks
        const combined = [...defaultCategories, ...taskCategories];
        return [...new Set(combined)];
    },
    getById: (id) => {
        return myTodoList.find((task) => task.id === id);
    },
    update: (id, data) => {
        const task = myTodoList.find((t) => t.id === id);
        if (task) {
            // Rather than creating a new todo and deleting the old one,
            // Object.assign() instead specifically mutates the state
            // of an existing todo instance. This is used deliberately
            // instead of the spread operator (ie "const newObj - {...target, ...source}"
            // because we actually *want* mutability.
            // We are editing an existing todo, not deleting and recreating it!
            Object.assign(task, data);
            todoManager.save();
        }
    },
};

export { todoManager };
