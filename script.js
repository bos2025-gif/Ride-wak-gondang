const playerForm = document.getElementById('playerForm');
const playerList = document.getElementById('playerList');
const nameInput = document.getElementById('playerName');
const clearListBtn = document.getElementById('clearList');

// Load senarai dari LocalStorage
document.addEventListener('DOMContentLoaded', loadPlayers);

playerForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = nameInput.value.trim();

    if(name !== "") {
        addPlayer(name);
        savePlayer(name);
        nameInput.value = "";
    }
});

function addPlayer(name) {
    const placeholders = playerList.querySelectorAll('li');
    placeholders.forEach(li => {
        if(li.textContent === "-") li.remove();
    });

    const li = document.createElement('li');
    li.textContent = name;
    playerList.appendChild(li);
}

function savePlayer(name) {
    let players = JSON.parse(localStorage.getItem('players')) || [];
    players.push(name);
    localStorage.setItem('players', JSON.stringify(players));
}

function loadPlayers() {
    let players = JSON.parse(localStorage.getItem('players')) || [];
    if(players.length > 0) {
        playerList.innerHTML = "";
        players.forEach(name => addPlayer(name));
    }
}

clearListBtn.addEventListener('click', function() {
    if(confirm("Padam semua senarai peserta?")) {
        localStorage.removeItem('players');
        playerList.innerHTML = `
            <li>-</li>
            <li>-</li>
            <li>-</li>
            <li>-</li>
        `;
    }
});
