/*----- constants -----*/ 

var suits = ['s', 'c', 'd', 'h'];
var ranks = ['0A', '02', '03', '04', '05', '06', '07', '08', '09', '10', '0J', '0Q', '0K'];
var fullDeck = [];
suits.forEach(function(e){
    ranks.forEach(function(j,i){
     fullDeck.push(e.concat(j, "- ", i));
    })
})

/*----- app's state (variables) -----*/ 

var xHand = [];
var yHand = [];
var xCardStatus = [];
var yCardStatus = [];
let xCardValue, yCardValue, xFour, yFour;

/*----- cached element references -----*/ 
//X & Y "Hands"
var playerX = document.getElementById('playerX');
var playerY = document.getElementById('playerY');

//X & Y "Cards in Play"
var playerXCard = document.getElementById('playerXcard');
var playerYCard = document.getElementById('playerYcard');

//Button
var regularPlay = document.getElementById('normal-play');


//Dynamic Elements
var statusMessage = document.getElementById('status-message');
var gameStatusMessage = document.getElementById('gameplay-status-message');
var mediation = document.getElementById('mediation');
var dynamicImage = document.getElementById('image-hold');
var winMessage = document.getElementById('titlemessage');
var playerXMediation = document.getElementById('playerXmediation');
var playerYMediation = document.getElementById('playerYmediation');




/*----- event listeners -----*/ 
regularPlay.addEventListener('click',gamePlay);
var resetPlay = document.getElementById('reset').addEventListener('click',reload);


/*----- functions -----*/

function shuffleDeck() {
    var tempDeck = fullDeck.slice();
    var shuffleAll = [];
    while (tempDeck.length) {
        var rndIdx = (Math.floor(Math.random() * tempDeck.length))
        shuffleAll.push(tempDeck.splice(rndIdx, 1)[0])
        
        }
    shuffleAll.forEach(function(card,i){
        if (i < 26) {
            if (xHand.length === 26){
                return;
            }
            xHand.push(card);

        } if (i >= 26) {
            if (yHand.length === 26) {
                return;
            }
            yHand.push(card);

        }
    })
}


function gamePlay(){
    clearRound();
    pickOne()
    checkForVals();
    render();
    checkForWin();
}

function pickOne(){
    xCardStatus = xHand.splice(0,1)[0];
    yCardStatus = yHand.splice(0,1)[0];
    xCardValue = parseInt((xCardStatus.toString()).split("-",2)[1]); 
    yCardValue = parseInt((yCardStatus.toString()).split("-",2)[1]);
    
}


function checkForVals(){
    if (xCardValue < yCardValue){
        xHand.push(yCardStatus,xCardStatus);
        statusMessage.textContent = "Player X wins this round!" 
    }
    if (yCardValue < xCardValue){
        yHand.push(xCardStatus,yCardStatus);
        statusMessage.textContent = "Player Y wins this round!" 
    } 
    else if (xCardValue === yCardValue && xCardValue !== undefined && yCardValue !== undefined){   
        pickFour();

    }
}



function pickFour(){
    statusMessage.textContent = 'Mediation!'

    xFour = xHand.splice(0,4);
    yFour = yHand.splice(0,4);
    xCardValue = parseInt((xFour.toString()).split("-",2)[1]); 
    yCardValue = parseInt((yFour.toString()).split("-",2)[1]);
    dynamicImage.classList.add('mediation-img');
    checkforMultVals();
}



function checkforMultVals(){
    if (xFour.length === 4 && yFour.length === 4){
        if (xCardValue < yCardValue){
            xPush();
            winMessage.textContent = "Player X wins this round of mediation."

        }
        if (yCardValue < xCardValue){
            yPush();
            winMessage.textContent = "Player Y wins this round of mediation."
        }
         if (yCardValue === xCardValue) {
            houseRules();
        } 
    }
}

function xPush(){
    xHand.push(xCardStatus,yCardStatus);
    for (var i = 0; i<xFour.length;i++){
        xHand.push(xFour[i]);

    }
    for (var i = 0; i<yFour.length;i++){
        xHand.push(yFour[i]);

    }
}

function yPush(){
    yHand.push(xCardStatus,yCardStatus);
    for (var i = 0; i<xFour.length;i++){
        yHand.push(xFour[i]);
    }
    for (var i = 0; i<yFour.length;i++){
        yHand.push(yFour[i]);
    }

}


//need a set time out here
function houseRules(){
    let ranks = {'h':0, 'd':1, 's':2, 'c':3};
    var houseyCardValue = ranks[yFour[0]];
    var housexCardValue = ranks[xFour[0]];
    if (houseyCardValue < housexCardValue){
        yPush();
        winMessage.textContent = "Enough arguing! The least combative suit - Player Y's- will win this round."

    }

    if (housexCardValue < houseyCardValue){
        xPush();
        winMessage.textContent = "Enough arguing! The least combative suit - Player X's- will win this round."
    }
}



//ideally the innerHTML setting in x&yPick happens here eventually
function render(){
    if (yFour == undefined) {
        playerXCard.style.backgroundImage = `url('css/card-deck-css/cardimages/${xCardStatus}.svg')`;
        playerYCard.style.backgroundImage = `url('css/card-deck-css/cardimages/${yCardStatus}.svg')`;        


    }
    

    if (yFour !== undefined){
        console.log(yFour);
        playerXCard.style.backgroundImage = `url('css/card-deck-css/cardimages/${xFour[0]}.svg')`;
        playerYCard.style.backgroundImage = `url('css/card-deck-css/cardimages/${yFour[0]}.svg')`;
        playerYMediation.classList.add('cardbackMediate');
        playerXMediation.classList.add('cardbackMediate');
    }

}

function clearRound(){
    winMessage.textContent = "✌️Peace: An Amicable Game ✌️";
    if (yHand > xHand){
        gameStatusMessage.textContent = "Not that it's a contest, but Player Y is in the lead";

    }
    if (xHand > yHand){
        gameStatusMessage.textContent = "Not that it's a contest, but Player X is in the lead";
    }
    yFour = undefined;
    xFour = undefined;
    yCardStatus = undefined;
    xCardStatus = undefined;
    // mediation.classList.add('normal');
    mediation.textContent = '';
    dynamicImage.classList.remove('mediation-img');

    statusMessage.textContent = '';
    playerYMediation.classList.add('removeborder');
    playerYMediation.classList.remove('cardbackMediate');
    playerXMediation.classList.add('removeborder');
    playerXMediation.classList.remove('cardbackMediate');

    
}

function checkForWin(){
    if (xHand.length === 0){
        winMessage.textContent = 'Player Y Wins!'
        regularPlay.removeEventListener("click", gamePlay);
        playerX.classList.remove('cardbackX','cell','cell-3','container');
        playerYMediation.classList.remove('cardbackMediate');
        playerXMediation.classList.remove('cardbackMediate');
        playerX.classList.add('removeborder');
        regularPlay.style.display = 'none';
        gameStatusMessage.textContent = "Don't worry Player X, just hit Reset and try again";


    }
    if (yHand.length === 0 ){
        winMessage.textContent = 'Player X Wins!'
        regularPlay.removeEventListener("click", gamePlay);
        playerY.classList.remove('cardbackY','cell','cell-3','container');
        playerYMediation.classList.remove('cardbackMediate');
        playerXMediation.classList.remove('cardbackMediate');
        playerY.classList.add('removeborder');
        regularPlay.style.display = 'none';
        gameStatusMessage.textContent = "Don't worry Player Y, just hit Reset and try again";


    }
}

function init(){
    shuffleDeck();
    playerX.classList.add('cardbackX');
    playerY.classList.add('cardbackY');
    gameStatusMessage.textContent = '';
}


function reload(){
    location.reload();
}

init();