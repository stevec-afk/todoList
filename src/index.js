import "./styles.css";
import { todoManager } from "./todo-main";
import './ui-control.js'

window.todoManager = todoManager;

todoManager.loadDefaults();

console.log("Current Tasks:", todoManager.getAll());