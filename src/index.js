import "./styles.css";
import { todoManager } from "./todo-main";
import { settingsManager } from "./settings.js"
import { refreshUI } from './ui-control.js'
import { renderCategories } from "./render.js"

settingsManager.init();
todoManager.init();
refreshUI();
renderCategories();

console.log("Current Tasks:", todoManager.getAll());