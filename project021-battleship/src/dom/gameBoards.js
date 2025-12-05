import {
  createFlexRowDiv,
  createFlexColDiv,
  createGameBoard,
  createH2,
  createH3,
} from "./components.js";

export function createGameBoards(engine, gameState) {
  let title = createH2(
    `${gameState.p0Name}'s turn. Double Click on enemy's board to launch missle.`
  );
  let p1GameBoard = createGameBoard("p1");
  let p0GameBoard = createGameBoard("p0");

  p0GameBoard.classList.add("selected-game-board");
  p1GameBoard.classList.add("unclickable");

  p0GameBoard.addEventListener("click", (event) =>
    handleHit(event, engine, gameState, p0GameBoard, p1GameBoard)
  );
  p1GameBoard.addEventListener("click", (event) =>
    handleHit(event, engine, gameState, p1GameBoard, p0GameBoard)
  );

  let p0GameBoardContainer = createFlexColDiv(
    createH3(`${gameState.p0Name}'s board`),
    p0GameBoard
  );
  let p1GameBoardContainer = createFlexColDiv(
    createH3(`${gameState.p1Name}'s board`),
    p1GameBoard
  );
  return [title, createFlexRowDiv(p0GameBoardContainer, p1GameBoardContainer)];
}

function createPlayerCard(gameState, player, shipStatus) {
  let name = createH3(gameState[`${player}Name`]);
  name.classList.add("player-name");

  let shipPictureList = [
    "../../pictures/ship2.png",
    "../../pictures/ship3.png",
    "../../pictures/ship4.png",
    "../../pictures/ship5.png",
  ];
  let ships = [];

  for (let i = 0; i < 4; i++) {
    let img = document.createElement("img");
    img.src = shipPictureList[i];
    img.classList.add(`ship${i + 2}`);
    img.dataset.size = i + 2;
    img.setAttribute("unselectable", "on");
    shipStatus.forEach(ship => {
      if (ship.size == i+2) {
        console.log(ship)
        ships.push(img.cloneNode(true));
      };
    })
  }

  let container = createFlexColDiv(name, ...ships);
  container.classList.add(`${player}-score-car`);
  return container;
}

function handleHit(event, engine, gameState, gameBoard, opGameBoard) {
  let cell = event.target;
  let player = gameBoard.dataset.player;
  let targetedCell = gameBoard.querySelector(".targeted-cell");
  if (cell.className == "hit-cell") {
  } else if (cell.className !== "targeted-cell") {
    if (targetedCell) targetedCell.classList.remove("targeted-cell");
    cell.classList.add("targeted-cell");
  } else {
    let hitCord = cell.dataset.cord.split("");
    engine.players[player].hit(hitCord);
    cell.classList.add("hit-cell");

    document.querySelector("#content").firstChild.textContent = `${
      gameState[player == "p0" ? "p0Name" : "p1Name"]
    }'s turn. Double Click on enemy's board to launch missle`;
    gameBoard.classList.toggle("unclickable");
    gameBoard.classList.toggle("selected-game-board");
    opGameBoard.classList.toggle("unclickable");
    opGameBoard.classList.toggle("selected-game-board");

    let shipStatus = engine.players["p0"].shipStatus();

    let leftSideDiv = document.querySelector("#left-side");
    let shipImgs = [...leftSideDiv.firstChild.children].slice(1);

    console.log(shipImgs)
    for (let i = 0; i < shipImgs.length; i++) {
      if (shipStatus[i].health == 0) {
        shipImgs[i].classList.add("sunk-ship");
      }
    }

  }
}

export { createGameBoard, createPlayerCard };
