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

const showBtn = document.querySelector("#showBtn");
const results = document.querySelector(".results");
const gameTitle = document.querySelector("#gameTitle");
// boutons
const start = document.querySelector("#btnStart");
const rdy = document.querySelector("#btnGo");
const next = document.querySelector("#next");
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
    pkmnImg.style.filter = "blur(50)";
    gameTitle.textContent = "Jeu : Pokémon Flou"; // Définit le titre du jeu
    console.log("blur");
    ShowHidden(gameSelect, playerSelector);
  });

  shadowBox.addEventListener("click", () => {
    choiceMod = "shadow";
    pkmnImg.style.filter = "brightness(0)";
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

start.addEventListener("click", () => {
  if (users.length >= 2) {
    ShowHidden(playerSelector, gameStart);
  }
});

// vue 3 -------

rdy.addEventListener("click", () => {
  ShowHidden(gameStart, mainGame);

  if (choiceMod == "blur") {
    blur(pkmnImg, showBtn);
  }

  // Utilisation de la fonction pour récupérer un Pokémon aléatoire
  findRandomPokemon()
    .then((randomPokemonData) => {
      pkmnImg.src = randomPokemonData.image;
      console.log("Pokémon aléatoire :", randomPokemonData);
    })
    .catch((error) => {
      console.error(
        "Une erreur s'est produite lors de la récupération du Pokémon :",
        error
      );
    });
});

// vue 4 -------
async function findRandomPokemon() {
  try {
    // Génère un nombre aléatoire entre 1 et 151 (inclus)
    const randomPokemonNumber = Math.floor(Math.random() * 151) + 1;
    const apiUrl = `https://pokebuildapi.fr/api/v1/pokemon/${randomPokemonNumber}`;

    // Récupère les données JSON de l'API en utilisant le numéro généré aléatoirement
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("La requête vers l'API a échoué.");
    }

    const data = await response.json();

    return data; // Retourne les données du Pokémon aléatoire
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
  }
}

showBtn.addEventListener("click", () => {
  isClicked = true;
  if (choiceMod == "blur") {
    blur(pkmnImg, showBtn);
  } else {
    pkmnImg.style.filter = "none";
  }
  ShowHidden(mainGame, results);
});
// vue 5 -------
next.addEventListener("click", () => {
  ShowHidden(results, gameStart);
});
