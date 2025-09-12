import { Project, ToDo } from "./enteties.mjs";

export function saveProjects(value) {
  localStorage.setItem("projectsArray", JSON.stringify(value));
}

export function loadProjects() {
  const projectsArrayObj = JSON.parse(localStorage.getItem("projectsArray"));
  if (projectsArrayObj)
    return projectsArrayObj.map((projectObj) => new Project(projectObj));
}
