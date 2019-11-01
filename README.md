# Peace: An Amicable Game



## Wireframe


The Arena | Player 1 | Player 2 | 
| ----------- | ----------- | ----------- |
| :v: (where mediation happens)| :black_joker: | :black_joker: |
| :black_square_button: (where regular gameplay happens) | n = 26 | n = 26|
:alarm_clock: (clock counts down 3,2,1 every turn)


### The Rules
WikiHow: How To Play (https://www.wikihow.com/Play-War-(Card-Game))

## Pseudocode
----

## Init, state, tracked vars

```
//Setup - state variables: turn, score, cardsPerPlayer

//Setup - global variables: n = 52, playerIndex

//The game initializes and....

//// The deck of n = 52 is shuffled and half of the deck is assigned to each player

////The score is 0




//A countdown displays and if there are two clicks (one per player) on the arena, the click listener is activated

```
## Click Listener
```


//Looks at the value of both cards and compares (this will be programmatically generated based on  card number)

////If one is higher than the other then both cards are collected

///// If they are the same value, _mediation_ begins

```
## Mediation 
``` 

// Both characters get three cards that go on their side of the "arena" - then they flip over a fourth card and whoever has the lowest value (the "peace" variation) wins all 10 cards (original 2 + )

////
_if_ there aren't enough cards for all for the mediation requirements, they can use whatever they have left

``` 

## Check for win
``` 

////When a player has all 52 cards, they win

////if not keep going? (Mental note to look into other scenarios)
``` 

## Wishlist
* Countdown for every turn - 3,2,1 go!
* Different cursors for each player that alternate based on turn
* A delay in flipping the card
* Animations
* Peaceful music
* Cutesy mediation 'cues' during mediation
* Dynamic score counter
* Make players be countries: Canada & switzerland and have a map highlight with the country (player) based on who wins the cards in the turn

