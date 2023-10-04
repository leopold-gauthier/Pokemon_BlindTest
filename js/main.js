//imports
import { User } from "./user.js";


// sélection du DOM
const gameSelect = document.querySelector(".game-selector");
const playerSelector = document.querySelector(".player-selector");
const gameStart = document.querySelector(".game-start");
const mainGame = document.querySelector(".main-game");
const pkmnImg = document.querySelector("#pkmn-img");
const showResponses = document.querySelector(".show-respones");
const results = document.querySelector(".results");

// boutons users
const users = document.querySelector("#users");
const next = document.querySelector("#next");

//FUNCTION GAME CHOICE

function gameSelector() {
    const shadowBox = document.querySelector("#shadow");
    const blurBox = document.querySelector("#blur");
    const pkmn_img = document.querySelector("#pkmn-img");

    shadowBox.addEventListener("click", () => {
        pkmn_img.classList.add("shadow");
        console.log("shadow");
        ShowHidden(gameSelect, playerSelector);
        });

    blurBox.addEventListener("click", () => {
        pkmn_img.classList.add("blur");
        console.log("blur");
        ShowHidden(gameSelect, playerSelector);
        
    });
}

function ShowHidden(target,nextTarget){
    target.classList.toggle("d-none");
    nextTarget.classList.toggle("d-none");
}


gameSelector();

