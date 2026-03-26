import "./styles.css";
import { todoManager } from "./todo-main";
import './ui-control.js'

todoManager.init();

console.log("Current Tasks:", todoManager.getAll());