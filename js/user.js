export class User {
    name = "";
    score = 0;
    constructor(name, score = 0) {
        this.name = name;
        this.score = score;
    }
}

export function playerAdd() {
    const playerList = document.getElementById('playerList');
    const btnAddPlayer = document.getElementById('btnPlayerAdd');

    btnAddPlayer.addEventListener("click", function () {
        const playerNameInput = document.getElementById('playerAdd');
        const playerName = playerNameInput.value;

        if (playerName.trim() !== "") {
            // Créez une nouvelle div avec un input et un bouton "Supprimer" et ajoutez-la au conteneur
            const newDiv = document.createElement('div');

            // Ajoutez une classe à la nouvelle div
            newDiv.classList.add("caseJoueur");

            newDiv.innerHTML = `
                <i class="fa-solid fa-circle-user"></i>
                <input type="text" value="${playerName}" readonly >
                <button class="deletePlayer"><i class="fa-solid fa-delete-left"></i></button>
            `;

            // Ajoutez un gestionnaire d'événement pour le bouton "Supprimer"
            const deleteButton = newDiv.querySelector('.deletePlayer');
            deleteButton.addEventListener("click", function () {
                newDiv.remove();
            });

            playerList.appendChild(newDiv);

            // Réinitialisez la valeur de l'input
            playerNameInput.value = "";
        }
    });
    // Ajoutez un gestionnaire d'événements pour la touche "Entrée" dans le champ de texte
    const playerNameInput = document.getElementById('playerAdd');
    playerNameInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            // Déclenchez le clic sur le bouton "Ajouter"
            btnAddPlayer.click();
        }
    });
}

playerAdd();
