import {
  createButton,
  createSkewButton,
  createDiv,
  createFlexColDiv,
  createFlexRowDiv,
  createH1,
} from "./components.js";

export function createShipPlacementBoard(
  engine,
  gameState,
  initGameCallBack,
  player = "p0"
) {
  let grid = document.createElement("div");
  grid.classList.add("game-board");

  for (let i = 0; i < 100; i++) {
    grid.appendChild(createGameBoadCell());
  }

  let shipCard = createShipCard(gameState.shipsState);
  let resetButton = createButton(
    "Reset",
    () => resetBoard(engine, gameState, initGameCallBack, player),
    "placement-board-reset-button"
  );
  let finishButton = createSkewButton(
    "Finish",
    () => handleFinishButton(engine, gameState, initGameCallBack, player),
    "placement-board-finish-button"
  );
  return createFlexColDiv(
    createH1(
      `${gameState[`${player}Name`]}'s turn. Place your ships on the board.`
    ),
    resetButton,
    createFlexRowDiv(shipCard, grid),
    finishButton
  );
}

function resetBoard(engine, gameState, initGameCallBack, player) {
  let container =
    document.querySelector(".game-board").parentElement.parentElement;
  container.innerHTML = "";
  container.appendChild(
    createShipPlacementBoard(engine, gameState, initGameCallBack, player)
  );
}

function handleFinishButton(engine, gameState, initGameCallBack, player) {
  let gameBoard = document.querySelector(".game-board");
  if (
    gameBoard.querySelectorAll("img").length <
    gameState.shipsState.reduce((prev, ship) => prev + ship[0], 0)
  ) {
    document.querySelector(".title").textContent =
      "Please place every ship on the board.";
  } else {
    let shipCords = [];
    const children = Array.from(gameBoard.children);
    let childrenMatrix = [];

    for (let i = 0; i < 100; i += 10) {
      let row = [];
      for (let j = 0; j < 10; j++) {
        row.push(children[i + j]);
      }
      childrenMatrix.push(row);
    }

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = childrenMatrix[i][j];
        if (cell.firstChild) {
          const shipImg = cell.firstChild.firstChild;
          let shipArray = [];
          if (shipImg.dataset.angle == "0") {
            for (let p = 0; p < Number(shipImg.dataset.size); p++) {
              shipArray.push([i, j + p]);
            }
          } else {
            for (let p = 0; p < Number(shipImg.dataset.size); p++) {
              shipArray.push([i - p, j]);
            }
          }
          shipCords.push(shipArray);
        }
      }
    }

    engine.setupGameBoard(shipCords, player);

    if (gameState.numberOfPlayers == 2 && player != "p1") {
      resetBoard(engine, gameState, initGameCallBack, "p1");
    } else if (gameState.numberOfPlayers == 1) {
      let aiShipCords = [
        [
          [0, 4],
          [0, 5],
        ],
        [
          [1, 1],
          [1, 2],
        ],
        [
          [1, 7],
          [1, 8],
        ],
        [
          [4, 0],
          [4, 1],
          [4, 2],
        ],
        [
          [4, 4],
          [3, 4],
          [2, 4],
        ],
        [
          [4, 8],
          [4, 9],
        ],
        [
          [6, 6],
          [5, 6],
          [4, 6],
          [3, 6],
        ],
        [
          [7, 0],
          [7, 1],
          [7, 2],
          [7, 3],
        ],
        [
          [8, 5],
          [8, 6],
          [8, 7],
          [8, 8],
          [8, 9],
        ],
        [
          [9, 2],
          [9, 3],
          [9, 4],
        ],
      ];

      engine.setupGameBoard(aiShipCords, "p1");
      initGameCallBack();
    } else {
      initGameCallBack();
    }
  }
}

function createShipCard(shipsState) {
  let div = document.createElement("div");
  div.classList.add("ship-card");
  let shipPictureList = [
    "../../pictures/ship2.png",
    "../../pictures/ship3.png",
    "../../pictures/ship4.png",
    "../../pictures/ship5.png",
  ];
  for (let i = 0; i < 4; i++) {
    let img = document.createElement("img");
    img.src = shipPictureList[i];
    img.classList.add(`ship${i + 2}`);
    img.setAttribute("unselectable", "on");
    img.dataset.remainingNumber = shipsState[i][0];
    img.dataset.size = i + 2;
    img.dataset.angle = 0;
    img.dataset.t = 0;

    img.addEventListener("dragstart", (event) => {
      let oldIDHolder = document.getElementById("drag-source-from-card");
      if (oldIDHolder) oldIDHolder.id = "";
      img.dataset.placed = false;
      event.currentTarget.parentElement.id = "drag-source-from-card";
    });

    img.addEventListener("dragend", (event) => {
      let shipsRemainingNumber = Number(img.dataset.remainingNumber);
      shipsRemainingNumber--;
      if (img.dataset.placed == "true") {
        if (shipsRemainingNumber < 1) {
          img.parentElement.removeChild(img.nextSibling);
          img.parentElement.removeChild(img);
        } else {
          img.dataset.remainingNumber = shipsRemainingNumber;
          img.nextSibling.textContent = img.dataset.remainingNumber;
        }
        delete img.dataset.placed;
      }
    });

    let counter = document.createElement("p");
    counter.textContent = img.dataset.remainingNumber;
    let contianer = createDiv(img, counter);
    contianer.classList.add("ship-container");
    div.appendChild(contianer);
  }

  return div;
}

function createGameBoadCell() {
  let square = document.createElement("div");

  square.addEventListener("dragover", (event) => event.preventDefault());
  square.addEventListener("drop", handleDrop);

  return square;
}

function handleDrop(event) {
  event.preventDefault();

  let shipElmText = event.dataTransfer.getData("text/html");
  let shipElm = new DOMParser()
    .parseFromString(shipElmText, "text/html")
    .querySelector("img");
  const wrapper = createShip(shipElm);

  let direction = shipElm.dataset.angle == 0 ? "right" : "up";

  let placementError = blockCellsAndErrorCheck(
    event.currentTarget,
    Number(shipElm.dataset.size),
    direction
  );

  let dragSource = document.getElementById("drag-source");
  let dragSourceFromCard = document.getElementById("drag-source-from-card");

  if (!placementError) {
    if (dragSource) dragSource.removeAttribute("id");
    event.currentTarget.appendChild(wrapper);
    const img = document.querySelector("[data-placed]");
    img.dataset.placed = true;
  } else if (dragSource) {
    dragSource.appendChild(wrapper);
  } else if (dragSourceFromCard) {
    if (dragSourceFromCard.firstChild)
      dragSourceFromCard.firstChild.dataset.remainingNumber =
        Number(dragSourceFromCard.firstChild.dataset.remainingNumber) + 1;
    dragSourceFromCard.id = "";
  } else {
  }
}

function createShip(shipElm) {
  let img = document.createElement("img");
  img.src = shipElm.src;
  img.classList.add(shipElm.classList);
  img.dataset.size = shipElm.dataset.size;
  img.dataset.angle = shipElm.dataset.angle;
  img.dataset.t = shipElm.dataset.t;

  if (shipElm.dataset.t && shipElm.dataset.angle) {
    img.style.setProperty("transform-origin", "bottom left");
    img.style.setProperty(
      "transform",
      `rotate(${img.dataset.angle}deg) translateY(${img.dataset.t}px)`
    );
  }

  img.addEventListener("click", handleShipRotate);
  img.addEventListener("dragstart", (event) => {
    event.currentTarget.parentElement.parentElement.id = "drag-source";
  });
  img.addEventListener("dragend", handleShipDrag);

  let wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  wrapper.appendChild(img);
  return wrapper;
}

function handleShipDrag(event) {
  let dragSource = document.getElementById("drag-source");
  if (dragSource) dragSource.removeAttribute("id");

  let img = event.currentTarget;
  let directoin = img.dataset.angle == 0 ? "right" : "up";

  unBlockCells(
    img.parentElement.parentElement,
    Number(img.dataset.size),
    directoin
  );

  // Check to see if the drag was sesseccful or not, if not reblock the orginal cells.
  if (img.parentElement.parentElement.children.length == 2) {
    blockCellsAndErrorCheck(
      img.parentElement.parentElement,
      Number(img.dataset.size),
      directoin
    );
  }

  img.parentElement.parentElement.removeChild(
    img.parentElement.parentElement.firstChild
  );
  if (event.dataTransfer.dropEffect !== "copy") {
    const wrapper = createShip(event.currentTarget);
    dragSource.appendChild(wrapper);
    blockCellsAndErrorCheck(dragSource, Number(img.dataset.size), directoin);
  }
}

function handleShipRotate(event) {
  let img = event.currentTarget;
  let directoin = img.dataset.angle == 0 ? "right" : "up";

  let placementError = blockCellsAndErrorCheck(
    event.currentTarget.parentElement.parentElement,
    Number(img.dataset.size),
    directoin == "up" ? "right" : "up",
    true
  );

  if (!placementError) {
    unBlockCells(
      event.currentTarget.parentElement.parentElement,
      Number(img.dataset.size),
      directoin,
      true
    );
    img.dataset.angle = img.dataset.angle == 0 ? -90 : 0;
    img.dataset.t = img.dataset.angle == 0 ? 0 : 30;
    img.style.setProperty("transform-origin", "bottom left");
    img.style.setProperty(
      "transform",
      `rotate(${img.dataset.angle}deg) translateY(${img.dataset.t}px)`
    );
  }
}

function blockCellsAndErrorCheck(element, size, direction, skipElement) {
  if (size instanceof Number) throw TypeError();
  if (blockCells(element, size, direction, skipElement)) return false;
  const children = Array.from(element.parentElement.children);
  let childrenMatrix = [];
  let index = [];

  for (let i = 0; i < 100; i += 10) {
    let row = [];
    for (let j = 0; j < 10; j++) {
      row.push(children[i + j]);
      if (children[i + j] == element) index = [i / 10, j];
    }
    childrenMatrix.push(row);
  }

  if (direction == "right") {
    for (let i = 0; i < size; i++) {
      if (index[1] + i > 9) return true;
      const element = childrenMatrix[index[0]][index[1] + i];
      element.classList.toggle("error-cell");
      setTimeout(() => element.classList.toggle("error-cell"), 400);
    }
  } else if (direction == "up") {
    for (let i = 0; i < size; i++) {
      if (index[0] - i < 0) return true;
      const element = childrenMatrix[index[0] - i][index[1]];
      element.classList.toggle("error-cell");
      setTimeout(() => element.classList.toggle("error-cell"), 400);
    }
  }

  return true;
}

function blockCells(element, size, direction, skipElement) {
  if (size instanceof Number) throw TypeError();

  const children = Array.from(element.parentElement.children);
  let childrenMatrix = [];
  let index = [];
  let toBlockCells = [];
  let offset = skipElement ? 1 : 0;

  for (let i = 0; i < 100; i += 10) {
    let row = [];
    for (let j = 0; j < 10; j++) {
      row.push(children[i + j]);
      if (children[i + j] == element) index = [i / 10, j];
    }
    childrenMatrix.push(row);
  }

  if (direction == "right") {
    if (index[1] + size > 10) return false;
    for (let i = 0; i < size; i++) {
      const element = childrenMatrix[index[0]][index[1] + i];
      toBlockCells.push(element);
    }
  } else if (direction == "up") {
    if (index[0] - size < -1) return false;
    for (let i = 0; i < size; i++) {
      const element = childrenMatrix[index[0] - i][index[1]];
      toBlockCells.push(element);
    }
  }

  for (let cell of toBlockCells.slice(offset)) {
    if (cell.className === "blocked-cell") return false;
  }

  toBlockCells.forEach((cell) => {
    cell.classList.add("blocked-cell");
  });

  return true;
}

function unBlockCells(element, size, direction, skipElement) {
  if (size instanceof Number) throw TypeError();

  const children = Array.from(element.parentElement.children);
  let childrenMatrix = [];
  let index = [];
  let toBlockCells = [];

  for (let i = 0; i < 100; i += 10) {
    let row = [];
    for (let j = 0; j < 10; j++) {
      row.push(children[i + j]);
      if (children[i + j] == element) index = [i / 10, j];
    }
    childrenMatrix.push(row);
  }

  if (direction == "right") {
    if (index[1] + size > 10) return false;
    for (let i = 0; i < size; i++) {
      const element = childrenMatrix[index[0]][index[1] + i];
      toBlockCells.push(element);
    }
  } else if (direction == "up") {
    if (index[0] - size < -1) return false;
    for (let i = 0; i < size; i++) {
      const element = childrenMatrix[index[0] - i][index[1]];
      toBlockCells.push(element);
    }
  }

  if (skipElement) toBlockCells = toBlockCells.slice(1);

  toBlockCells.forEach((cell) => {
    cell.classList.remove("blocked-cell");
  });

  return true;
}
