import "./rest.css";
import "./style.css";

import { loadData, saveData } from "./storage.mjs";
import RenderPage from "./view.mjs";
import { ToDo, Project } from "./models.mjs";

// Create 2 projects
const project1 = new Project("Home Tasks");
const project2 = new Project("Work Tasks");

// Create 3 todos for project1
const todo1a = new ToDo("Clean kitchen", "2025-09-01", "Use disinfectant");
const todo1b = new ToDo("Laundry", "2025-09-02", "Separate colors");
const todo1c = new ToDo("Grocery shopping", "2025-09-03", "Buy milk and eggs");

// Add them to project1
project1.addToDo(todo1a);
project1.addToDo(todo1b);
project1.addToDo(todo1c);

// Create 3 todos for project2
const todo2a = new ToDo();
const todo2b = new ToDo("Email client", "2025-09-02", "Send invoice");
const todo2c = new ToDo("Team meeting", "2025-09-03", "Prepare slides");

// Add them to project2
project2.addToDo(todo2a);
project2.addToDo(todo2b);
project2.addToDo(todo2c);

// Log the projects
console.log("Project 1:", project1.getData());
console.log("Project 2:", project2.getData());

// let projectArray = loadData("projectsArray")
let projectArray = [];

projectArray.push(project1.getData());
projectArray.push(project2.getData());
if (projectArray) new RenderPage(projectArray);
