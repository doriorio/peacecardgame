/*----- constants -----*/ 

var suits = ['s', 'c', 'd', 'h'];
var ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', '0J', '0Q', '0K', '0A'];
var fullDeck = [];
suits.forEach(function(e){
    ranks.forEach(function(j,i){
     fullDeck.push(e.concat(j, "- ", i));
    })
})

// //add this later and make sure to add ace
// suits.forEach(function(e){
//     ranks.forEach(function(j){
//      fullDeck.push(e+j);
//     })
// })

//eventually, we need a players object so that the toggling between 
//x and y functions can be done programmatically

/*----- app's state (variables) -----*/ 

var xHand = [];
var yHand = [];
var xCardStatus = [];
var yCardStatus = [];
let xCardValue, yCardValue;

/*----- cached element references -----*/ 

var fullStack = document.getElementById('full-deck-hold');
var playerX = document.getElementById('playerX');
var playerY = document.getElementById('playerY');
var playerXCard = document.getElementById('playerXcard');
var playerYCard = document.getElementById('playerYcard');
var regularPlay = document.getElementById('temp-normal-play');
var mediationPlay = document.getElementById('temp-mediation');
var statusMessage = document.getElementById('status-message');


/*----- event listeners -----*/ 
fullStack.addEventListener('click',alert);
regularPlay.addEventListener('click',gamePlay);
mediationPlay.addEventListener('click',invokeMediation);

/*----- functions -----*/
//use this as a test function when setting up event listeners or as a placeholder
function alert(){
    console.log('placeholder function');
}

function shuffleDeck() {
    var tempDeck = fullDeck.slice();
    var shuffleAll = [];
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
    // xCardValue = '';
    xCardValue = parseInt((xCardStatus.toString()).split("-",2)[1]);
    // yCardValue = '';
    yCardValue = parseInt((yCardStatus.toString()).split("-",2)[1]);
    checkForWin();
    updateValues();
}


function xPick(num){
    playerXCard.innerHTML = xHand.splice(0,num);
    xCardStatus.unshift(playerXCard.innerHTML);
}    
function yPick(num){
    playerYCard.innerHTML = yHand.splice(0,num);
    yCardStatus.unshift(playerYCard.innerHTML);
}    

function checkForWin(){
    console.log(xCardValue)
    if (xCardValue < yCardValue){
        // push the x and y status 
        // then clear out the x and y card value and x&y status
        xHand.unshift(yCardStatus);
        xHand.unshift(xCardStatus);
        yCardStatus = [];
        xCardStatus = [];

        // yHand = yHand.filter(function(yCard){
        //     return yCard !== xHand[0]
        // })
        // delete yCardStatus[0];
    }
    if (yCardValue < xCardValue){
        yHand.unshift(xCardStatus);
        yHand.unshift(yCardStatus);
        xCardStatus = [];
        yCardStatus = [];
    } 
    else if (xCardValue === yCardValue){
        return;
        
    }
    
}
//ideally the innerHTML setting in x&yPick happens here eventually
function updateValues(){
    playerX.innerHTML = xHand;
    playerY.innerHTML = yHand;
    // playerXCard.innerHTML = xCardStatus;
    // playerYCard.innerHTML = yCardStatus;
}
function invokeMediation(){
    alert();
}
function init(){
    shuffleDeck();
    
}

init();

//render
//init