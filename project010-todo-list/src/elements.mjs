function createProject({title, id}) {
    const container = document.createElement("div");
    container.id = id;
    container.classList.add("project-item")

    const titleElm = document.createElement("h2");
    titleElm.textContent = title;

    container.appendChild(titleElm);
    return container;
}
function createToDo({id, title, dueDate, note}) {
    const container = document.createElement("div");
    container.id = id;
    container.classList.add("todo-item");

    const header = document.createElement("div");
    header.classList.add("todo-item-header")

    const titleElm = document.createElement("h2");
    titleElm.textContent = title;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.id = "edit-note";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.id = "delete-note";

    const dueDateElm = document.createElement("h3");
    dueDateElm.textContent = dueDate;
    
    const noteElm = document.createElement("p");
    noteElm.textContent = note;

    header.append(titleElm, editBtn, deleteBtn);
    container.append(header, dueDateElm, noteElm);
    return container;
}

function createPseudoTextbox(name) {
    const container = document.createElement("input");
    container.id = name;
    container.name = name;
    container.type = "text";
    container.classList.add("pseudo-textbox");
    container.required = true;

    return container;
}


export { createProject, createToDo, createPseudoTextbox };

