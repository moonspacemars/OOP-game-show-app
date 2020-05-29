/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
class Game {
    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
        this.resetGame();
    }


    /**
     * Creates phrases for use in game
     * @return {array} An array of phrases that could be used in the game
     */
    createPhrases() {
        const group = [];
        group.push(new Phrase("Nice to meet you"));
        group.push(new Phrase("all roads lead to Rome"));
        group.push(new Phrase("practice makes perfect"));
        group.push(new Phrase("to be or not to be"));
        group.push(new Phrase("An apple a day keeps the doctor away"));
        return group;
    }


    /**
     * Selects random phrase from phrases property
     * @return {Object} Phrase Object choosen to be used
     */
    getRandomPhrase() {
        const randomIdx = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[randomIdx];
    }


    /**
     * Begins game by selecting a random phrase and displaying to user
     */
    startGame() {        
        const div = document.querySelector("#overlay");
        div.style.display = "none";
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }


    /**
     * Clear previous record
     */
    resetGame() {
        const ul = document.querySelector("#phrase ul");
        ul.innerHTML = "";
        const keyGroup = document.querySelectorAll(".key");
        for (let i = 0; i < keyGroup.length; i++) {
            keyGroup[i].className = "key";
            keyGroup[i].disabled = false;
        }
        const heartGroup = document.querySelectorAll(".tries img");
        const heartSource = "images/liveHeart.png";
        for (let i = 0; i < heartGroup.length; i++) {
            heartGroup[i].src = heartSource;
        }
    }


    /**
     * Checks for winning move
     * @return {boolean} True if game has been won, false if game wasn't won
     */
    checkForWin() {
        const hideGroup = document.querySelectorAll(".letter.hide");
        return hideGroup.length === 0;
    }


    /**
     * Displays game over message
     * @param {boolean} gameWon - Whether or not the user won the game 
     */
    gameOver(gameWon) {
        const overlay = document.querySelector("#overlay");
        const message = document.querySelector("#game-over-message");
        overlay.style.display = "";
        if (gameWon) {
            overlay.className = "win";
            message.textContent = "You Win!";
        }
        else {
            overlay.className = "lose";
            message.textContent = "Sorry, better luck next time!";
        }
    }


    /**
     * Increases the value of the missed property
     * Removes a life from the scoreboard
     * Checks if player has remaining lives and ends game if player is out
     */
    removeLife() {
        this.missed += 1;
        const imagePath = "images/lostHeart.png";
        if (this.missed === 5) {
            this.gameOver(false);
        }
        else {
            let heart = document.querySelector(".tries");
            while (heart.firstElementChild.src.indexOf(imagePath) >= 0) {
                heart = heart.nextElementSibling;
            }
            heart.firstElementChild.src = imagePath;
        }
    }


    /**
     * Handles onscreen keyboard button clicks
     * @param {HTMLButtonElement} button - The clicked button element
     */
    handleInteraction(button) {
        button.disabled = true;
        const guess = button.textContent;
        if (this.activePhrase.checkLetter(guess)) {
            button.classList.add("chosen");
            this.activePhrase.showMatchedLetter(guess);
            if (this.checkForWin()) {
                this.gameOver(true);
            }
        } else {
            button.classList.add("wrong");
            this.removeLife();
        }
    }
}