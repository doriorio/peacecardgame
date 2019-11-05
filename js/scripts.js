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
let xCardValue, yCardValue;

/*----- cached element references -----*/ 

var fullStack = document.getElementById('full-deck-hold');
var playerX = document.getElementById('playerX');
var playerY = document.getElementById('playerY');
var playerXCard = document.getElementById('playerXcard');
var playerYCard = document.getElementById('playerYcard');
var regularPlay = document.getElementById('temp-normal-play');
var mediationPlay = document.getElementById('mediation-play');
var statusMessage = document.getElementById('status-message');
var mediation = document.getElementById('mediation');


/*----- event listeners -----*/ 
fullStack.addEventListener('click',alert);
regularPlay.addEventListener('click',gamePlay);
mediationPlay.addEventListener('click',pickFour);

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
    pickOne()
    render()
    checkForVals();
    clearRound();
    checkForWin();
}

function pickOne(){
    xCardStatus = xHand.splice(0,1)[0];
    yCardStatus = yHand.splice(0,1)[0];
    xCardValue = parseInt((xCardStatus.toString()).split("-",2)[1]); 
    yCardValue = parseInt((yCardStatus.toString()).split("-",2)[1]);
}

function pickFour(){
    xCardStatus = xHand.splice(0,4);
    console.log(xCardStatus + 'xcardstatus');
    yCardStatus = yHand.splice(0,4);
    console.log(yCardStatus + 'ycardstatus');
    xCardValue = parseInt((xCardStatus.toString()).split("-",2)[1]); 
    yCardValue = parseInt((yCardStatus.toString()).split("-",2)[1]);
    checkForVals();
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
    else if (xCardValue === yCardValue && xCardValue !== undefined && yCardValue !== undefined){
        alert();
        mediation.classList.add('mediation-message');
        mediationPlay.classList.add('time-to-mediate');
        if (xCardValue < yCardValue){
            for (var i = 0; i<yCardStatus.length;i++){
                xHand.push(yCardStatus[i]);
            }
            for (var i = 0; i<xCardStatus.length;i++){
                xHand.push(xCardStatus[i]);
            }

        }
        if (yCardValue < xCardValue){
            for (var i = 0; i<xCardStatus.length;i++){
                yHand.push(xCardStatus[i]);
            }
            for (var i = 0; i<yCardStatus.length;i++){
                yHand.push(yCardStatus[i]);
            }
        } else {
            console.log('edgecase')
        } 
        
    }
    
}


//ideally the innerHTML setting in x&yPick happens here eventually
function render(){
    playerX.innerHTML = xHand;
    playerY.innerHTML = yHand;
    playerXCard.innerHTML = xCardStatus;
    playerYCard.innerHTML = yCardStatus;
}

function clearRound(){
    yCardStatus = undefined;
    xCardStatus = undefined;
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