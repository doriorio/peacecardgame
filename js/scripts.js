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

var playerX = document.getElementById('playerX');
var playerY = document.getElementById('playerY');
var playerXCard = document.getElementById('playerXcard');
var playerYCard = document.getElementById('playerYcard');
var regularPlay = document.getElementById('normal-play');
var statusMessage = document.getElementById('status-message');
var mediation = document.getElementById('mediation');


/*----- event listeners -----*/ 
regularPlay.addEventListener('click',gamePlay);



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
            // playerX.innerHTML = xHand;
        } if (i >= 26) {
            if (yHand.length === 26) {
                return;
            }
            yHand.push(card);
            // playerY.innerHTML = yHand;
        }
    })
}


function gamePlay(){
    statusMessage.textContent = '';
    pickOne()
    checkForVals();
    render();
    checkForWin();
    clearRound();
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
    }
    if (yCardValue < xCardValue){
        yHand.push(xCardStatus,yCardStatus);
    } 
    else if (xCardValue === yCardValue && xCardValue !== undefined && yCardValue !== undefined){   
        pickFour();

    }
}

//for the pick

function pickFour(){
    statusMessage.textContent = 'Mediation!'

    xFour = xHand.splice(0,4);
    yFour = yHand.splice(0,4);
    xCardValue = parseInt((xFour.toString()).split("-",2)[1]); 
    yCardValue = parseInt((yFour.toString()).split("-",2)[1]);

    checkforMultVals();
}
function checkforMultVals(){
    if (xFour.length === 4 && yFour.length === 4){
        if (xCardValue < yCardValue){
            for (var i = 0; i<yFour.length;i++){
                xHand.push(yFour[i]);
            }
            for (var i = 0; i<xFour.length;i++){
                xHand.push(xFour[i]);
         }
            xHand.push(yCardStatus, xCardStatus);
        }
        if (yCardValue < xCardValue){
            for (var i = 0; i<xFour.length;i++){
                yHand.push(xFour[i]);
            }
            for (var i = 0; i<yFour.length;i++){
                yHand.push(yFour[i]);
            }
            yHand.push(yCardStatus, xCardStatus);
        }
         if (yCardValue === xCardValue) {

             houseRules();

        } 
    }
}

function houseRules(){
    statusMessage.textContent = "Enough arguing! The least combative suit will win this round."
    let ranks = {'h':0, 'd':1, 's':2, 'c':3};
    var houseyCardValue = ranks[yFour[0].charAt(0)];
    var housexCardValue = ranks[xFour[0].charAt(0)];

    if (houseyCardValue < housexCardValue){
        yHand.push(xCardStatus,yCardStatus);
        for (var i = 0; i<xFour.length;i++){
            yHand.push(xFour[i]);

        }
        for (var i = 0; i<yFour.length;i++){
            yHand.push(yFour[i]);

        }
    }

    if (housexCardValue < houseyCardValue){
        xHand.push(xCardStatus,yCardStatus);
        for (var i = 0; i<xFour.length;i++){
            xHand.push(xFour[i]);

        }
        for (var i = 0; i<yFour.length;i++){
            xHand.push(yFour[i]);

        }
    }

}



//ideally the innerHTML setting in x&yPick happens here eventually
function render(){
    // this will need logic for displaying xFour and yFour for those cases
    //
        // playerX.innerHTML = xHand;
        // playerY.innerHTML = yHand;
        playerX.classList.add('cardbackX');
        playerY.classList.add('cardbackY');

        playerXCard.innerHTML = xCardStatus;
        playerYCard.innerHTML = yCardStatus;
        // playerXCard.innerHTML = xFour;
        // playerYCard.innerHTML = yFour;
    //
}

function clearRound(){
    yCardStatus = undefined;
    xCardStatus = undefined;
    mediation.classList.remove('mediation');   

    mediation.classList.add('normal');

}

function checkForWin(){
    if (xHand.length === 0){
        statusMessage.textContent = 'player Y ftw'
        regularPlay.removeEventListener("click", gamePlay);
        //make the xHand HTML empty
    }
    if (yHand.length === 0 ){
        statusMessage.textContent = 'player X ftw'
        regularPlay.removeEventListener("click", gamePlay);
        //make the yHand HTML empty
    }
}

function init(){
    shuffleDeck();
}

init();