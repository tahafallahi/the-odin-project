import Ship from "../../src/logic/ship.js";

test("creates a ship of size 5 and sinks it after 5 hits.", () => {
  let ship = new Ship(5);
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test("creates a ship of size 4, that must remain afloat after 1 hit.", () => {
  let ship = new Ship(3);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});

test("throws an error when hitting a ship that is already sunk.", () => {
  let ship = new Ship(2);
  ship.hit();
  ship.hit();
  expect(() => ship.hit()).toThrow("Can not hit a ship that is already sunk.");
});
