class UI {
    static gameBoard = document.querySelector("#game-board");
    static #title = document.querySelector(".title");
    static #player1Score = document.querySelector(".player1-score");
    static #player2Score = document.querySelector(".player2-score");

    static display(message) {
        this.#title.innerHTML = message;
    }

    static increaseScore(player) {
        if (player == "player1") {
            this.#player1Score.innerHTML = parseInt(this.#player1Score.innerHTML) + 1;
        } else if (player == "player2") {
            this.#player2Score.innerHTML = parseInt(this.#player2Score.innerHTML) + 1;
        };
    };

    static changeState(element, player){ 
        if (player == 1) {
            element.classList.add("o");
        } else if (player == 2) {
            element.classList.add("x");
        }
    }

    static clearBoard() {
        for (const element of this.gameBoard.children) {
            element.classList = "cell";
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
    this.#boardState = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];};

    
    static checkWin(){
    for (let x = 0; x < 3; x++){
        if (this.#boardState[x][0] === this.#boardState[x][1] && this.#boardState[x][1] === this.#boardState[x][2]){
            if (this.#boardState[x][0] !== 0) {return this.#boardState[x][0];};
        };
        if (this.#boardState[0][x] === this.#boardState[1][x] && this.#boardState[1][x] === this.#boardState[2][x]) {
            if (this.#boardState[0][x] !== 0) {return this.#boardState[0][x];};
        };
        };
        if (this.#boardState[0][0] === this.#boardState[1][1] && this.#boardState[1][1] === this.#boardState[2][2]){
        if (this.#boardState[0][0] !== 0) {return this.#boardState[0][0];};
        }
        if (this.#boardState[0][2] === this.#boardState[1][1] && this.#boardState[1][1] === this.#boardState[2][0]){
            if (this.#boardState[0][2] !== 0) {return this.#boardState[0][2];};
        };
       return
    };

    static checkGameOver(){
    const winner = this.checkWin();
        if (!winner && this.#boardState.flat().includes(0)) {
            return 
        } else if (!winner && !this.#boardState.flat().includes(0)) {
            return "tie";
        } else if (winner == 1) {
            return "player1";            
        } else if (winner == 2) {
            return "player2";            
        };;
    };

    static checkValidMove(cordinance) {
        if (this.#boardState[cordinance[0]][cordinance[1]] == 0) {
            return true
        } else if (this.#boardState[cordinance[0]][cordinance[1]] !== 0){
            return false
        }
    }

    static changeState(cordinance, playerTurn){
        if (playerTurn == 1) {
        this.#boardState[cordinance[0]][cordinance[1]] = 1;
        
        } else if (playerTurn == 2) {
        this.#boardState[cordinance[0]][cordinance[1]] = 2;
        };
    };
}


class Game {
    #playerTurn = 1;
    #player1Score = 0;
    #player2Score = 0;
    #restartBtn = document.querySelector(".restart-button").content.cloneNode(true).querySelector("button");
    #body = document.querySelector("body");
    #clickListner = (element) => {
            let cordinance = element.target.id.split("-");
            cordinance = cordinance.map(e => parseInt(e));
            const validity = GameBoard.checkValidMove(cordinance);
            if (validity) {
                GameBoard.changeState(cordinance, this.#playerTurn);
                UI.changeState(element.target, this.#playerTurn);
                const winner = GameBoard.checkGameOver()
                if (!winner) {
                    this.#playerTurn = this.#playerTurn == 1 ? 2 : 1;
                    UI.display(this.#moveMsg[this.#playerTurn]);
                } else {
                    UI.gameBoard.removeEventListener("click", this.#clickListner);
                    UI.display(this.#gameOverMsg[winner])
                    this.#body.appendChild(this.#restartBtn)
                    if (winner == "player1") {
                        this.#player1Score++;
                        UI.increaseScore(winner);
                    } else if (winner == "player2") {
                        this.#player2Score++;
                        UI.increaseScore(winner);
                    };
                }
                } else if (!validity) {
                    UI.display(this.#moveMsg[0])
                }
        }
    #moveMsg = [
        "Invalid Move!",
        "Player one place your mark.",
        "Player two place your mark.",
    ]
    #gameOverMsg = {
        tie: "You Tied!",
        player1: "Player 1 is the winner!",
        player2: "Player 2 is the winner!",
    }

    constructor(){
        this.#restartBtn.addEventListener("click", () => this.startGame());
        this.startGame();
    }

    startGame() {
        this.#playerTurn = 1;
        if (this.#restartBtn.parentElement) {
            this.#restartBtn.parentElement.removeChild(this.#restartBtn);
        }
        GameBoard.clearBoard();
        UI.clearBoard();
        UI.display(this.#moveMsg[1]);
        UI.gameBoard.addEventListener("click", this.#clickListner);
        }   
}

const game = new Game();