let personajesGuardados = [];

async function buscarPersonajes(nombre = "") {
  let url = "https://dragonball-api.com/api/characters";
  if (nombre.trim() !== "") {
    url += `?name=${nombre}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al consultar la API");
    const data = await response.json();
    const personajes = data.items || data;
    return personajes;
  } catch (error) {
    throw error;
  }
}

function renderizarPersonajes(personajes) {
  const resultsDiv = document.getElementById('results');
  limpiarResultados();

  if (!personajes || personajes.length === 0) {
    resultsDiv.textContent = "No se encontraron personajes.";
    return;
  }

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
}

function limpiarResultados() {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = "";
}

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('searchForm');
  const input = document.getElementById('characterName');
  const verTodosBtn = document.getElementById('verTodos');
  const resultsDiv = document.getElementById('results');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const nombre = input.value.trim();

    if (nombre === "") {
      resultsDiv.textContent = "Por favor ingresa un nombre para buscar.";
      return;
    }

    try {
      const personajes = await buscarPersonajes(nombre);
      personajesGuardados = personajes;  // Guardamos los personajes
      renderizarPersonajes(personajes);
    } catch (error) {
      resultsDiv.textContent = "Ocurrió un error al consultar la API.";
      console.error(error);
    }
  });

  verTodosBtn.addEventListener('click', async function () {
    resultsDiv.textContent = "Cargando personajes...";
    try {
      const personajes = await buscarPersonajes();
      personajesGuardados = personajes;  // Guardamos los personajes
      renderizarPersonajes(personajes);
    } catch (error) {
      resultsDiv.textContent = "Ocurrió un error al cargar los personajes.";
      console.error(error);
    }
  });
});
