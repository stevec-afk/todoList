import "./styles.css";
import { todoManager } from "./todo-main";
import './ui-control.js'
import { renderAllTodos, renderCategories } from "./render.js"



todoManager.init();
renderAllTodos();
renderCategories();

console.log("Current Tasks:", todoManager.getAll());