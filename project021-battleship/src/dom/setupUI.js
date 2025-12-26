import {
  createButton,
  createSkewButton,
  createFlexRowDiv,
  createFlexColDiv,
  createH1,
  createContinerDiv,
  createForm,
  createTextInput,
  createCheckBoxGrid,
  createRadioBox,
  createH2,
  createH3,
} from "./components.js";

import { createShipPlacementBoard } from "./shipPlacementBoard.js";
import { createGameBoards, createPlayerCard } from "./gameBoards.js";

export default class setUpUI {
  constructor(Engine) {
    this.contentDiv = document.querySelector("#content");
    this.numberOfPlayers;
    this.gameState = {
      shipsState: [
        [4, 2],
        [3, 3],
        [2, 4],
        [1, 5],
      ],
      p0Name: "Player one",
      p1Name: "Player two",
    };
    this.EngineCls = Engine;
  }

  clearScreen() {
    this.contentDiv.innerHTML = "";
  }

  initPlayerScreen() {
    this.clearScreen();
    let title = createH1("Choose number of players.");
    let btnContainer = createFlexRowDiv();
    btnContainer.append(
      createSkewButton("1 Player", () => {
        this.gameState.numberOfPlayers = 1;
        this.initRuleScreen();
      }),
      createSkewButton("2 Player", () => {
        this.gameState.numberOfPlayers = 2;
        this.initRuleScreen();
      })
    );
    this.contentDiv.append(title, btnContainer);
  }

  initRuleScreen() {
    this.clearScreen();
    let title = createH1("Select Game Settings");
    let p0Name = createTextInput("Player 1 Name", "p0Name", "Jesica");
    let p1Name = createTextInput("Player 2 Name", "p1Name", "Madan");
    let playerNameDiv = createFlexRowDiv(p0Name, this.gameState.numberOfPlayers == 2 ? p1Name: "");
    let hitPerTurnRuleRadioBox = createRadioBox(
      "Select Game Variation",
      "hitPerTurn",
      {
        1: "<b>Vanila battleship:</b> 1 missle per turn.",
        3: "<b>Salvo:</b>  3 missle per turn",
      }
    );
    let shipSunkRuleRadioBox = createRadioBox(
      "Ship integrity.",
      "shipSunkCondition",
      {
        everySquare:
          "<b>Easy:</b> every part of a ship must be hit to sink it.",
        oneSquare: "<b>Hard:</b> hitting a ship once is enough to sink it.",
      }
    );
    let rulesContaier = createFlexRowDiv(
      hitPerTurnRuleRadioBox,
      shipSunkRuleRadioBox
    );
    let startButton = createSkewButton(
      "Start Game",
      () => {},
      "start-game-button"
    );
    let form = createForm(
      (data) => {
        if (!data.p0Name) {
          data.p0Name = "Player one";
        }
        if (this.gameState.numberOfPlayers == 1) {
          data.p1Name = "AI";
        } else if (!data.p1Name) {
          data.p1Name = "Player two";
        }

        this.gameState = Object.assign(this.gameState, data);
        this.initShipPlacementScreen();
      },
      playerNameDiv,
      rulesContaier,
      startButton
    );
    let container = createContinerDiv(title, form);
    this.contentDiv.append(container);
  }

  initShipPlacementScreen() {
    this.clearScreen();
    this.engine = new this.EngineCls(this.gameState);
    this.contentDiv.appendChild(
      createShipPlacementBoard(this.engine, this.gameState, () =>
        this.initGameScreen()
      )
    );
  }

  initGameScreen() {
    this.clearScreen();
    let leftSideDiv = document.querySelector("#left-side");
    let rightSideDiv = document.querySelector("#right-side");
    leftSideDiv.append(
      createPlayerCard(
        this.gameState,
        "p0",
        this.engine.players["p0"].shipStatus()
      )
    );
    rightSideDiv.append(
      createPlayerCard(
        this.gameState,
        "p1",
        this.engine.players["p1"].shipStatus()
      )
    );
    this.contentDiv.append(...createGameBoards(this.engine, this.gameState));
  }
}
