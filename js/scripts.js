/*----- constants -----*/ 
//Setup - global variables: n = 52, playerIndex
//card values
var suits = ['s', 'c', 'd', 'h'];
var ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
var fullDeck = []
suits.forEach(function(e){
    ranks.forEach(function(j){
     fullDeck.push(e.concat(j));
    })
})

//go back and give values in an object later - 
//for now use the text at the end for values


/*----- app's state (variables) -----*/ 

//Setup - state variables: turn, score, cardsPerPlayer

/*----- cached element references -----*/ 
//allcards = 52

/*----- event listeners -----*/ 
//first, click the fulldeck hold box to give both players half the deck
document.getElementById('full-deck-hold').addEventListener('click',shuffleDeck)


//A countdown displays and if there are two clicks (one per player) on the arena, the click listener is activated

//Looks at the value of both cards and compares (this will be programmatically generated based on  card number)

////If one is higher than the other then both cards are collected

///// If they are the same value, _mediation_ begins



/*----- functions -----*/
//shuffleDeck
xHand = [];
yHand = [];
function shuffleDeck() {
    var tempDeck = fullDeck.slice();
    var shuffleAll = [];
    // var yHand = [];
    while (tempDeck.length) {
        var rndIdx = (Math.floor(Math.random() * tempDeck.length))
        shuffleAll.push(tempDeck.splice(rndIdx, 1)[0])
    }
    shuffleAll.forEach(function(card,i){
        if (i%2){
            xHand.push(card);
        } else {
            yHand.push(card);
        }

    })
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