export default class Ship {
  constructor(size) {
    this.size = size;
    this.health = size;
  }

  hit() {
    if (!this.isSunk()) {
      this.health -= 1;
    } else {
      throw new Error("Can not hit a ship that is already sunk.")
    }
  }

  isSunk() {
    return this.health < 1 ? true : false;
  }
}
