const form = document.getElementById('searchForm');
const input = document.getElementById('characterName');
const resultsDiv = document.getElementById('results');

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const busquedaBlanca = input.value.trim();

    if (busquedaBlanca === "") {
        resultsDiv.textContent = "por favor ingresa un nombre para poder buscarlo"
        return;
    }
    resultsDiv.textContent = "";
});