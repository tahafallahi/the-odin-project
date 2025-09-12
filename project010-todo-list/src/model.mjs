import { Project, ToDo } from "./enteties.mjs";
import { loadProjects, saveProjects } from "./storage.mjs";

export default class Model {
  #projects = [];

  constructor() {
    this.data = loadProjects();
    if (this.data) this.#projects = this.data;
  }

  get projects() {
    return this.#projects;
  }

  createProject(projectObj) {
    const project = new Project(projectObj);
    this.#projects.push(project);
    this.#saveProjects();
  }

  createToDo(toDoObj, projectIndex) {
    const toDo = new ToDo(toDoObj);
    this.#projects[projectIndex].addToDo(toDo);
    this.#saveProjects();
  }

  deleteToDo(toDoId, projectIndex) {
    if (toDoId) {
      let projectObj = this.#projects[projectIndex];
      let toDoObj = projectObj.toDoArray.find((toDo) => toDo.id == toDoId);
      let toDoIndex = projectObj.toDoArray.indexOf(toDoObj);
      projectObj.toDoArray.splice(toDoIndex, 1);
      this.#saveProjects();
    }
  }

  editToDo(newToDoObj, toDoId, projectIndex) {
    let projectObj = this.#projects[projectIndex];
    let toDoObj = projectObj.toDoArray.find((toDo) => toDo.id == toDoId);
    let toDoIndex = projectObj.toDoArray.indexOf(toDoObj);
    projectObj.toDoArray[toDoIndex].update(newToDoObj);
    this.#saveProjects();
  }

  #saveProjects() {
    saveProjects(this.#projects);
  }
}
