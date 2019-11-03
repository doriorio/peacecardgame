/*----- constants -----*/ 
//Setup - global variables: n = 52, playerIndex
//card values
var suits = ['s', 'c', 'd', 'h'];
var ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', '0J', '0Q', '0K', '0A'];
var fullDeck = []
suits.forEach(function(e){
    ranks.forEach(function(j,i){
     fullDeck.push(e.concat(j, " ,", i));
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


/*----- event listeners -----*/ 
//first, click the fulldeck hold box to give both players half the deck
fullStack.addEventListener('click',shuffleDeck);
playerX.addEventListener('click',alert);
playerY.addEventListener('click',alert);
playerXCard.addEventListener('click',alert);
playerYCard.addEventListener('click',alert);
regularPlay.addEventListener('click',gamePlay);

//use this as a test function when setting up event listeners or as a placeholder
function alert(){
    console.log('hitting');
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

//this is a little messy
function gamePlay(){
    xPick(1);
    yPick(1);
    var xCardValue = parseInt((xCardStatus.toString()).split(",",2)[1]);
    var yCardValue = parseInt((yCardStatus.toString()).split(",",2)[1]);
    if (xCardValue < yCardValue){
        xCardStatus.push(yCardStatus);
    }
    if (yCardValue < xCardValue){
        yCardStatus.push(xCardStatus);
    }
    else if (xCardValue === yCardValue){
        invokeMediation();
    }
}    

function invokeMediation(){

}

function xPick(num){
    xHandTemp = xHand.slice();
    playerXCard.innerHTML = xHandTemp.splice(0,num);
    xCardStatus.push(playerXCard.innerHTML);
}    
function yPick(num){
    yHandTemp = yHand.slice();
    playerYCard.innerHTML = yHandTemp.splice(0,num);
    yCardStatus.push(playerYCard.innerHTML);
}    

//clickHandle()
//mediation


// Both characters get three cards that go on their side of the "arena" - then they flip over a fourth card and whoever has the lowest value (the "peace" variation) wins all 10 cards (original 2 + )

////
// _if_ there aren't enough cards for all for the mediation requirements, they can use whatever they have left

//check for win
////cardsperplayer = 52
//render
//init