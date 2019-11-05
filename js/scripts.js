/*----- constants -----*/ 

var suits = ['s', 'c', 'd', 'h'];
var ranks = ['0A', '02', '03', '04', '05', '06', '07', '08', '09', '10', '0J', '0Q', '0K'];
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
var statusMessage = document.getElementById('status-message');


/*----- event listeners -----*/ 
fullStack.addEventListener('click',alert);
regularPlay.addEventListener('click',gamePlay);

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
    xCardValue = parseInt((xCardStatus.toString()).split("-",2)[1]);
    
    yCardValue = parseInt((yCardStatus.toString()).split("-",2)[1]);

    checkForVals();
    clearRound();
    checkForWin();
}


function xPick(num){
    if (num === 1){
        xCardStatus = xHand.splice(0,num)[0];
    } 
    if (num === 4){
        yCardStatus = yHand.splice(0,4);
    }
}    

function yPick(num){
    if (num === 1){
    yCardStatus = yHand.splice(0,1)[0];
    }
    if (num === 4){
        yCardStatus = yHand.splice(0,4);
    }
}    

function checkForVals(){

    if (xCardValue < yCardValue){
        xHand.push(yCardStatus);
        xHand.push(xCardStatus);

    }
    if (yCardValue < xCardValue){
        yHand.push(xCardStatus);
        yHand.push(yCardStatus);

    } 
    else if (xCardValue === yCardValue){
        xPick(4);
        yPick(4);
        if (xCardValue < yCardValue){
            yCardStatus.forEach(function(arg1){
                xHand.push(arg1);
            })
            xCardStatus.forEach(function(arg2){
                xHand.push(arg2);
            })
            yCardStatus = [];
            xCardStatus = [];
        }
        if (yCardValue < xCardValue){
            xCardStatus.forEach(function(arg3){
                yHand.push(arg3);
            })
            yCardStatus.forEach(function(arg4){
                yHand.push(arg4);
            })
        } else {
            console.log('edgecase')
        } 
        
    }
    
}


//ideally the innerHTML setting in x&yPick happens here eventually
function clearRound(){
    playerX.innerHTML = xHand;
    playerY.innerHTML = yHand;
    playerXCard.innerHTML = xCardStatus;
    playerYCard.innerHTML = yCardStatus;
    yCardStatus = [];
    xCardStatus = [];
}
function checkForWin(){
    if (xHand.length === 52){
        statusMessage.textContent = 'player X ftw'
    }
    if (yHand.length === 52 ){
        statusMessage.textContent = 'player Y ftw'
    }
}

function init(){
    shuffleDeck();
}

init();
