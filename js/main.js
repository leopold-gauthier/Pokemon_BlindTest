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
const showBtn = document.querySelector("#showBtn");
const results = document.querySelector(".results");
const gameTitle = document.querySelector("#gameTitle");
// boutons
const start = document.querySelector("#btnStart");
const rdy = document.querySelector("#btnGo");

// variables
let users = []; // Tableau pour stocker les instances de la classe User
let choiceMod = "";
let isClicked = false;
//FUNCTION GAME CHOICE

function ShowHidden(target, nextTarget) {
  target.classList.toggle("d-none");
  nextTarget.classList.toggle("d-none");
}

function gameSelector() {
  blurBox.addEventListener("click", () => {
    choiceMod = "blur";
    pkmnImg.style.filter = "blur(40)";
    gameTitle.textContent = "Jeu : Pokémon Flou"; // Définit le titre du jeu
    console.log("blur");
    ShowHidden(gameSelect, playerSelector);
  });

  shadowBox.addEventListener("click", () => {
    choiceMod = "shadow";
    pkmnImg.classList.add("shadow");
    gameTitle.textContent = "Jeu : Who's That Pokémon?"; // Définit le titre du jeu
    console.log("shadow");
    ShowHidden(gameSelect, playerSelector);
  });
}

// vue 1 -------
gameSelector();

playerAdd(users);

// FUNCTION DEMARRER SI IL Y'A PLUS DE DEUX JOUEURS

// vue 2 -------
function startGame() {
  start.addEventListener("click", () => {
    if (users.length >= 2) {
      ShowHidden(playerSelector, gameStart);
    }
  });
}

startGame();
// vue 3 -------
function ready() {
  rdy.addEventListener("click", () => {
    ShowHidden(gameStart, mainGame);
  });
}
ready();
// vue 4 -------
showBtn.addEventListener("click", () => (isClicked = true));
if (choiceMod == "blur") {
  blur(pkmnImg, showBtn);
} else {
  pkmnImg.classList.remove("shadow");
}

// vue 5 -------
