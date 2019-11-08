# Peace: An Amicable Game


## Wireframe

![wireframe] (https://github.com/doriorio/peacecardgame/blob/master/css/imgs/wireframe.png)

### The Rules
WikiHow: How To Play (https://www.wikihow.com/Play-War-(Card-Game))
## Houserules
-If someone's hand is empty, the other person wins
-The lower scoring player gets all the cards ('peace' spin)
-War is called 'mediation'
-We don't like excessive fighting; rather than mediate recursively - in the instance that mediation is entered and the cards are equal, the more 'peaceful' suit gets the cards 
--Houserules suits scoring: hearts = 0, diamonds = 1, spades = 2, clubs = 3



### Technologies used
Vanilla JS, HTML, CSS


## Pseudocode
----

## Init, state, tracked vars

```
//Initializing shuffles the deck - this only happens once
//Declare Xhand, Yhand as empty variables
//Declare x & y scores as empty variables

```
## Click Listener
```

//Play button - gets removed in a win condition
//Reset button

```
## Regular Gameplay
``` 
//A card is dealt by splicing it out of the X or Y hand
//That value is read by parsing the integer out of the card name
//Whoever has the lower value gets both cards
``` 



## Mediation 
``` 

// Both characters get four more cards that go on their side of the "arena" - then they flip over the fourth card and whoever has the lowest value (the "peace" variation) wins all 10 cards (original 2 + )

//// if mediation inside of mediation, invoke House Rules - the least violent suit gets the cards

``` 



## Check for win
``` 
//When someone's hand is empty, the other person wins
``` 

## Wishlist
* Countdown for every turn - 3,2,1 go!
* Different cursors for each player that alternate based on turn
* A delay in flipping the card - overall timing the functions
* Animations
* <del>Peaceful music</del>
* <del>Cutesy mediation 'cues' during house rules</del>
* <del>Dynamic score counter</del>
* Make players be countries: Canada & switzerland and have a map highlight with the country (player) based on who wins the cards in the turn

