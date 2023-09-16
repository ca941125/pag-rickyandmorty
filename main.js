//Obtención de los elementos del DOM
const genderFilter = document.getElementById('genderFilter');
const charactersContainer = document.querySelector('.characters');
const pageInfo = document.getElementById('pageInfo');
const firstPageButton = document.getElementById('firstPage');
const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');
const lastPageButton = document.getElementById('lastPage');

//Variables para el control de páginación
let currentPage = 1;
let totalPages;

//Solicitud a la API para obtener datos de los personajes
const fetchCharacters = (pageNumber, gender)=> {
    const apiUrl = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&gender=${gender}`;
    //Esto permite hacer una solicitud específica a la API para obtener los personajes y filtrarlos por género.
    fetch(apiUrl) //solicitud GET
    .then((res) => res.json())
    .then((data) => {
        totalPages = data.info.pages;//total de páginas disponibles en la API
        pageInfo.textContent = `${currentPage} - ${totalPages}`;//Se actualiza el contenido z
        displayCharacters(data.results);
    });
  }

//Esta función toma la lista de personajes obtenida de la API y la muestra en la página HTML, 
//limpia el contenido del contenedor de personajes y luego crea un elemento HTML para cada personaje y muestra sus detalles en la página
function displayCharacters(characters) {
    charactersContainer.innerHTML = '';
    characters.forEach(character => {
        const characterCard = document.createElement('div');
        characterCard.classList.add('character-card');
        characterCard.innerHTML = `
        <div class="character-one">
            <h2>${character.name}</h2>
            <ul>
                <li><p>Gender: ${character.gender}</p></li>
                <li><p>Species: ${character.species}</p></li>
                <li><p>Status: ${character.status}</p></li>
                <li><p>Origin: ${character.origin.name}</p></li>
                <li><p>Location: ${character.location.name}</p></li>
            </ul>
            <button id="toggle-button">See More</button>
        </div>
        <div class="character-two">
            <img src="${character.image}">
        </div>
        `;
        charactersContainer.appendChild(characterCard);
    });
}
//habilitar o deshabilitar los botones de paginación según la página actual y el número total de páginas
function updatePaginationButtons() {
    firstPageButton.disabled = currentPage === totalPages;
    prevPageButton.disabled = currentPage === totalPages;
    nextPageButton.disabled = currentPage === totalPages;
    lastPageButton.disabled = currentPage === totalPages;
}
//Cada escuchador de eventos llama a las funciones correspondientes para actualizar la página
//Filtro
genderFilter.addEventListener('change', () => {
    currentPage = 1;
    fetchCharacters(currentPage, genderFilter.value);
});
//Primera página
firstPageButton.addEventListener('click', () => {
    currentPage = 1;
    fetchCharacters(currentPage, genderFilter.value);
});
//Página anterior
prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchCharacters(currentPage, genderFilter.value);
    }
});
//Página siguiente
nextPageButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        fetchCharacters(currentPage, genderFilter.value);
    }
});
//Última página
lastPageButton.addEventListener('click', () => {
    currentPage = totalPages;
    fetchCharacters(currentPage, genderFilter.value);
});

// Inicia el fetch cuando la página termina de cargar 
fetchCharacters(currentPage, genderFilter.value);
updatePaginationButtons();
