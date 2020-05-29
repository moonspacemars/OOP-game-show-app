/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game;
const startButton=document.querySelector("#btn__reset");

/**
 * Event listener for start button
 */
startButton.addEventListener('click',(event)=>{
    game=new Game();
    game.startGame();
});

const keyboard=document.querySelector("#qwerty");

/**
 * Event listener for keyboard
 */
keyboard.addEventListener('click',(event)=>{
    if (event.target.type==="submit"){
        game.handleInteraction(event.target);
    }
});