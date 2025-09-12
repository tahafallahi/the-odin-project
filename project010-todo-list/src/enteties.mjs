class Project {
  id;
  title;
  toDoArray;

  constructor({ id = crypto.randomUUID().toString(), title, toDoArray = [] }) {
    this.id = id;
    this.title = title;
    if (toDoArray) {
      this.toDoArray = toDoArray.map((toDo) => new ToDo(toDo));
    } else {
      this.toDoArray = toDoArray;
    }
  }

  addToDo(toDoObject) {
    if (this.toDoArray.every((item) => item.id !== toDoObject.id)) {
      this.toDoArray.push(toDoObject);
    } else {
      throw new Error("Todo objects must be unique in each project.");
    }
  }

  updateToDo(id, updateDataObject) {
    let toDoObject = this.toDoArray.find((item) => item.id == id);
    if (toDoObject) {
      toDoObject.update(updateDataObject);
    } else {
      throw new Error("Can not update non-existent todo object");
    }
  }

  removeToDo(id) {
    this.toDoArray = this.toDoArray.filter((item) => item.id !== id);
  }
}

class ToDo {
  id;
  title;
  dueDate;
  dateCreated;
  note;

  constructor({
    id = crypto.randomUUID().toString(),
    title,
    dueDate,
    dateCreated = new Date(Date.now()),
    note,
  }) {
    this.id = id;
    this.title = title;
    this.dueDate = dueDate;
    this.dateCreated = dateCreated;
    this.note = note;
  }

  update({ title, dueDate, note }) {
    if (title !== undefined) this.title = title;
    if (dueDate !== undefined) this.dueDate = dueDate;
    if (note !== undefined) this.note = note;
  }
}

export { Project, ToDo };
