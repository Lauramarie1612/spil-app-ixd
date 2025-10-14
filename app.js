"use strict";


// #1: Initialize the app - sæt event listeners og hent data
function initApp() {
  getMovies(); // Hent film data fra JSON fil


  // Event listeners for alle filtre - kører filterMovies når brugeren ændrer noget
  document.querySelector("#search-input").addEventListener("input", filterMovies);
  document.querySelector("#genre-select").addEventListener("change", filterMovies);
  document.querySelector("#sort-select").addEventListener("change", filterMovies);


  // Event listener for clear-knappen - rydder alle filtre
  document.querySelector("#clear-filters").addEventListener("click", clearAllFilters);
}


// ========== ASYNC MOVIE LOADER ==========


async function loadgames() {
  console.log("🚀 Starter hentning af movie data...");


  // Vent på at få response fra serveren
  const response = await fetch("https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/games.json"
  );


  console.log("📡 Response modtaget:", response);


  // Vent på at konvertere response til JavaScript objekter
  const gamesFromJSON = await response.json();


  console.log("games fra JSON:", gamesFromJSON);
  console.log("Antal games:", gamesFromJSON.length);
  console.log("Første game:", gamesFromJSON[0]);


  return gamesFromJSON;
}


// Kald funktionen
loadgames();
