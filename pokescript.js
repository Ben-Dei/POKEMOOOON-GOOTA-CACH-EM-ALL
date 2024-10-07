let currentPokemonIndex = 0;
let pokeDataList = [];

function init() {
    blueCircle();
    renderPokemonInfo();
}

function blueCircle() {
    let blueLight = document.getElementById('blue-light');
    blueLight.style.backgroundColor = 'blue';
}

function getTypeColor(type) {
    let typeColors = {
        fire: 'orange',
        water: '#4682B4',
        grass: '#9ACD32',
        electric: 'yellow',
        ice: '#00FFFF',
        fighting: 'black',
        poison: '#BA55D3',
        ground: 'brown',
        rock: 'grey',
        flying: '#B0E0E6',
        bug: 'olive',
        psychic: 'pink',
        ghost: 'indigo',
        dragon: 'darkblue',
        dark: 'black',
        steel: 'lightgrey',
        fairy: 'pink'
    };
    return typeColors[type] || 'grey'; 
}

async function renderPokemonInfo() {
    let pokecards = await fetch("https://pokeapi.co/api/v2/pokemon?limit=34&offset=0");
    let pokeResponse = await pokecards.json();
    pokeDataList = [...pokeDataList, ...pokeResponse.results];
    let content = document.getElementById('PokeScreen');
    content.innerHTML = "";

    for (let pokeIndex = 0; pokeIndex < pokeResponse.results.length; pokeIndex++) {
        let singlePokemon = await specificPokemonData(pokeResponse.results[pokeIndex].url);
        let firstType = singlePokemon.types[0].type.name.charAt(0).toUpperCase() + singlePokemon.types[0].type.name.slice(1);
        let firstTypeCardColor =  getTypeColor(singlePokemon.types[0].type.name);
        let secondType = singlePokemon.types.length > 1 ? singlePokemon.types[1].type.name.charAt(0).toUpperCase() + singlePokemon.types[1].type.name.slice(1) : null;
        let secondTypeCardColor = secondType ? getTypeColor(singlePokemon.types[1].type.name) : null;

        let firstTypeColor = getTypeColor(firstType);
        let secondTypeColor = secondType ? getTypeColor(secondType) : firstTypeColor;

        let backgroundStyle = secondType 
        ? `background: linear-gradient(45deg, ${firstTypeColor}, ${secondTypeColor});`
        : `background-color: ${firstTypeColor};`;

content.innerHTML += /*html*/ `
            <div class="pokeCard" onclick="morePokemonData(${pokeIndex})">
                <div>${pokeResponse.results[pokeIndex].name.charAt(0).toUpperCase() + pokeResponse.results[pokeIndex].name.slice(1)}</div>
                        <img src="${singlePokemon.sprites.front_default}">
                <div>
                    <div class="type" style="background-color:${firstTypeCardColor}">${firstType}</div>
                    ${secondType ? `<div class="type" style="background-color:${secondTypeCardColor}">${secondType}</div>` : ''}
                </div>
            </div>
        `;
    }

}

async function specificPokemonData(url) {
    let singlePokemonData = await fetch(url);
    let singlePokemonResponse = await singlePokemonData.json();
    return singlePokemonResponse;
}

async function morePokemonData(pokeIndex) {
    currentPokemonIndex = pokeIndex; 
    let singlePokemon = await specificPokemonData(pokeDataList[currentPokemonIndex].url);

    let firstType = singlePokemon.types[0].type.name;
    let secondType = singlePokemon.types.length > 1 ? singlePokemon.types[1].type.name : null;
            
    let firstTypeColor = getTypeColor(firstType);
    let secondTypeColor = secondType ? getTypeColor(secondType) : firstTypeColor;

    let backgroundStyle = secondType 
    ? `background: linear-gradient(45deg, ${firstTypeColor}, ${secondTypeColor});`
    : `background-color: ${firstTypeColor};`;

    let overlayContent = document.getElementById('overlay-content');
    overlayContent.innerHTML = `
        <div style="${backgroundStyle}">
            <img class="pokeImg" src="${singlePokemon.sprites.front_default}" alt="${singlePokemon.name}">
            <p>#${singlePokemon.id} ${singlePokemon.name.charAt(0).toUpperCase() + singlePokemon.name.slice(1)}</p>
            <div>Type: ${singlePokemon.types.map(t => t.type.name).join(', ')}</div>
            <div>Height: ${(singlePokemon.height / 10).toFixed(1)} m</div>
            <div>Weight: ${(singlePokemon.weight / 10).toFixed(1)} kg</div>
            <div>Base Experience: ${singlePokemon.base_experience}</div>
            <div>Abilities: ${singlePokemon.abilities.map(a => a.ability.name).join(', ')}</div>
        </div>
        <div>
            <button class="btn" onclick="prevPokemon()">back</button>
            <button class="btn" onclick="nextPokemon()">next</button>
        </div>    
    `;

    document.getElementById('poke-details').style.display = 'flex';
}

function closeOverlay() {
    document.getElementById('poke-details').style.display = 'none';
}



async function nextPokemon() {
    if (currentPokemonIndex < pokeDataList.length - 1) {currentPokemonIndex++;
        morePokemonData(currentPokemonIndex);
    }
}

async function prevPokemon() {
    if (currentPokemonIndex > 0) { 
        currentPokemonIndex--;
        morePokemonData(currentPokemonIndex);
    }
}