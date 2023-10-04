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
    const btnAddplayer = document.getElementById('btnPlayerAdd')

    btnAddplayer.addEventListener("click", function() {
        
            const playerNameInput = document.getElementById('playerAdd');
            const playerName = playerNameInput.value;
            
            if (playerName.trim() !== "") {
                // Créez une nouvelle div avec un input et ajoutez-la au conteneur
                const newDiv = document.createElement('div');
                newDiv.innerHTML = `<input type="text" value="${playerName}" readonly>`;
                playerList.appendChild(newDiv);
                
                // Réinitialisez la valeur de l'input
                playerNameInput.value = "";
            }
        
    });
}

playerAdd();
