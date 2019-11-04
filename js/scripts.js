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
    render();
    checkForWin();
}


function xPick(num){
    xCardStatus = xHand.splice(0,num);
    playerXCard.innerHTML = xCardStatus;
    console.log(xCardStatus)



    // playerXCard.innerHTML = xHand.splice(0,num);



    // xCardStatus.unshift(playerXCard.innerHTML);
    console.log(xCardStatus);
}    
function yPick(num){
    yCardStatus = yHand.splice(0,num);
    playerYCard.innerHTML = yCardStatus;
    console.log(yCardStatus)
    // playerYCard.innerHTML = yHand.splice(0,num);
    // yCardStatus.unshift(playerYCard.innerHTML);
}    

function checkForVals(){
    console.log(xCardValue);
    console.log(yCardValue);
    
    if (xCardValue < yCardValue){
        xHand.unshift(yCardStatus);
        xHand.unshift(xCardStatus);
        yCardStatus = [];
        xCardStatus = [];
    }
    if (yCardValue < xCardValue){
        yHand.unshift(xCardStatus);
        yHand.unshift(yCardStatus);
        xCardStatus = [];
        yCardStatus = [];
    } 
    else if (xCardValue === yCardValue){
        xPick(4);
        yPick(4);
        if (xCardValue < yCardValue){
            yCardStatus.forEach(function(arg1){
                xHand.unshift(arg1);
            })
            xCardStatus.forEach(function(arg2){
                xHand.unshift(arg2);
            })
            yCardStatus = [];
            xCardStatus = [];
        }
        if (yCardValue < xCardValue){
            xCardStatus.forEach(function(arg3){
                yHand.unshift(arg3);
            })
            yCardStatus.forEach(function(arg4){
                yHand.unshift(arg4);
            })
            yCardStatus = [];
            xCardStatus = [];
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
