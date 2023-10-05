//imports
import { User } from "./user.js";
import { blur } from "./blur.js";

// sélection du DOM
const gameSelect = document.querySelector(".game-selector");
const shadowBox = document.querySelector("#shadow");
const blurBox = document.querySelector("#blur");
const playerSelector = document.querySelector(".player-selector");
const gameStart = document.querySelector(".game-start");
const mainGame = document.querySelector(".main-game");
const pkmnImg = document.querySelector("#pkmn-img");
const showResponses = document.querySelector(".show-respones");
const results = document.querySelector(".results");

// boutons users
const users = document.querySelector("#users");
const next = document.querySelector("#next");

// variables globales
let choiceMod = "";

//FUNCTION GAME CHOICE

function gameSelector() {

    shadowBox.addEventListener("click", () => {
        choiceMod = "shadow";
        console.log("shadow");
        ShowHidden(gameSelect, playerSelector);
    });
    
    blurBox.addEventListener("click", () => {
        choiceMod = "blur";
        pkmnImg.style.filter = "brightness(0)";
        console.log("blur");
        ShowHidden(gameSelect, playerSelector);
        
    });
}

function ShowHidden(target,nextTarget){
    target.classList.toggle("d-none");
    nextTarget.classList.toggle("d-none");
}

gameSelector();
