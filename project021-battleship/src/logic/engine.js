import Ship from "./ship.js"
import PlayerBoard from "./playerBoard.js";
export default class Engine {
  constructor(gameState) {
    this.players = {}
    this.gameState = gameState;
  }

  setupGameBoard(ships, player) {
    let shipCords = [];
    let shipsList = [];

    for (let i = 0; i < 10; i++) {
      shipCords.push(Array(10).fill(0))
    }

    ships.forEach((shipPlacmenet) => {
      const ship = new Ship(shipPlacmenet.length);
      shipsList.push(ship);
      shipPlacmenet.forEach(([i, j]) => shipCords[i][j] = ship);
    })


    if (player == "p0") {
      this.players.p0 = new PlayerBoard(shipCords, shipsList)
    } else if (player == "p1") {
      this.players.p1 = new PlayerBoard(shipCords, shipsList)
    }
  }
}
