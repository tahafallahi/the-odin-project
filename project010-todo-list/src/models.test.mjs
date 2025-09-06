import {Project, ToDo} from "./models.mjs";
 
describe("Project and ToDo classes", () => {
    let project;
    let todo;

    beforeEach(() => {
        project = new Project("My Project", "Test description");
        todo = new ToDo("Buy groceries", "2025-09-02", "milk and bread");
    });

    test("should add a ToDo to a Project", () => {
        project.addToDo(todo);
        expect(project.getToDoList()).toHaveLength(1);
        expect(project.getToDoList()[0].id).toBe(todo.id);
    });

    test("should not allow duplicate ToDo in a Project", () => {
        project.addToDo(todo);
        expect(() => project.addToDo(todo)).toThrow("Todo objects must be unique in each project.");
    });

    test("should update a ToDo inside Project", () => {
        project.addToDo(todo);
        project.updateToDo(todo.id, { title: "Buy fruits" });

        const updated = project.getToDoList()[0].read();
        expect(updated.title).toBe("Buy fruits");
    });

    test("should throw error if updating non-existent ToDo", () => {
        expect(() => project.updateToDo("fake-id", { title: "nope" }))
            .toThrow("Can not update non-existent todo object");
    });

    test("should remove a ToDo by id", () => {
        project.addToDo(todo);
        project.removeToDo(todo.id);
        expect(project.getToDoList()).toHaveLength(0);
    });

    test("ToDo.read() should return correct object", () => {
        const data = todo.read();
        expect(data).toHaveProperty("id", todo.id);
        expect(data).toHaveProperty("title", "Buy groceries");
        expect(data).toHaveProperty("dueDate", "2025-09-02");
        expect(data).toHaveProperty("note", "milk and bread");
        expect(data).toHaveProperty("dateCreate");
    });

    test("ToDo.update() should update fields selectively", () => {
        todo.update({ note: "bread only" });
        const updated = todo.read();
        expect(updated.note).toBe("bread only");
        expect(updated.title).toBe("Buy groceries"); // unchanged
    });
});