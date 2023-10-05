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
    const users = []; // Tableau pour stocker les instances de la classe User

    btnAddPlayer.addEventListener("click", function () {
        const playerNameInput = document.getElementById('playerAdd');
        const playerName = playerNameInput.value;

        if (playerName.trim() !== "") {
            // Créez une nouvelle instance de la classe User
            const newUser = new User(playerName);
            users.push(newUser); // Ajoutez l'instance au tableau

            // Créez une nouvelle div avec un input et un bouton "Supprimer" et ajoutez-la au conteneur
            const newDiv = document.createElement('div');

            // Ajoutez une classe à la nouvelle div
            newDiv.classList.add("caseJoueur");

            newDiv.innerHTML = `
                <i class="fa-solid fa-circle-user"></i>
                <input type="text" value="${newUser.name}" readonly >
                <button class="deletePlayer"><i class="fa-solid fa-delete-left"></i></button>
            `;

            // Ajoutez un gestionnaire d'événement pour le bouton "Supprimer"
            const deleteButton = newDiv.querySelector('.deletePlayer');
            deleteButton.addEventListener("click", function () {
                // Retirez l'instance de la classe User du tableau
                const index = users.indexOf(newUser);
                if (index !== -1) {
                    users.splice(index, 1);
                }

                // Supprimez la div correspondante
                newDiv.remove();

                // Vous pouvez maintenant utiliser "newUser" ici si nécessaire
                console.log(newUser);
            });

            playerList.appendChild(newDiv);

            // Réinitialisez la valeur de l'input
            playerNameInput.value = "";
        }
    });
}

playerAdd();
