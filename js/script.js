const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const buttonSearch = document.querySelector('.btn-search');

let unknownPokemon = '/images/unknown.png';
let searchPokemon = 1;

const fetchPokemon = async (pokemon) =>   {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    let testImage;
    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);
    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        if(data.id<650){
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        }
        if(data.id>649){
            if(testImage = data['sprites']['versions']['generation-v']['black-white']['front_default']){
                pokemonImage.src = testImage;
        } else {
            pokemonImage.src = unknownPokemon;
        }
    }
        searchPokemon = data.id;
        input.value = '';
    } else {
        pokemonImage.src = unknownPokemon;
        pokemonName.innerHTML = 'Not found :('
        pokemonNumber.innerHTML = '';
        input.value = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);