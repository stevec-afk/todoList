import "./styles.css";
import { todoManager } from "./todo-main";
import './ui-control.js'
import { renderAllTodos } from "./render.js"

todoManager.init();
renderAllTodos();

console.log("Current Tasks:", todoManager.getAll());