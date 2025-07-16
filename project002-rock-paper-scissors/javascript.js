const startButton = document.querySelector(".start-game");
const content = document.querySelector(".content");
const buttons = document.querySelector(".buttons");
const board = document.querySelector(".board");
const computerScoreElemnt = document.createElement("h1");
const playerScoreElemnt = document.createElement("h1");
const scoresDiv = document.createElement("div");
const computerHandElemnt = document.createElement("h1");
const playerHandElemnt = document.createElement("h1");
const handDiv = document.createElement("div");
handDiv.appendChild(computerHandElemnt);
handDiv.appendChild(playerHandElemnt)
handDiv.classList.toggle("scores");

const repeatButton = document.createElement("button");
repeatButton.textContent = "Play Again.";
repeatButton.classList.toggle("button");
repeatButton.addEventListener("click", e => readyGame());



startButton.addEventListener("click", readyGame);

let playButtons = []
playButtons.push(document.createElement("button"));
playButtons.push(document.createElement("button"));
playButtons.push(document.createElement("button"));
playButtons[0].textContent = "Rock";
playButtons[1].textContent = "Paper";
playButtons[2].textContent = "Scissors";
playButtons[0].id = "rock";
playButtons[1].id = "paper";
playButtons[2].id = "scissors";
playButtons.forEach(e => e.classList.toggle("button"));

let playerScore = 0;
let computerScore = 0;

function readyGame(){
    startButton.remove();
    playButtons.forEach(e => buttons.appendChild(e));
    board.firstChild.textContent = "Choose Your Hand!"
    let playerHand;
    playerScore = 0;
    computerScore = 0;

    if (repeatButton) repeatButton.remove();
    scoresDiv.classList.toggle("scores");
    playerScoreElemnt.textContent = `Player: 0`
    computerScoreElemnt.textContent = `Computer: 0`
    scoresDiv.appendChild(playerScoreElemnt);
    scoresDiv.appendChild(computerScoreElemnt);
    board.appendChild(handDiv);
    board.appendChild(scoresDiv);

    buttons.addEventListener("click", 
            function (event) {
                let target = event.target;
                switch (target.id) {
                    case "rock":
                        playerHand = "rock";
                        playRound(playerHand, pickRandomHand());
                        break;
                    case "paper":
                        playerHand = "paper";
                        playRound(playerHand, pickRandomHand());
                        break;
                    case "scissors":
                        playerHand = "scissors";
                        playRound(playerHand, pickRandomHand());
                        break;
                }
            }
        )
    
}


function playRound(playerHand, computerHand) {
    const winner = compareHands(playerHand, computerHand)
    if (winner === "tie") {
        announce_winner(playerHand, computerHand, "Tied")
    } else if (winner === "player") {
        playerScore++;
        announce_winner(playerHand, computerHand, "Won");
    } else {
        computerScore++;
        announce_winner(playerHand, computerHand, "Lost");
    }
}

function compareHands(player_hand, computer_hand) {
    if (player_hand === computer_hand) {
        return "tie";
    } else if(player_hand === "rock" && computer_hand === "scissors") {
        return "player";
    } else if (player_hand === "paper" && computer_hand === "rock") {
        return "player";
    } else if (player_hand === "scissors" && computer_hand === "paper") {
        return "player";
    }
    return "computer"
}


function pickRandomHand() {
    const hand = Math.floor(Math.random() * 10) % 3
    switch (hand) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
    }
}

function announce_winner(playerHand, computerHand, result) {
    console.log (`Computer: ${computerHand} You: ${playerHand} \n You ${result} \n Score: player ${playerScore}, computer ${computerScore}`)
    playerScoreElemnt.textContent = `Player: ${playerScore}`
    computerScoreElemnt.textContent = `Computer: ${computerScore}`
    computerHandElemnt.textContent = `Computer: ${computerHand}`
    playerHandElemnt.textContent = `Player: ${playerHand}`
    board.firstChild.textContent = `You ${result}!`
    
    if (playerScore === 5 || computerScore === 5) {
        if (playerScore > computerScore) {
            board.firstChild.textContent = `You Won The Game!`
        } else if (playerScore < computerScore) {
            board.firstChild.textContent = `You Won The Game!`
        } else {
            board.firstChild.textContent = `You Won The Game!`        
        }
        // play agains doesn't work....
        playButtons.forEach(e => e.remove());
        buttons.appendChild(repeatButton);
    }
    
}

