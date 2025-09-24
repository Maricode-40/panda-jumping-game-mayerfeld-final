## Stack

Used technologies:

<a href="https://developer.mozilla.org/es/docs/Web/CSS">
<img src= "https://user-images.githubusercontent.com/121863208/227808642-a8dcfecb-74b9-4796-8b2b-7bfe5cf1b4ba.svg"/>
</a>

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

# Objective

This repository is basically just a jumping game model that allows you to easily understand how the mechanics work:

HTML5 provides the semantic structure:

 < main > → game container

< header > → live score( < output >)

< section > → play area with the panda (player), fountain (obstacle), and boat (goal)

< footer > → game-over message

CSS3 handles the layout and visuals:

Background gradient for the water/sky

Panda, boat, and fountain displayed as images (background: url ( ...) )

Positioning with absolute so characters can move inside the play area

JavaScript manages the game logic:

Variables for player, obstacle, goal, score, game speed

A jump function that makes the panda jump with requestAnimationFrame

A loop that moves the fountain across the screen

Collision detection: if the panda hits the spour water → Game Over

Win condition: if the panda reaches the boat → You Win!

This model is intentionally simple, so you can follow along and understand how the different parts (HTML for structure, CSS for style, JS for behavior) come together to make a working 2D mini-game.

The loop:  * Moves the obstacle * Checks collisions * updates score/game state. 

Fully responsive as we use relative size in css.

# Collaborators 
- Marissa Rico Developer 
- Shalom Alalade Developer 

# Deploy 🚀 🚀 
 ## 🎮 Live Demo 
👉 [**Click here to play the game!**](https://maricode-40.github.io/panda-jumping-game-mayerfeld-final/)


