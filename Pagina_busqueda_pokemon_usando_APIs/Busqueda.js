//Garcia Gomez Eduardo Biali
const pokemonInput = document.getElementById('pokemonInput');
const searchHistoryContainer = document.getElementById('searchHistory');
const clearBtn = document.getElementById('clearBtn');

// Array para almacenar el historial de búsquedas
let searchHistory = [];

// Función asincrónica para obtener los datos del Pokémon
async function fetchPokemon(pokemonNameOrId) {
    if (!pokemonNameOrId) {
        pokemonNameOrId = pokemonInput.value.toLowerCase().trim();
    }

    if (!pokemonNameOrId) {
        alert('Por favor, ingresa un nombre o ID válido.');
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`);

        if (!response.ok) {
            throw new Error('Pokémon no encontrado');
        }

        const pokemonData = await response.json();

        // Obtener la descripción (flavor text) desde el endpoint species
        const speciesResponse = await fetch(pokemonData.species.url);
        const speciesData = await speciesResponse.json();

        // Obtener la región donde aparece el Pokémon
        const region = await mapLocationToRegion(await fetch(pokemonData.location_area_encounters).then(res => res.json()));

        // Mostrar los datos del Pokémon en la tarjeta
        displayPokemonInfo(pokemonData, speciesData, region);

        // Actualizar el historial de búsqueda
        updateSearchHistory(pokemonNameOrId);

    } catch (error) {
        document.getElementById('pokemonInfo').innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
    // Limpiar el campo de entrada de búsqueda
    pokemonInput.value = '';
}

// Función para mostrar la información completa del Pokémon en el card
function displayPokemonInfo(pokemon, species, region) {
    const pokemonInfoDiv = document.getElementById('pokemonInfo');

    // Obtener habilidades
    const abilities = pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');

    // Obtener tipos
    const types = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');

    // Obtener la primera descripción disponible en español
    const flavorText = species.flavor_text_entries.find(entry => entry.language.name === 'es')?.flavor_text
                      || species.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text;

    // Generar el HTML con la información
    const pokemonHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    `;

    // Actualizar el div con la imagen del Pokémon en el card
    pokemonInfoDiv.innerHTML = pokemonHTML;

    // Actualizar el nombre del Pokémon en el título del card
    document.querySelector('.card-title').textContent = pokemon.name.toUpperCase();

    // Actualizar el ID del Pokémon en el card
    document.querySelector('.pokemon-id').textContent = `ID: ${pokemon.id}`;

    // Actualizar la descripción del Pokémon en el card
    document.querySelector('.card-text').textContent = flavorText || 'Descripción no disponible.';

    // Actualizar las habilidades del Pokémon en el card
    const listItems = document.querySelectorAll('.list-group-item');
    if (listItems.length >= 3) {
        listItems[0].textContent = `Habilidad 1: ${pokemon.abilities[0]?.ability.name || 'No disponible'}`;
        listItems[1].textContent = `Habilidad 2: ${pokemon.abilities[1]?.ability.name || 'No disponible'}`;
        listItems[2].textContent = `Habilidad 3: ${pokemon.abilities[2]?.ability.name || 'No disponible'}`;
    }

    // Actualizar el tipo de Pokémon en el card
    const typeLink = document.querySelectorAll('.card-link')[0];
    typeLink.textContent = `Tipo: ${types}`;

    // Actualizar la región en el card
    const regionLink = document.querySelectorAll('.card-link')[1];
    regionLink.textContent = `Región: ${region || 'Desconocida'}`;
}

// Función para mapear las ubicaciones a una región
function mapLocationToRegion(encounters) {
    if (encounters.length === 0) {
        return 'No disponible';
    }

    // Intentar encontrar la región asociada con la primera ubicación de encuentro
    const locationAreaUrl = encounters[0].location_area.url;

    // Se hace una solicitud síncrona para obtener los datos de la ubicación, ent retorno una promesa para mantener la consistencia
    return fetch(locationAreaUrl)
        .then(response => response.json())
        .then(locationAreaData => {
            // Obtener el nombre de la región desde el área
            const regionName = locationAreaData.location.name;
            return capitalizeFirstLetter(regionName);
        })
        .catch(() => 'Desconocida'); // En caso de error se devuelve "Desconocida"
}

// Función para capitalizar la primera letra de una cadena
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Función para actualizar el historial de búsqueda
function updateSearchHistory(pokemonName) {
    // Agregar el nombre del Pokémon al inicio del historial
    searchHistory.unshift(pokemonName);

    // Limitar el historial a las últimas 5 búsquedas
    if (searchHistory.length > 5) {
        searchHistory.pop();
    }

    // Actualizar la lista
    renderSearchHistory();
}

// Función para mostrar el historial de búsqueda
function renderSearchHistory() {
    // Limpiar el historial mostrado
    searchHistoryContainer.innerHTML = '';

    // Mostrar cada elemento del historial
    searchHistory.forEach((pokemonName) => {
        const listItem = document.createElement('li');
        listItem.textContent = pokemonName;
        listItem.classList.add('list-group-item');
        listItem.style.cursor = 'pointer';

        // Hacer clic en un elemento del historial para buscar ese Pokémon
        listItem.addEventListener('click', () => {
            fetchPokemon(pokemonName);
        });

        searchHistoryContainer.appendChild(listItem);
    });
}

// Función para limpiar la información mostrada y el historial
function clearData() {
    // Limpiar la tarjeta de información del Pokémon
    document.getElementById('pokemonInfo').innerHTML = '';
    document.querySelector('.card-title').textContent = '';
    document.querySelector('.pokemon-id').textContent = '';
    document.querySelector('.card-text').textContent = '';
    const listItems = document.querySelectorAll('.list-group-item');
    listItems.forEach(item => item.textContent = '');
    document.querySelectorAll('.card-link').forEach(link => link.textContent = '');

    // Limpiar el historial
    searchHistory = [];
    renderSearchHistory();
}

// Agregar el evento al botón de búsqueda
document.getElementById('searchBtn').addEventListener('click', () => fetchPokemon());

// Agregar el evento al botón de limpiar
clearBtn.addEventListener('click', clearData);

// Buscar Pokémon al presionar Enter
pokemonInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        fetchPokemon();
    }
});
