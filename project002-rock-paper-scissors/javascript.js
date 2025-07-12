// Here I used commet as pseudocode

// call play_game
play_game();

// define play_game
function play_game(){
    // define player_score of type int with default value of 0
    let player_score = 0;
    // define computer_score of type int with default value of 0
    let computer_score = 0
    // for 5 times
    for (let i = 0; i < 5; i++) {
        // call play_round with player_score, computer_socre
        [player_score, computer_score] = play_round(player_score, computer_score);
    }
    // print the scores and the winer
    if (player_score > computer_score) {
        console.log(`You Won The Game \n Player: ${player_score} \n Computer: ${computer_score}`)
    } else if (player_score < computer_score) {
        console.log(`You Lost The Game \n Player: ${player_score} \n Computer: ${computer_score}`)
    } else {
        console.log(`You Tied The Game \n Player: ${player_score} \n Computer: ${computer_score}`)
    }
}

// define play_round with paraomets of player_score, computer_score
function play_round(player_score, computer_score) {
    // ask the user "Pick your hand!" and store the answer in player_hand
    let player_hand = prompt("Pick your hand");
    // If player hand = rock = 0 if = paper = 1 if = scissiors = 2
    if (player_hand === "rock") {player_hand = 0}
    else if (player_hand === "paper") {player_hand = 1} 
    else if (player_hand === "scissors") {player_hand = 2}
    // call pick_random_hand with no arguments, store the return value in computer_hand
    const computer_hand = pick_random_hand()
    // define winner with the return value of comapere_hands with arguemtns of player_hand, computer_hand
    const winner = compare_hands(player_hand, computer_hand)
    // IF (winner = None)
    if (winner === 0) {
        // call announce_winnder with arguemtns, player hand, computer_hand, resutl, player_score, computer_score
        announce_winner(player_hand, computer_hand, player_score, computer_score, "no one")
        // rertun player_score, computer_score
        return [player_score, computer_score]
    // IF ELSE (winner = "player")
    } else if (winner === "player") {
        // player_score + 1
        player_score++;
        // call announce_winnder with arguemtns, player hand, computer_hand, resutl, score
        announce_winner(player_hand, computer_hand, player_score, computer_score, "Won");
        // rertun player_score, computer_score
        return [player_score, computer_score];
    // ELSE (winner = "computer")
    } else {
        // computer_score + 1
        computer_score++;
        // call announce_winnder with arguemtns, player hand, computer_hand, resutl, score
        announce_winner(player_hand, computer_hand, player_score, computer_score, "Lost");
        // rertun player_score, computer_score
        return [player_score, computer_score];
    }
}

// define compare_hands with parameters of player_hand and computer_hand
function compare_hands(player_hand, computer_hand) {
    // IF  player_hand = computer_hand
    if (player_hand === computer_hand) {
        // return 0
        return 0;
    // IF plyer_hand = 0 && coputer_hand = 2
    } else if(player_hand === 0 && computer_hand === 2) {
        // return player
        return "player";
    // IF plyer_hand = 1 && coputer_hand = 0
    } else if (player_hand === 1 && computer_hand === 0) {
        // return player
        return "player";
    // IF plyer_hand = 2 && coputer_hand = 1
    } else if (player_hand === 2 && computer_hand === 1) {
        // return player
        return "player";
    }
    // reutnr computer
    return "computer"
}


// define pick_random_hand
function pick_random_hand() {
    // rerturn a random number from 0 to 2
    return Math.floor(Math.random() * 10) % 3
}

// define announce winner
function announce_winner(player_hand, computer_hand, player_score, computer_score, result) {
    // print "computer hands:" + computer_hand + "\n Your hand:" + player_hand + "\nYou." + result + "\nScore:" + score
    console.log(computer_hand)
    if (computer_hand === 0) {computer_hand = "rock"}
    else if (computer_hand === 1) {computer_hand = "paper"} 
    else if (computer_hand === 2) {computer_hand = "scissors"}
    if (player_hand === 0) {player_hand = "rock"}
    else if (player_hand === 1) {player_hand = "paper"} 
    else if (player_hand === 2) {player_hand = "scissors"}
    console.log (`Computer hand: ${computer_hand} \n Your hand: ${player_hand} \n You ${result} \n Score: player ${player_score}, computer ${computer_score}`)
}

