import PlayerBoard from "../../src/logic/playerBoard.js";
import Ship from "../../src/logic/ship.js";

let playerBoard;
let shipList;

beforeEach(() => {
  shipList = [];
  let shipCords = [];
  for (let i = 0; i < 10; i++) {
    shipCords.push(Array(10).fill(0));
  }
  shipList.push(new Ship({shipSunkCondition: "everySquare"}, 2));
  shipList.push(new Ship({shipSunkCondition: "everySquare"},2));

  shipCords[0][0] = shipList[0];
  shipCords[0][1] = shipList[0];
  shipCords[1][0] = shipList[1];
  shipCords[1][1] = shipList[1];
  playerBoard = new PlayerBoard(shipCords, shipList);
});

test("throws an error when hitting the same cord twice", () => {
  playerBoard.hit([0, 0]);
  expect(() => {
    playerBoard.hit([0, 0]);
  }).toThrow("Can not hit an already hit cords.");
});

test("hits a cord and checks if it's value is changed.", () => {
  playerBoard.hit([0, 0]);
  expect(playerBoard.hitCords[0][0]).toBe(1);
});

test("hits a cord with a ship enough times and checks if it is sunk.", () => {
  playerBoard.hit([0, 0]);
  playerBoard.hit([0, 1]);
  expect(shipList[0].isSunk()).toBe(true);
});

test("sinks every ship and check if the player has lost.", () => {
  playerBoard.hit([0, 0]);
  playerBoard.hit([0, 1]);
  playerBoard.hit([1, 0]);
  playerBoard.hit([1, 1]);
  expect(playerBoard.hasLost()).toBe(true);
});

test("sinks only one ship and check if the player has lost.", () => {
  playerBoard.hit([0, 0]);
  playerBoard.hit([0, 1]);
  expect(playerBoard.hasLost()).toBe(false);
});

test("hits a ship as much as it's health and check if it shipsStatus() reports the health reaching zero.", () => {
  playerBoard.hit([0, 0]);
  playerBoard.hit([0, 1]);
  expect(playerBoard.shipStatus()[0]).toEqual({ size: 2, health: 0 });
});

test("hits a ship as much as it's health and check if it shipsStatus() of the other ship shows health as not changed.", () => {
  playerBoard.hit([0, 0]);
  playerBoard.hit([0, 1]);
  expect(playerBoard.shipStatus()[1]).toEqual({ size: 2, health: 2 });
});
