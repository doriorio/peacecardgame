/*----- constants -----*/ 
//Setup - global variables: n = 52, playerIndex
//card values
var suits = ['s', 'c', 'd', 'h'];
var ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', '0J', '0Q', '0K', '0A'];
var fullDeck = []
suits.forEach(function(e){
    ranks.forEach(function(j,i){
     fullDeck.push(e.concat(j, "- ", i));
    })
})


//go back and give values in an object later - 
//for now use the text at the end for values


/*----- app's state (variables) -----*/ 

//Setup - state variables: turn, score, cardsPerPlayer

xHand = [];
yHand = [];
xCardStatus = [];
yCardStatus = [];

/*----- cached element references -----*/ 
//allcards = 52
var fullStack = document.getElementById('full-deck-hold')
var playerX = document.getElementById('playerX')
var playerY = document.getElementById('playerY')
var playerXCard = document.getElementById('playerXcard')
var playerYCard = document.getElementById('playerYcard')
var regularPlay = document.getElementById('temp-normal-play')
var mediationPlay = document.getElementById('temp-mediation')
var statusMessage = document.getElementById('status-message')


/*----- event listeners -----*/ 
//first, click the fulldeck hold box to give both players half the deck
fullStack.addEventListener('click',shuffleDeck);
// playerX.addEventListener('click',alert);
// playerY.addEventListener('click',alert);
// playerXCard.addEventListener('click',alert);
// playerYCard.addEventListener('click',alert);
regularPlay.addEventListener('click',gamePlay);
mediationPlay.addEventListener('click',invokeMediation);

//use this as a test function when setting up event listeners or as a placeholder
function alert(){
    console.log('alert');
}


//A countdown displays and if there are two clicks (one per player) on the arena, the click listener is activated
//both players have to pick their square
//then it looks at the cards on the play div and whoever has the lowest value splices them into their hand
//if the value is the same. enter mediation

//Looks at the value of both cards and compares (this will be programmatically generated based on  card number)

////If one is higher than the other then both cards are collected

///// If they are the same value, _mediation_ begins



/*----- functions -----*/

function shuffleDeck() {
    var tempDeck = fullDeck.slice();
    var shuffleAll = [];

    // var yHand = [];
    while (tempDeck.length) {
        var rndIdx = (Math.floor(Math.random() * tempDeck.length))
        shuffleAll.push(tempDeck.splice(rndIdx, 1)[0])
        fullStack.innerHTML = shuffleAll;
        }
    shuffleAll.forEach(function(card,i){
        if (i < 26) {
            if (xHand.length === 26){
                return;
            }
            xHand.push(card);
            playerX.innerHTML = xHand;
        } if (i >= 26) {
            if (yHand.length === 26) {
                return;
            }
            yHand.push(card);
            playerY.innerHTML = yHand;
        }
    })
}

//this is a little messy - later on this can be used for both mediation and for reg 
//by passing in an n that changes the xPick and yPick args
//would need to iterater over the xCard and yCard values with a forEach to do so
function gamePlay(){
    xPick(1);
    yPick(1);
    xCardValue = '';
    xCardStatus.forEach(function(e){
        let xScore = 0
        xScore = parseInt((e.toString()).split("-",2)[1]);
        var xCardValue = xScore;
        return xCardValue;
    })
    yCardValue = '';
    yCardStatus.forEach(function(e){
        let yScore = 0
        yScore = parseInt((e.toString()).split("-",2)[1]);
        var yCardValue = yScore;
        return yCardValue;
    })

    if (xCardValue < yCardValue){
        xHand.push(Array.from(yCardStatus));
        playerX.innerHTML = xHand.toString();

    }
    if (yCardValue < xCardValue){
        yHand.push(Array.from(xCardStatus))
        playerY.innerHTML = yHand.toString();
    }
    
    else if (xCardValue === yCardValue){
        invokeMediation();
        console.log('mediation invoked');

    }
    checkForWin();
}    



function invokeMediation(){
    alert();
}

function xPick(num){
    playerXCard.innerHTML = xHand.splice(0,num);
    xCardStatus.push(playerXCard.innerHTML);
    playerX.innerHTML = xHand;
}    
function yPick(num){
    
    playerYCard.innerHTML = yHand.splice(0,num);
    yCardStatus.push(playerYCard.innerHTML);
    playerY.innerHTML = yHand;
}    

function checkForWin(){
    console.log(yHand.length)
    console.log(xHand.length)
}

//render
//init