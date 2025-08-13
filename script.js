const playerForm = document.getElementById('playerForm');
const playerList = document.getElementById('playerList');
const nameInput = document.getElementById('playerName');

// Load senarai dari LocalStorage bila page dibuka
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
    // Buang placeholder "-" jika ada
    const placeholders = playerList.querySelectorAll('li');
    placeholders.forEach(li => {
        if(li.textContent === "-") li.remove();
    });

    // Tambah ke senarai
    const li = document.createElement('li');
    li.textContent = name;
    playerList.appendChild(li);
}

// Simpan senarai ke LocalStorage
function savePlayer(name) {
    let players = JSON.parse(localStorage.getItem('players')) || [];
    players.push(name);
    localStorage.setItem('players', JSON.stringify(players));
}

// Load senarai dari LocalStorage
function loadPlayers() {
    let players = JSON.parse(localStorage.getItem('players')) || [];
    if(players.length > 0) {
        playerList.innerHTML = ""; // Clear placeholder
        players.forEach(name => addPlayer(name));
    }
}