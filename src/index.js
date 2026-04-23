import "./styles/base.css";
import "./styles/layout.css";
import "./styles/components.css";
import { todoManager } from "./todo-main";
import { settingsManager } from "./settings.js";
import { refreshUI, syncSidebarToggles } from "./ui-control.js";
import { renderCategories } from "./render.js";

// Initialize the various modules & do first render of the page
settingsManager.init();
todoManager.init();
syncSidebarToggles();
refreshUI();
renderCategories();

window.addEventListener("load", () => {
    document.body.classList.remove("preload");
});

console.log("Current Tasks:", todoManager.getAll());
