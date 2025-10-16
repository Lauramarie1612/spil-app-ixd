"use strict";

// Global variabel til alle spil
let allGames = [];

// #1: Initialize the app
function initApp() {
  console.log("initApp: games.js is running 🎮");
  getGames();

  // Event listeners for alle filtre
  document.querySelector("#search-input").addEventListener("input", filterGames);
  document.querySelector("#genre-select").addEventListener("change", filterGames);
  document.querySelector("#sort-select").addEventListener("change", filterGames);
  document.querySelector("#year-from").addEventListener("input", filterGames);
  document.querySelector("#year-to").addEventListener("input", filterGames);
  document.querySelector("#rating-from").addEventListener("input", filterGames);
  document.querySelector("#rating-to").addEventListener("input", filterGames);
  document.querySelector("#clear-filters").addEventListener("click", clearAllFilters);
}

// #2: Fetch games from JSON file
async function getGames() {
  const response = await fetch("https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/games.json");
  allGames = await response.json();
  console.log("📁 Games loaded:", allGames.length);
  populateGenreDropdown();
  displayGames(allGames);
}

// #3: Display all games
function displayGames(games) {
  const gameList = document.querySelector("#movie-list");
  gameList.innerHTML = "";

  if (games.length === 0) {
    gameList.innerHTML = '<p class="no-results">Ingen spil matchede dine filtre 😢</p>';
    return;
  }

  for (const game of games) {
    displayGame(game);
  }
}

// #4: Render a single game card
function displayGame(game) {
  const gameList = document.querySelector("#movie-list");

 const gameHTML = `
  <article class="game-card">
    <div class="game-header">
       <span class="game-tag ${game.difficulty ? game.difficulty.toLowerCase() : 'let'}">
    ${game.difficulty || "Let"}
  </span>
      <button class="fav-btn" aria-label="Gem som favorit">☆</button>
    </div>
    <img src="${game.image}" alt="${game.title}" class="game-image" />
    <div class="game-info">
      <h3 class="game-title">${game.title}</h3>
      <p class="game-genre">${Array.isArray(game.genre) ? game.genre.join(", ") : game.genre}</p>
      <div class="game-details">
        <p><span class="icon">👥</span> ${game.players ? `${game.players.min}-${game.players.max} personer` : ""}</p>
        <p><span class="icon">⏱️</span> ${game.playtime ? `${game.playtime} min.` : ""}</p>
      </div>
    </div>
  </article>
`;

  gameList.insertAdjacentHTML("beforeend", gameHTML);

  const newCard = gameList.lastElementChild;
  newCard.addEventListener("click", function () {
    console.log(`🎮 Klik på: "${game.title}"`);
    showGameModal(game);
  });

  newCard.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      showGameModal(game);
    }
  });
}

// #5: Udfyld genre-dropdown med alle unikke genrer
function populateGenreDropdown() {
  const genreSelect = document.querySelector("#genre-select");
  const genres = new Set();

  for (const game of allGames) {
    if (Array.isArray(game.genre)) {
      for (const g of game.genre) genres.add(g);
    } else if (typeof game.genre === "string" && game.genre.trim()) {
      genres.add(game.genre);
    }
  }

  genreSelect.innerHTML = '<option value="all">Alle genrer</option>';

  const sortedGenres = Array.from(genres).sort();
  for (const genre of sortedGenres) {
    genreSelect.insertAdjacentHTML("beforeend", `<option value="${genre}">${genre}</option>`);
  }

  console.log("🎭 Genres loaded:", sortedGenres.length);
}

// #6: Vis game i modal dialog
function showGameModal(game) {
  console.log("🎮 Åbner modal for:", game.title);

  const dialogContent = document.querySelector("#dialog-content");
  dialogContent.innerHTML = `
  <article class="game-modal">
    <button class="fav-btn modal-fav" aria-label="Gem som favorit">☆</button>
    <button id="close-dialog" aria-label="Luk">✕</button>

    <img src="${game.image}" alt="${game.title}" class="game-modal-image">

    <h2 class="game-modal-title">${game.title}</h2>
    <p class="game-location"><span class="icon">📍</span>Reol ${game.shelf || "?"}</p>

    <h3 class="game-section-title">Om spillet</h3>
    <p class="game-description">
      ${game.description || "Ingen beskrivelse tilgængelig."}
    </p>


    <div class="game-modal-bottom">
  <div class="game-modal-details">
    <p><span class="icon">🎭</span> ${Array.isArray(game.genre) ? game.genre.join(", ") : game.genre}</p>
    <p><span class="icon">👥</span> ${game.players ? `${game.players.min}-${game.players.max} personer` : "Ukendt antal spillere"}</p>
    <p><span class="icon">⏱️</span> ${game.playtime ? `${game.playtime} minutter` : "Ukendt spilletid"}</p>
  </div>

  <div class="game-logo">
    <img src="/movie-app/img/spilcafelogo.png" alt="Spilcaféen logo">
  </div>
</div>
`;


  document.querySelector("#movie-dialog").showModal();
}

// #7: Ryd alle filtre
function clearAllFilters() {
  console.log("🗑️ Rydder alle filtre");

  document.querySelector("#search-input").value = "";
  document.querySelector("#genre-select").value = "all";
  document.querySelector("#sort-select").value = "none";
  document.querySelector("#year-from").value = "";
  document.querySelector("#year-to").value = "";
  document.querySelector("#rating-from").value = "";
  document.querySelector("#rating-to").value = "";

  filterGames();
}

// #8: Komplet filtrering
function filterGames() {
  console.log("🔄 ===== STARTER FILTRERING =====");

  const searchValue = document.querySelector("#search-input").value.toLowerCase();
  const genreValue = document.querySelector("#genre-select").value;
  const sortValue = document.querySelector("#sort-select").value;
  const yearFrom = Number(document.querySelector("#year-from").value) || 0;
  const yearTo = Number(document.querySelector("#year-to").value) || 9999;
  const ratingFrom = Number(document.querySelector("#rating-from").value) || 0;
  const ratingTo = Number(document.querySelector("#rating-to").value) || 10;

  let filteredGames = allGames;

  if (searchValue) {
    filteredGames = filteredGames.filter(game =>
      game.title.toLowerCase().includes(searchValue)
    );
  }

  if (genreValue !== "all") {
    filteredGames = filteredGames.filter(game =>
      Array.isArray(game.genre)
        ? game.genre.includes(genreValue)
        : game.genre === genreValue
    );
  }

  if (yearFrom > 0 || yearTo < 9999) {
    filteredGames = filteredGames.filter(game =>
      game.year >= yearFrom && game.year <= yearTo
    );
  }

  if (ratingFrom > 0 || ratingTo < 10) {
    filteredGames = filteredGames.filter(game =>
      game.rating >= ratingFrom && game.rating <= ratingTo
    );
  }

  if (sortValue === "title") {
    filteredGames.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortValue === "year") {
    filteredGames.sort((a, b) => b.year - a.year);
  } else if (sortValue === "rating") {
    filteredGames.sort((a, b) => b.rating - a.rating);
  }

  displayGames(filteredGames);
}

// Start appen
initApp();
