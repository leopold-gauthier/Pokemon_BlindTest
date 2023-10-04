//imports
import { ShowHidden } from "./showhidden";
import { gameSelector } from "./gameSelector";
import { User } from "./User";


// sélection du DOM
const gameSelector = document.querySelector(".game-selector");
const playerSelector = document.querySelector(".player-selector");
const gameStart = document.querySelector(".game-start");
const mainGame = document.querySelector(".main-game");
const pkmnImg = document.querySelector("#pkmn-img");
const showResponses = document.querySelector(".show-respones");
const results = document.querySelector(".results");

// boutons users
const users = document.querySelector("#users");
const next = document.querySelector("#next");