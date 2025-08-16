const UI = (function(){
    function changeState (player, element) {
        if (player == 1) {
            element.classList.toggle("o");
        } else if (player == 2) {
            element.classList.toggle("x");
        };
    };
    function display(message) {
        const title = document.querySelector("#title");
        title.innerHTML = message;
    }
    return {display, changeState}
})();
const GameBoard = (function(){
    let boardState = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    function clearBoard(){
    boardState = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    };
    function changeState(cordinance, playerTurn, element){
        if (boardState[cordinance[0]][cordinance[1]] == 0) {
            if (playerTurn == 1) {
            boardState[cordinance[0]][cordinance[1]] = 1;
            } else if (playerTurn == 2) {
            boardState[cordinance[0]][cordinance[1]] = 2;
            };
            UI.changeState(playerTurn, element);
            return true
        } else if (boardState[cordinance[0]][cordinance[1]] !== 0) {
            return false
        };
    };
    function checkWin(){
    for (let x = 0; x < 3; x++){
        if (boardState[x][0] === boardState[x][1] && boardState[x][1] === boardState[x][2]){
            if (boardState[x][0] !== 0) {return boardState[x][0];};
        };
        if (boardState[0][x] === boardState[1][x] && boardState[1][x] === boardState[2][x]) {
            if (boardState[0][x] !== 0) {return boardState[0][x];};
        };
        };
        if (boardState[0][0] === boardState[1][1] && boardState[1][1] === boardState[2][2]){
        if (boardState[0][0] !== 0) {return boardState[0][0];};
        }
        if (boardState[0][2] === boardState[1][1] && boardState[1][1] === boardState[2][0]){
            if (boardState[0][2] !== 0) {return boardState[0][2];};
        };
       return 0;
    };
    function checkGameOver(){
    const winner = checkWin();
        if (!winner && boardState.flat().includes(0)) {
            return 0
        } else if (!winner && !boardState.flat().includes(0)) {
            return 3;
        } else {
            return winner;            
        };
    };
    return {clearBoard, changeState, checkGameOver}
})();
const Round = (function(){
    let playerTurn = 1;
    function initiateTurn(moveCordinance, element){
        const moveValidity = GameBoard.changeState(moveCordinance, playerTurn, element)
        if (moveValidity) {
            const winner = GameBoard.checkGameOver()
            if (winner) {
                if(winner == 1) {
                    return 1;
                } else if (winner == 2) {
                    return 2;
                } else if (winner == 3) {
                    return 3;
                }
            } else {
                playerTurn = (playerTurn == 1 ? 2 : 1);
            }
        } else {
            return 0
        };
    };
    return {initiateTurn}
})();
const Game = (function(){
    let p1Score = 0;
    let p2Score = 0;
    const gameBoard = document.querySelector("#game-board");
    const body = document.querySelector("body");
    const restartBtn = document.querySelector(".restart-button").content.cloneNode(true).querySelector("button");
    restartBtn.addEventListener("click", startRound);
    gameBoard.addEventListener("click", function(element) {
        let cordinance = element.target.id.split("")
        cordinance = cordinance.map(e => parseInt(e));
        const winner = Round.initiateTurn(cordinance, element.target);
        if (winner == 0) {
            UI.display("Invalid Move!");
        } else if (winner == 1) {
            p1Score++;
            UI.display("Player one is the winner!");
            body.appendChild(restartBtn)
        } else if (winner == 2) {
            p2Score++;
            UI.display("Player two is the winner!");
            body.appendChild(restartBtn)
        } else if (winner == 3){
            UI.display("You Tied!");
        }
    });
    function startRound(){
        console.log("worsk");
        GameBoard.clearBoard();
        for (const element of gameBoard.children) {
            element.classList = "cell";
        }
    }
    // function startRound(){
    //     GameBoard.clearBoard();
    //     Round.startTurn();
    // };
    // function changeState(arr, player){

    // };
    return {startRound}
})();
Game.startRound();