/*
    Main JavaScript File for Wordle Clone
    Author: Cameron Line
    Created: 2/18/2022
    Updated:
*/


/**
 * Adds an event listener to the dom on contend load
 * Uses callback to create squares for the board
 * 
 * type: 'DOMContentLoaded'
 * listener: callback
 */
document.addEventListener("DOMContentLoaded", () => {

    // function calls
    makeSquares();

    // constants
    const WORDLENGTH = 5;


    // global variables
    let guessedWords = [[]];
    let word = "dodge";
    let guessedWordCt = 0;
    let currentOpenSpace = 1;
    const numOfWordsGuessed = guessedWords.length;

    const keys = document.querySelectorAll('.keyboard-row button');

    function getCurrentWord() {
        return guessedWords[numOfWordsGuessed - 1];
    }

    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter);

        if (!isCorrectLetter) {
            return '#f25042';
        }

        const letterAtIndex = word.charAt(index);
        const samePosition = (letterAtIndex === letter);

        if (samePosition) {
            return '#2cb67d';
        }
        
        return '#ff8906';
    }

    function updateCurrentLetter(letter) {
        const currentWord = getCurrentWord();

        if (currentWord && currentWord.length < 5) {
            currentWord.push(letter);
            //guessedWords[numOfWordsGuessed - 1] = currentWord;
            const currentOpenSpaceElement = document.getElementById(String(currentOpenSpace));
            currentOpenSpaceElement.textContent = letter;
            currentOpenSpace+=1;
        }
    }

    function deleteLetter() {
        const currentWord = getCurrentWord();

        if (currentWord.length > 0) {
            currentWord.pop();
            //guessedWords[numOfWordsGuessed - 1] = currentWord;
            const currentOpenSpaceElement = document.getElementById(String(currentOpenSpace-1));
            currentOpenSpaceElement.textContent = "";
            currentOpenSpace-=1;   
        }
    }

    function handleSubmitWord() {
        let currentWordArr = getCurrentWord();

        if (currentWordArr.length < 5) {
            window.alert("Word must be five letters long.");
            return;
        }

        currentWord = currentWordArr.join('');

        const firstLetterId = guessedWordCt * 5 + 1;
        const interval = 200;
        currentWordArr.forEach( (letter, index) => {
            setTimeout(() => {
                const tileColor = getTileColor(letter, index);
                const letterId = firstLetterId + index;
                const letterElement = document.getElementById(letterId);
                letterElement.classList.add("animate__flipInX");
                letterElement.style = `background-color:${tileColor};color:#fff`;
            }, interval * index);
        });

        if (currentWord === word) {
            window.alert("Congrats!");
        }

        if (guessedWords.length === 6) {
            window.alert(`You lost. The word was ${word}.`)
        }

        guessedWords.push([]);
        guessedWordCt++;
    }

    function makeSquares() {
        const board = document.getElementById("board");

        for (let index = 0; index < 30; index++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated");
            square.setAttribute("id", index + 1);
            board.appendChild(square);
        }
    }

    for (let index = 0; index < keys.length; index++) {
        keys[index].onclick = ({target}) => {
            let letter = target.getAttribute('data-key');

            if (letter === 'enter') {
                handleSubmitWord();
                return;
            }
            else if (letter === 'delete') {
                deleteLetter();
                return;
            }

            updateCurrentLetter(letter);
        };
        
    }

    // key presses
    document.addEventListener("keydown", handleKeyPress);

    function handleKeyPress (e) {
        if (e.key === "Enter") {
            handleSubmitWord();
            return;
        }

        if (e.key === "Backspace" || e.key === "Delete") {
            deleteLetter();
            return;
        }

        if (e.key.match(/^[a-z]$/)) {
            updateCurrentLetter(e.key);
            return;
        }    

    }
});