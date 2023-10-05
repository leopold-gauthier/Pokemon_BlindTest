//imports

import { User } from "./user.js";
import { blur } from "./blur.js";
import { playerAdd } from "./user.js";

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
const gameTitle = document.querySelector("#gameTitle");
// boutons users
const users = document.querySelector("#users");
const next = document.querySelector("#next");

// variables globales
let choiceMod = "";

//FUNCTION GAME CHOICE

function gameSelector() {

    blurBox.addEventListener("click", () => {
        choiceMod = "blur";
        pkmnImg.classList.add("blur");
        gameTitle.textContent = "Jeu : Pokémon Flou"; // Définit le titre du jeu
        console.log("blur");
        ShowHidden(gameSelect, playerSelector);

    });

    shadowBox.addEventListener("click", () => {
        choiceMod = "shadow";
        pkmnImg.style.filter = "brightness(0)";
        pkmnImg.classList.add("shadow");
        gameTitle.textContent = "Jeu : Who's That Pokémon?"; // Définit le titre du jeu
        console.log("shadow");
        ShowHidden(gameSelect, playerSelector);
    });
    
}

function ShowHidden(target, nextTarget) {
    target.classList.toggle("d-none");
    nextTarget.classList.toggle("d-none");
}

gameSelector();
