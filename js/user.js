export class User {
  name = "";
  score = 0;
  constructor(name, score = 0) {
    this.name = name;
    this.score = score;
  }
}

export function playerAdd(users) {
  const playerList = document.getElementById("playerList");
  const btnAddPlayer = document.getElementById("btnPlayerAdd");
  const playerNameInput = document.getElementById("playerAdd");

  btnAddPlayer.addEventListener("click", function () {
    addPlayer();
  });

  // Gestionnaire d'événement pour la touche Entrée dans le champ de texte
  playerNameInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addPlayer();
    }
  });

  function addPlayer() {
    const playerName = playerNameInput.value;

    if (playerName.trim() !== "") {
      // Créez une nouvelle instance de la classe User
      const newUser = new User(playerName);
      users.push(newUser); // Ajoutez l'instance au tableau

      // Créez une nouvelle div avec un input et un bouton "Supprimer" et ajoutez-la au conteneur
      const newDiv = document.createElement("div");

      // Ajoutez une classe à la nouvelle div
      newDiv.classList.add("caseJoueur");

      newDiv.innerHTML = `
                <i class="fa-solid fa-circle-user"></i>
                <input type="text" value="${newUser.name}" readonly >
                <button class="deletePlayer"><i class="fa-solid fa-delete-left"></i></button>
            `;

      // Ajoutez un gestionnaire d'événement pour le bouton "Supprimer"
      const deleteButton = newDiv.querySelector(".deletePlayer");
      deleteButton.addEventListener("click", function () {
        // Retirez l'instance de la classe User du tableau
        const index = users.indexOf(newUser);
        if (index !== -1) {
          users.splice(index, 1);
        }

        // Supprimez la div correspondante
        newDiv.remove();
        console.log(users);
        // Vous pouvez maintenant utiliser "newUser" ici si nécessaire
      });

      playerList.appendChild(newDiv);

      // Réinitialisez la valeur de l'input
      playerNameInput.value = "";
      console.log(users);
    }
  }
}
