/*----- constants -----*/ 

var suits = ['s', 'c', 'd', 'h'];
var ranks = ['0A', '02', '03', '04', '05', '06', '07', '08', '09', '10', '0J', '0Q', '0K'];
var fullDeck = [];
suits.forEach(function(e){
    ranks.forEach(function(j,i){
     fullDeck.push(`${e+j}-${i}`);
    });
});



/*----- app's state (variables) -----*/ 
let ycardsObj = {};
let yHand = [];
let xHand = [];


/*----- cached element references -----*/ 
var fullStack = document.getElementById('full-deck-hold');


/*----- event listeners -----*/ 


/*----- functions -----*/

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

yHand.forEach(function(e){
    var key = e.split('-',1)[0]
    var value = e.split('-',2)[1]
})

let ycardsObj = yHand.reduce(function(yHand,key,value){
    obj[]
})