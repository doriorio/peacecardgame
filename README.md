# Peace: An Amicable Game



## Wireframe


The Arena | Player 1 | Player 2 | 
| ----------- | ----------- | ----------- |
| :house_with_garden: | :black_joker: | :black_joker: |
| :black_square_button: | n = 26 | n = 26|

### The Rules
WikiHow: How To Play (https://www.wikihow.com/Play-War-(Card-Game))

## Pseudocode

```
//Setup - state variables: turn, score, cardsPerPlayer

//Setup - global variables: n = 52, playerIndex

//The game initializes and....

//// The deck of n = 52 is shuffled and half of the deck is assigned to each player

////The score is 0


////Players are Canada (P1) and Switzerland (P2)



//A countdown displays and if there are two clicks (one per player) on the arena, the click listener is activated

//Click listener:

////Looks at the value of both cards and compares (this will be programmatically generated based on  card number)

//////If one is higher than the other then both cards are collected

/////// If they are the same value, _mediation_ begins

//////// Both characters get three cards that go on their side of the "arena" - then they flip over a fourth card and whoever has the lowest value (the "peace" variation) wins all 10 cards (original 2 + )
_if there aren't enough cards for all for the mediation requirements, they can use whatever they have left

//Check for win

////When a player has all 52 cards, they win

////if not keep going? (Mental note to look into other scenarios)

```