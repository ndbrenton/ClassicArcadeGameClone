# Classic Arcade Game Clone ( Udacity Nanodegree: Project 3)
## Table of Contents
- [Run](#run)
- [Play](#play)
## Run
To successfully run the application:
 - Open `index.html` in a web browser that supports __JavaScript__ and __HTML <canvas>__.
 - Dependencies included:
   - images are in the `images` folder
   - `styles.css` is included in the `css` folder
   - `app.js`, `resources.js`, and `engine.js` are included in the `js` folder

## Play
- Characters in this game are:

  - __Player__
  - __Enemies__ (bugs)

- Goals of the __Player__:
  - Reach the water at top of gameboard
    - Reaching the water results in sending the player back to their starting location
      - the game is won
  - Avoid contact with any __Enemies__
    - Contact results in sending the player back to their starting location

- __Player__ Movement:
  - move left one square  
    - _(left-arrow key)_
  - move right one square
    - _(right-arrow key)_
  - move up one square
    - _(up-arrow key)_
  - move down one square
    - _(down-arrow key)_

- __Enemy__ Movement:
  - __Enemies__ move _left-to-right_ at _varying speeds_ along the _paved portion_ of the game board
