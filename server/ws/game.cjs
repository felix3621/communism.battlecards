function sendClientInfo() {
    //stones
        //targetAttack
    //playerCardInfo
    //enemyCardCount
    //energy
    //playerAvatar
    //enemyAvatar
    //time
    //turn
    //turnCount
    //title
}
function tick() {
    //update time
    //post to client
}
function endTurn() {
    //sendAttacks (calculate)
    //changeTurn
    //updateTurnCount, if both played
    //resetTime
}
function selectStoneTarget() {
    //selectAttacker
    //selectRecipient
    //save attack
}
function placeCard() {
    //select card
    //verify card
    //placeOut
}
function drawCard() {
    //gameclasses:plyer.drawCards
}
function endGame() {
    //calculated after every turn
    //who win/looses
}

//TODO: future: viewers


/*
// Define the function you want to run
function UpdateGames() {
    for (let i = 0; i < GameStorage.length; i++) {
        GameStorage[i].Update();
        
    }
}

//vars
var GameStorage = new Array();
// Set up the interval to run the function every second (1000 milliseconds)
/*var intervalId = setInterval(tick, 1000);*/