class UI {
    static gameBoard = document.querySelector("#game-board");
    static #title = document.querySelector(".title");
    static #player1Score = document.querySelector(".player1-score");
    static #player2Score = document.querySelector(".player2-score");

    static display(message) {
        UI.#title.innerHTML = message;
    }

    static increaseScore(player) {
        if (player == "player1") {
            UI.#player1Score.innerHTML = parseInt(UI.#player1Score.innerHTML) + 1;
        } else if (player == "player2") {
            UI.#player2Score.innerHTML = parseInt(UI.#player2Score.innerHTML) + 1;
        };
    };

    static changeState(element, player){ 
        if (player == 1) {
            element.classList.add("o");
        } else if (player == 2) {
            element.classList.add("x");
        }
    }
}

class GameBoard {
    static #boardState = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    static clearBoard(){
    GameBoard.#boardState = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];};

    
    static checkWin(){
    for (let x = 0; x < 3; x++){
        if (GameBoard.#boardState[x][0] === GameBoard.#boardState[x][1] && GameBoard.#boardState[x][1] === GameBoard.#boardState[x][2]){
            if (GameBoard.#boardState[x][0] !== 0) {return GameBoard.#boardState[x][0];};
        };
        if (GameBoard.#boardState[0][x] === GameBoard.#boardState[1][x] && GameBoard.#boardState[1][x] === GameBoard.#boardState[2][x]) {
            if (GameBoard.#boardState[0][x] !== 0) {return GameBoard.#boardState[0][x];};
        };
        };
        if (GameBoard.#boardState[0][0] === GameBoard.#boardState[1][1] && GameBoard.#boardState[1][1] === GameBoard.#boardState[2][2]){
        if (GameBoard.#boardState[0][0] !== 0) {return GameBoard.#boardState[0][0];};
        }
        if (GameBoard.#boardState[0][2] === GameBoard.#boardState[1][1] && GameBoard.#boardState[1][1] === GameBoard.#boardState[2][0]){
            if (GameBoard.#boardState[0][2] !== 0) {return GameBoard.#boardState[0][2];};
        };
       return
    };

    static checkGameOver(){
    const winner = GameBoard.checkWin();
        if (!winner && GameBoard.#boardState.flat().includes(0)) {
            return 
        } else if (!winner && !GameBoard.#boardState.flat().includes(0)) {
            return "tie";
        } else if (winner == 1) {
            return "player1";            
        } else if (winner == 2) {
            return "player2";            
        };;
    };

    static checkValidMove(cordinance) {
        if (GameBoard.#boardState[cordinance[0]][cordinance[1]] == 0) {
            return true
        } else if (GameBoard.#boardState[cordinance[0]][cordinance[1]] !== 0){
            return false
        }
    }

    static changeState(cordinance, playerTurn){
        if (playerTurn == 1) {
        GameBoard.#boardState[cordinance[0]][cordinance[1]] = 1;
        
        } else if (playerTurn == 2) {
        GameBoard.#boardState[cordinance[0]][cordinance[1]] = 2;
        };
    };
}


class Game {
    static #player1Score = 0;
    static #player2Score = 0;
    static #restartBtn = document.querySelector(".restart-button").content.cloneNode(true).querySelector("button");
    static #body = document.querySelector("body");
    
    static initGame(){
        Game.#restartBtn.addEventListener("click", Game.initGame);
        let playerTurn = 1;
        let moveMsg = [
            "Invalid Move!",
            "Player one place your mark.",
            "Player two place your mark.",
        ]
        let gameOverMsg = {
            tie: "You Tied!",
            player1: "Player 1 is the winner!",
            player2: "Plyyer 2 is the winner!",
        }
        GameBoard.clearBoard();
        for (const element of UI.gameBoard.children) {
            element.classList = "cell";
        }
        UI.display(moveMsg[1]);
        UI.gameBoard.addEventListener("click", function(element){
            let cordinance = element.target.id.split("-");
            cordinance = cordinance.map(e => parseInt(e));
            const validity = GameBoard.checkValidMove(cordinance);
            if (validity) {
                GameBoard.changeState(cordinance, playerTurn);
                UI.changeState(element.target, playerTurn);
                const winner = GameBoard.checkGameOver()
                if (!winner) {
                    playerTurn = playerTurn == 1 ? 2 : 1;
                    UI.display(moveMsg[playerTurn]);
                } else {
                    UI.display(gameOverMsg[winner])
                    Game.#body.appendChild(Game.#restartBtn)
                    if (winner == "player1") {
                        Game.#player1Score++;
                        UI.increaseScore(winner);
                    } else if (winner == "player2") {
                        Game.#player2Score++;
                        UI.increaseScore(winner);
                    };
                }
            } else if (!validity) {
                UI.display(moveMsg[0])
            }
        });
    }
    
}

Game.initGame();