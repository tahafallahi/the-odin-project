export default class Ship {
  constructor(gameState, size) {
    this.gameState = gameState;
    this.size = size;
    this.health = size;
  }

  hit() {
    if (!this.isSunk()) {
      this.health -= 1;
    } else {
      throw new Error("Can not hit a ship that is already sunk.");
    }
  }

  isSunk() {
    if (this.gameState.shipSunkCondition == "oneSquare") {
      return this.health < this.size ? true : false;
    } else {
      return this.health < 1 ? true : false;
    }
  }
}
