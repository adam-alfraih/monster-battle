# Monster Battle: The Card Game

'Monster Battle: The Card Game' is a React application. With a 48 hour deadline, is the completed version of the technical challenge. 

This project is not completely styled and continues to be a **work in progress**.

## Overview

The battle between two teams begins.

Each team is given an array of 25 monsters. The monsters are generated through the PokeAPI and their hit points are generated through a JS function. 

On the click of a button, two random cards are chosen from each deck. The team with the highest HP from the selected card wins the round. The winner keeps the two cards in a b_deck.

Whichever winner collects the most cards wins the game. The score and state of the game is saved in your local storage and persists even if the user refreshes or closes the browser.

## Notes
-   This project was intentionally written so that it was readable without comments. 
-   If given more time, I would have rendered the b_deck array.length on the screen as a card, implemented the card editing feature, as well as the "pick your team" feature. Considering the timeline, I descoped the project and prioritised the features that are currently implemented.

## Getting Started
 
-   For local dev, clone the project and run these commands.

```Console
npm install
```

 
```Console
npm start
```
