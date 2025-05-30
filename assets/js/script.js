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
      console.log(data); // Para ver la estructura de la respuesta en consola

      const personajes = data.items || data;

      if (!Array.isArray(personajes) || personajes.length === 0) {
        resultsDiv.textContent = "No se encontraron personajes con ese nombre.";
        return;
      }

      resultsDiv.innerHTML = "";

      const row = document.createElement("div");
      row.classList.add("row");

      personajes.forEach(personaje => {
        const col = document.createElement("div");
        col.classList.add("col-md-3", "mb-4");

        col.innerHTML = `
          <div class="p-3 border rounded text-center bg-light h-100">
            <h5>${personaje.name}</h5>
            <img src="${personaje.image}" alt="${personaje.name}" class="img-fluid rounded mb-2" style="max-height: 200px;">
            <p><strong>Raza:</strong> ${personaje.race}</p>
            <p><strong>Género:</strong> ${personaje.gender}</p>
          </div>
        `;

        row.appendChild(col);
      });

      resultsDiv.appendChild(row);

    } catch (error) {
      resultsDiv.textContent = "Ocurrió un error al consultar la API. Inténtalo de nuevo más tarde.";
      console.error(error);
    }
  });

  // Botón "Ver Todos"
  verTodosBtn.addEventListener("click", async function () {
    resultsDiv.innerHTML = "Cargando todos los personajes...";

    try {
      const response = await fetch("https://dragonball-api.com/api/characters");

      if (!response.ok) {
        throw new Error("Error al consultar la API");
      }

      const data = await response.json();
      console.log(data); // Para ver la estructura de la respuesta

      const personajes = data.items || data;

      if (!Array.isArray(personajes) || personajes.length === 0) {
        resultsDiv.textContent = "No se encontraron personajes.";
        return;
      }

      resultsDiv.innerHTML = "";

      const row = document.createElement("div");
      row.classList.add("row");

      personajes.forEach(personaje => {
        const col = document.createElement("div");
        col.classList.add("col-md-3", "mb-4");

        col.innerHTML = `
          <div class="p-3 border rounded text-center bg-light h-100">
            <h5>${personaje.name}</h5>
            <img src="${personaje.image}" alt="${personaje.name}" class="img-fluid rounded mb-2" style="max-height: 200px;">
            <p><strong>Raza:</strong> ${personaje.race}</p>
            <p><strong>Género:</strong> ${personaje.gender}</p>
          </div>
        `;

        row.appendChild(col);
      });

      resultsDiv.appendChild(row);

    } catch (error) {
      resultsDiv.textContent = "Ocurrió un error al cargar los personajes.";
      console.error(error);
    }
  });
});
