//imports

import { User } from "./user.js";
// import { blur } from "./blur.js";
import { playerAdd } from "./user.js";

// sélection du DOM
const gameSelect = document.querySelector(".game-selector");
const shadowBox = document.querySelector("#shadow");
const blurBox = document.querySelector("#blur");
const playerSelector = document.querySelector(".player-selector");
const gameStart = document.querySelector(".game-start");
const mainGame = document.querySelector(".main-game");
const pkmnImg = document.querySelector("#pkmn-img");
const gameEnd = document.querySelector(".game-end");

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
const initialNumberBlur = 25;
let scoreMax = 10;
let currentPokemon = "";
//FUNCTION GAME CHOICE

function ShowHidden(target, nextTarget) {
  target.classList.toggle("d-none");
  nextTarget.classList.toggle("d-none");
}

function shadowOn() {
  pkmnImg.style.filter = "brightness(0)";
}

function blur(target) {
  let number = initialNumberBlur;
  target.style.filter = `blur(${number}px)`;
  const interval = setInterval(() => {
    number <= 0 || isClicked ? clearInterval(interval) : null;
    number -= 0.1;

    target.style.filter = `blur(${number}px)`;
    console.log(number);
  }, 100);
}

function effectsOff() {
  pkmnImg.style.filter = "none";
}
function gameSelector() {
  blurBox.addEventListener("click", () => {
    choiceMod = "blur";
    gameTitle.textContent = "Jeu : Pokémon Flou"; // Définit le titre du jeu
    console.log("blur");
    ShowHidden(gameSelect, playerSelector);
  });

  shadowBox.addEventListener("click", () => {
    choiceMod = "shadow";
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
  } else {
    const modalContent = `
  <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Erreur</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Veuillez ajouter au moins deux joueurs pour commencer a jouer.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
        </div>
      </div>
    </div>
  </div>
`;
    document.body.insertAdjacentHTML("beforeend", modalContent);
    const modalPlayer = new bootstrap.Modal(document.getElementById("myModal"));
    modalPlayer.show();
  }
});

// vue 3 -------

rdy.addEventListener("click", () => {
  ShowHidden(gameStart, mainGame);

  if (choiceMod == "blur") {
    blur(pkmnImg);
  } else {
    shadowOn();
  }

  // Utilisation de la fonction pour récupérer un Pokémon aléatoire
  findRandomPokemon()
    .then((randomPokemonData) => {
      pkmnImg.src = randomPokemonData.image;
      console.log("Pokémon aléatoire :", randomPokemonData);
      const pokemonResultDiv = document.getElementById("pokemon_result");
      pokemonResultDiv.textContent = randomPokemonData.name;
      const pokemonResultImg = document.getElementById("pkmn-imgresult");
      pokemonResultImg.src = randomPokemonData.image;
      currentPokemon = pokemonResultImg.src;
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
    // Génère un nombre aléatoire entre 1 et 493 (inclus)
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
// reset image et état du bouton
function resetImgState() {
  isClicked = false;
  pkmnImg.src = "";
}
showBtn.addEventListener("click", () => {
  isClicked = true;
  if (choiceMod == "blur") {
    blur(pkmnImg);
  } else {
    effectsOff();
  }
  ShowHidden(mainGame, results);
  const playersResultDiv = document.getElementById("players_result");

  // Efface le contenu précédent du div
  playersResultDiv.innerHTML = "";

  // Boucle sur le tableau d'utilisateurs
  for (const user of users) {
    // Crée un élément de paragraphe (<p>) pour afficher les informations de l'utilisateur
    const userParagraph = document.createElement("button");
    userParagraph.classList.add("listeResult");
    userParagraph.innerHTML = `Nom: ${user.name} <br> Score: ${user.score}`;

    // Ajoute le paragraphe au div
    playersResultDiv.appendChild(userParagraph);

    userParagraph.addEventListener("click", () => {
      user.score += 1;
      user.pokemon.push(currentPokemon);
      userParagraph.innerHTML = `Nom: ${user.name} <br> Score: ${user.score}`;
      resetImgState();
      if (user.score >= scoreMax) {
        users.sort((a, b) => b.score - a.score);

        // Trouvez le nom du vainqueur (le premier utilisateur trié)
        const vainqueur = users[0].name;

        // Mettez à jour la div "vainqueurDiv" avec le nom du vainqueur
        const vainqueurDiv = document.getElementById("vainqueurDiv");
        vainqueurDiv.innerHTML = `<p>Vainqueur :<BR> ${vainqueur}</p>`;

        ShowHidden(results, gameEnd);

        // Créez une nouvelle div pour afficher les utilisateurs triés
        const sortedUsersDiv = document.createElement("div");
        sortedUsersDiv.classList.add("sortedUsers");

        confetti({
          particleCount: 1000,
          startVelocity: 30,
          spread: 360,
          origin: {
            x: Math.random(),
            // since they fall down, start a bit higher than random
            y: Math.random() - 0.2
          }
        });

        confetti({
          particleCount: 1000,
          startVelocity: 30,
          spread: 360,
          origin: {
            x: Math.random(),
            // since they fall down, start a bit higher than random
            y: Math.random() - 0.2
          }
        });

        confetti({
          particleCount: 1000,
          startVelocity: 30,
          spread: 360,
          origin: {
            x: Math.random(),
            // since they fall down, start a bit higher than random
            y: Math.random() - 0.2
          }
        });

        confetti({
          particleCount: 1000,
          startVelocity: 30,
          spread: 360,
          origin: {
            x: Math.random(),
            // since they fall down, start a bit higher than random
            y: Math.random() - 0.2
          }
        });

        // Bouclez sur les utilisateurs triés et créez les éléments de paragraphe
        for (const sortedUser of users) {
          const userParagraph = document.createElement("p");
          userParagraph.innerHTML = `Nom: ${sortedUser.name} <br> Score: ${sortedUser.score}`;

          const divListResult = document.createElement("div");
          divListResult.append(userParagraph);
          sortedUser.pokemon.forEach((element) => {
            divListResult.innerHTML += `<img class="pokemon_icon" src="${element}"/>`;
          });
          sortedUsersDiv.append(divListResult);
        }

        // Ajoutez la div triée à la page
        gameEnd.appendChild(sortedUsersDiv);
      } else {
        ShowHidden(results, gameStart);
      }
    });
  }
});
// vue 5 -------

// vue 6 -------

next.addEventListener("click", () => {
  resetImgState();
  ShowHidden(results, gameStart);
});

console.log(users);

import confetti from "https://cdn.skypack.dev/canvas-confetti";
