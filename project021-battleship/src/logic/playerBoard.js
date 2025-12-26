export default class PlayerBoard {
  constructor(shipCords, shipsList) {
    this.shipCords = shipCords;
    this.hitCords = [];
    this.shipsList = shipsList;
    for (let i = 0; i < 10; i++) {
      this.hitCords.push(Array(10).fill(0));
    }
  }

  hit([x, y]) {
    if (this.hitCords[x][y])
      throw new Error("Can not hit an already hit cords.");
    this.hitCords[x][y] = 1;
    if (this.shipCords[x][y]) {
      this.shipCords[x][y].hit();
      return true;
    } else {
      return false;
    }
  }

  hasLost() {
    return this.shipsList.every((ship) => ship.isSunk());
  }

  shipStatus() {
    return this.shipsList.map((ship) => {
      return { size: ship.size, health: ship.health };
    });
  }

  floatingShipCount() {
    let result = 0;
    this.shipsList.forEach((ship) => {
      if (!ship.isSunk()) result++;
    });
    return result;
  }
}
