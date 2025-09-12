import { saveData, loadData } from "./storage.mjs";

describe("localStorage helpers", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("save data to localStorage", () => {
    saveData("username", "Alice");
    expect(localStorage.getItem("username")).toBe("Alice");
  });
  test("load data to localStorage", () => {
    localStorage.setItem("username", "Alice");
    expect(loadData("username")).toBe("Alice");
  });
});
