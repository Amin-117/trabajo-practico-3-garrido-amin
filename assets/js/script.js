document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('searchForm');
  const input = document.getElementById('characterName');
  const resultsDiv = document.getElementById('results');
  const verTodosBtn = document.getElementById('verTodos');

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nombre = input.value.trim();

    if (nombre === "") {
      resultsDiv.textContent = "Por favor ingresa un nombre para poder buscarlo.";
      return;
    }

    resultsDiv.textContent = "";

    try {
      const response = await fetch(`https://dragonball-api.com/api/characters?name=${nombre}`);

      if (!response.ok) {
        throw new Error("Error al consultar la API");
      }

      const data = await response.json();

      const personajes = data.items;

      if (personajes.length === 0) {
        resultsDiv.textContent = "No se encontraron personajes con ese nombre.";
        return;
      }

      resultsDiv.innerHTML = "";

      personajes.forEach(personaje => {
        const personajeDiv = document.createElement("div");
        personajeDiv.classList.add("mb-4", "p-3", "border", "rounded");

        personajeDiv.innerHTML = `
          <h5>${personaje.name}</h5>
          <img src="${personaje.image}" alt="${personaje.name}" class="img-fluid rounded" style="max-width:150px;">
          <p><strong>Raza:</strong> ${personaje.race}</p>
          <p><strong>Género:</strong> ${personaje.gender}</p>
        `;

        resultsDiv.appendChild(personajeDiv);
      });

    } catch (error) {
      resultsDiv.textContent = "Ocurrió un error al consultar la API. Inténtalo de nuevo más tarde.";
      console.error(error);
    }
  });

  // Código del botón Ver Todos
  verTodosBtn.addEventListener("click", async function () {
    resultsDiv.innerHTML = "Cargando todos los personajes...";

    try {
      const response = await fetch("https://dragonball-api.com/api/characters");

      if (!response.ok) {
        throw new Error("Error al consultar la API");
      }

      const data = await response.json();
      const personajes = data.items;

      if (personajes.length === 0) {
        resultsDiv.textContent = "No se encontraron personajes.";
        return;
      }

      resultsDiv.innerHTML = "";

      personajes.forEach(personaje => {
        const personajeDiv = document.createElement("div");
        personajeDiv.classList.add("mb-4", "p-3", "border", "rounded");

        personajeDiv.innerHTML = `
          <h5>${personaje.name}</h5>
          <img src="${personaje.image}" alt="${personaje.name}" class="img-fluid rounded" style="max-width:150px;">
          <p><strong>Raza:</strong> ${personaje.race}</p>
          <p><strong>Género:</strong> ${personaje.gender}</p>
        `;

        resultsDiv.appendChild(personajeDiv);
      });

    } catch (error) {
      resultsDiv.textContent = "Ocurrió un error al cargar los personajes.";
      console.error(error);
    }
  });
});
