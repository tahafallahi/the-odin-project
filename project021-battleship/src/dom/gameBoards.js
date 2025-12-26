import {
  createFlexRowDiv,
  createFlexColDiv,
  createGameBoard,
  createH1,
  createH2,
  createH3,
  createDiv,
  createSkewButton,
} from "./components.js";

export function createGameBoards(engine, gameState) {
  let title = createH2(
    `${gameState.p0Name}'s turn. Double Click on enemy's board to launch missle.`
  );
  let p1GameBoard = createGameBoard("p1");
  let p0GameBoard = createGameBoard("p0");

  p0GameBoard.classList.add("selected-game-board");
  p1GameBoard.classList.add("unclickable");

  let hitPerTurnInitial = Number(gameState.hitPerTurn);

  p0GameBoard.addEventListener("click", (event) =>
    handleHit(event, engine, gameState, p0GameBoard, p1GameBoard, hitPerTurnInitial)
  );
  p1GameBoard.addEventListener("click", (event) =>
    handleHit(event, engine, gameState, p1GameBoard, p0GameBoard, hitPerTurnInitial)
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
    shipStatus.forEach((ship) => {
      if (ship.size == i + 2) {
        ships.push(img.cloneNode(true));
      }
    });
  }

  let container = createFlexColDiv(name, ...ships);
  container.classList.add(`${player}-score-car`);
  return container;
}

function handleHit(event, engine, gameState, gameBoard, opGameBoard, hitPerTurnInitial) {
  let cell = event.target;
  let player = gameBoard.dataset.player;

  if (cell.classList.contains("hit-cell")) {
  } else {
    let hitCord = cell.dataset.cord.split("");
    let hitResult = engine.players[player].hit(hitCord);

    cell.classList.add("hit-cell");
    cell.classList.add(hitResult ? "wreckage-cell" : "empty-cell");

    gameState.hitPerTurn = Number(gameState.hitPerTurn) - 1;
    console.log(gameState.hitPerTurn);
    if (Number(gameState.hitPerTurn) < 1) {
      document.querySelector("#content").firstChild.textContent = `${
        gameState[player == "p0" ? "p0Name" : "p1Name"]
      }'s turn. Double Click on enemy's board to launch missle`;
      gameBoard.classList.toggle("unclickable");
      gameBoard.classList.toggle("selected-game-board");
      opGameBoard.classList.toggle("unclickable");
      opGameBoard.classList.toggle("selected-game-board");
      gameState.hitPerTurn = hitPerTurnInitial;
    }

    let p0ShipStatus = engine.players["p0"].shipStatus();
    let p1ShipStatus = engine.players["p1"].shipStatus();
    let leftSideDiv = document.querySelector("#left-side");
    let rightSideDiv = document.querySelector("#right-side");
    updateShipCard(p0ShipStatus, leftSideDiv);
    updateShipCard(p1ShipStatus, rightSideDiv);

    if (engine.players.p0.hasLost()) {
      anounceWinner(gameState, "p1", gameBoard, opGameBoard);
    } else if (engine.players.p1.hasLost()) {
      anounceWinner(gameState, "p0", gameBoard, opGameBoard);
    }
  }
}

function updateShipCard(shipStatus, container) {
  let shipImgs = [...container.firstChild.children].slice(1);

  for (let i = 0; i < shipImgs.length; i++) {
    if (shipStatus[i].health == 0) {
      shipImgs[i].classList.add("sunk-ship");
    }
  }
}

function anounceWinner(gameState, player, gB0, gB1) {
  let contentDiv = document.querySelector("#content");
  let winningBanner = createFlexColDiv(
    createH1(`${gameState[`${player}Name`]} has won!`)
  );
  gB0.classList.add("unclickable");
  gB1.classList.add("unclickable");
  gB0.classList.remove("selected-game-board");
  gB1.classList.remove("selected-game-board");
  winningBanner.classList.add("banner");

  let newGameButton = createSkewButton(
    "Start New Game!",
    () => {
      window.location.reload();
    },
    "new-game-button"
  );
  winningBanner.appendChild(newGameButton);
  contentDiv.appendChild(winningBanner);
}

export { createGameBoard, createPlayerCard };
