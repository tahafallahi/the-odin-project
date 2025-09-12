import "./rest.css";
import "./style.css";

import View from "./view.mjs";
import Model from "./model.mjs";

class Controller {
  #selectedProjectIndex = 0;

  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.#renderPage();
    this.view.bindCreateProject();
    this.view.bindPseudoTextbox((title) => this.#handlePseudoTextbox(title));
    this.view.bindCreateToDo((toDoObj) => this.#handleCreateToDoForm(toDoObj));
    this.view.bindCloseBtn();
    this.view.bindProjectList((id) => this.#handleProjects(id));
    this.view.bindToDoList(
      (btn) => this.#handleDeleteToDoList(btn),
      (toDoObj, id) => this.#handleEditToDoForm(toDoObj, id),
    );
  }

  #renderPage() {
    const projectArray = this.model.projects;
    if (projectArray)
      this.view.renderProjects(projectArray, this.#selectedProjectIndex);
  }

  #handleProjects(id) {
    if (!id) throw new Error("Invalid Id");
    let targetProjectObj = this.model.projects.find(
      (project) => project.id == id,
    );
    this.#selectedProjectIndex = this.model.projects.indexOf(targetProjectObj);
    this.#renderPage();
  }

  #handleDeleteToDoList(btn) {
    let toDoId = btn.parentElement.parentElement.id;
    this.model.deleteToDo(toDoId, this.#selectedProjectIndex);
    this.#renderPage();
  }

  #handlePseudoTextbox(title) {
    this.model.createProject({ title });
    this.#renderPage();
  }

  #handleCreateToDoForm(toDoObj) {
    this.model.createToDo(toDoObj, this.#selectedProjectIndex);
    this.#renderPage();
  }

  #handleEditToDoForm(toDoObj, id) {
    this.model.editToDo(toDoObj, id, this.#selectedProjectIndex);
    this.#renderPage();
  }
}

new Controller(new Model(), new View());
