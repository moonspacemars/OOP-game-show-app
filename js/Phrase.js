/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }


    /**
     * Display phrase on game board
     */
    addPhraseToDisplay() {
        const ul = document.querySelector("#phrase ul");
        let html = "";
        const str = this.phrase;
        for (let i = 0; i < str.length; i++) {
            if (str[i] === " ") {
                html += `<li class="space"> </li>`;
            }
            else {
                html += `<li class="hide letter ${str[i]}">${str[i]}</li>`;
            }
        }
        ul.innerHTML = html;
    }


    /**
     * Check if passed letter is in phrase
     * @param {string} letter - Letter to check 
     */
    checkLetter(letter) {
        const answer = this.phrase;
        for (let i = 0; i < answer.length; i++) {
            if (letter === answer[i]) {
                return true;
            }
        }
        return false;
    }


    /**
     * Displays passed letter on screen after a match is found
     * @param {string} letter - Letter to display 
     */
    showMatchedLetter(letter) {
        const matchGroup = document.querySelectorAll(`.${letter}`);
        for (let i = 0; i < matchGroup.length; i++) {
            matchGroup[i].classList.remove("hide");
            matchGroup[i].classList.add("show");
        }
    }
}
