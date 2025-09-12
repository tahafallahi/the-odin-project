import { createProject, createToDo, createPseudoTextbox } from "./elements.mjs";

export default class View {
  #projectListElm = document.querySelector("#project-list");
  #toDoListElm = document.querySelector("#todo-list");
  #pseudoTextbox = createPseudoTextbox("project-title");

  renderProjects(projectArray, selectedProjectIndex) {
    this.#projectListElm.innerHTML = "";
    this.#toDoListElm.innerHTML = "";
    projectArray.forEach((project) => {
      const projectElm = createProject(project);
      this.#projectListElm.appendChild(projectElm);
    });

    if (projectArray[selectedProjectIndex]) {
      this.#renderToDoArray(projectArray[selectedProjectIndex].toDoArray);
    }
  }

  #renderToDoArray(array) {
    array.forEach((todo) => {
      const toDoElm = createToDo(todo);
      this.#toDoListElm.appendChild(toDoElm);
    });
  }

  bindProjectList(handler) {
    this.#projectListElm.addEventListener("click", (e) => {
      handler(e.target.parentElement.id);
    });
  }

  bindToDoList(deleteHandler, editHandler) {
    this.#toDoListElm.addEventListener("click", (e) => {
      if (e.target.id == "delete-note") {
        deleteHandler(e.target);
      } else if (e.target.id == "edit-note") {
        const dialog = document.querySelector("#todo-dialog");
        dialog.showModal();
        this.bindEditToDoForm(
          editHandler,
          e.target.parentElement.parentElement,
        );
      }
    });
  }

  bindCreateProject() {
    const btn = document.querySelector("#create-project");
    btn.addEventListener("click", () => {
      this.#pseudoTextbox.value = "";
      btn.parentElement.insertBefore(
        this.#pseudoTextbox,
        btn.parentElement.firstChild,
      );
      this.#pseudoTextbox.focus();
    });
  }

  bindCreateToDo(handler) {
    const btn = document.querySelector("#create-todo");
    const dialog = document.querySelector("#todo-dialog");
    btn.addEventListener("click", (event) => {
      dialog.showModal();
      this.bindCreateToDoForm(handler);
    });
  }

  bindPseudoTextbox(handler) {
    this.#pseudoTextbox.addEventListener("keypress", (event) => {
      if (event.key == "Enter") {
        if (this.#pseudoTextbox.reportValidity()) {
          handler(this.#pseudoTextbox.value);
          this.#pseudoTextbox.remove();
        } else {
          return;
        }
      }
    });
  }

  bindCreateToDoForm(handler) {
    const dialog = document.querySelector("#todo-dialog");
    const form = document.querySelector("#todo-form");

    // Remove any existing listener first
    if (this._editListener) {
      form.removeEventListener("submit", this._editListener);
    }

    form.querySelector("button").textContent = "Create";

    // Define the new listener and save it for next time
    this._editListener = (event) => {
      event.preventDefault();
      const toDoForm = new FormData(event.target);
      handler(Object.fromEntries(toDoForm));
      dialog.close();
    };

    form.addEventListener("submit", this._editListener);
  }

  bindEditToDoForm(handler, toDoElm) {
    const dialog = document.querySelector("#todo-dialog");
    const form = document.querySelector("#todo-form");

    if (this._editListener) {
      form.removeEventListener("submit", this._editListener);
    }

    form.title.value = toDoElm.querySelector(".todo-title").textContent;
    form.note.value = toDoElm.querySelector(".todo-note").textContent;
    form.dueDate.value = toDoElm.querySelector(".todo-due-date").textContent;
    form.querySelector("button").textContent = "Apply";

    this._editListener = (event) => {
      event.preventDefault();
      const toDoForm = new FormData(event.target);
      handler(Object.fromEntries(toDoForm), toDoElm.id);
      dialog.close();
    };

    form.addEventListener("submit", this._editListener);
  }

  bindCloseBtn() {
    const dialog = document.querySelector("#todo-dialog");
    const btn = document.querySelector("#close-button");
    btn.addEventListener("click", (event) => {
      dialog.close();
    });
  }
}
