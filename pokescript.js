
let currentPokemonIndex = 0;
let pokeDataList = [];
let totalPokemonCount = 0;



function init() {
    blueCircle();
    renderPokemonInfo();
}


function blueCircle() {
    let blueLight = document.getElementById('blue-light');
    blueLight.style.backgroundColor = 'blue';
}


function getTypeColor(type) {
    let typeColors = {fire: 'orange', water: '#4682B4', grass: '#9ACD32', electric: 'yellow', ice: '#00FFFF', fighting: 'red', poison: '#BA55D3', ground: '#CD7F32', rock: 'grey', flying: '#B0E0E6', bug: 'olive', psychic: 'pink', ghost: 'indigo', dragon: 'darkblue', dark: 'black', steel: 'lightgrey', fairy: 'pink'
    };
    return typeColors[type] || 'grey'; 
}


function getOverlayTypeColor(type){
    let overlayTypeColors = {Fire: 'orange', Water: '#4682B4', Grass: '#9ACD32', Electric: 'yellow', Ice: '#00FFFF', Fighting: 'red', Poison: '#BA55D3', Ground: '#CD7F32', Rock: 'grey', Flying: '#B0E0E6', Bug: 'olive', Psychic: 'pink', Ghost: 'indigo', Dragon: 'darkblue', Dark: 'black', steel: 'lightgrey', Fairy: 'pink'};
    return overlayTypeColors[type] || 'grey';
}   


function capitalize(str) {
    let firstLetter = str.charAt(0); 
    let restOfWord = str.slice(1);   
    return firstLetter.toUpperCase() + restOfWord; 
}


async function renderPokemonInfo() {
    let pokeResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=34&offset=${pokeDataList.length}`);
    let pokeData = await pokeResponse.json(); 
    pokeDataList.push(...pokeData.results);
    totalPokemonCount = pokeData.count; let content = document.getElementById('PokeScreen');

    for (let i = pokeDataList.length - pokeData.results.length; i < pokeDataList.length; i++) {
        let singlePokemon = await specificPokemonData(pokeDataList[i].url);
        let firstType = capitalize(singlePokemon.types[0].type.name)
        let firstTypeColor = getTypeColor(singlePokemon.types[0].type.name);
        let secondType = singlePokemon.types[1]?.type.name
        let secondTypeColor = secondType ? getTypeColor(secondType) : null;
        let backGroundStyle = secondType ? `background: linear-gradient(45deg, ${firstTypeColor}, ${secondTypeColor});` : `background-color: ${firstTypeColor};`;

        content.innerHTML += getRenderPokemonTemplate(i, capitalize, singlePokemon, firstTypeColor, firstType, secondTypeColor, secondType);
    }
}


async function specificPokemonData(url) {
    let singlePokemonData = await fetch(url);
    let singlePokemonResponse = await singlePokemonData.json();
    return singlePokemonResponse;
}


async function morePokemonData(pokeIndex) {
    currentPokemonIndex = pokeIndex; 
    let specificPokemon = await specificPokemonData(pokeDataList[pokeIndex].url);
    let firstType = capitalize(specificPokemon.types[0].type.name);
    let secondType = specificPokemon.types[1]?.type.name;
    let firstTypeColor = getOverlayTypeColor(firstType);
    let secondTypeColor = secondType ? getOverlayTypeColor(secondType) : firstTypeColor;
    let backGroundStyle = secondType ? `background: linear-gradient(45deg, ${firstTypeColor}, ${secondTypeColor});` : `background-color: ${firstTypeColor};`;
    let overlayContent = document.getElementById('overlay-content');
    overlayContent.innerHTML = getMorePokemonDataTemplate(backGroundStyle, specificPokemon, firstTypeColor);
    document.getElementById('poke-details').style.display = 'flex';
    
}


function closeOverlay() {
    document.getElementById('poke-details').style.display = 'none';
}


async function nextPokemon() {
    if (currentPokemonIndex < pokeDataList.length - 1) {
        currentPokemonIndex++;
        morePokemonData(currentPokemonIndex);
    }
    buttonVisibilityAtTheirRespectivEnd();
}


async function prevPokemon() {
    if (currentPokemonIndex > 0) { 
        currentPokemonIndex--;
        morePokemonData(currentPokemonIndex);
    }
    buttonVisibilityAtTheirRespectivEnd();
}


function buttonVisibilityAtTheirRespectivEnd(){
   letprevButton = document.getElementById('btn-prev');
   letnextButton = document.getElementById('btn-next');

   if ( currentPokemonIndex === 0){
    letprevButton.style.display = 'none';
    } else {
    letprevButton.style.display = 'flex';  
   }

   if(currentPokemonIndex >= pokeDataList.length){
    letnextButton.style.display = 'none';
   } else {
    letnextButton.style.display = 'flex';
   }
}



async function loadMorePokemon() {
    showLoadingScreen(true);
    await renderPokemonInfo();
    showLoadingScreen(false);
}


function showLoadingScreen(show) {
    let loadingScreen = document.getElementById('loading-screen');
    let loadbtn = document.getElementById('more')
    loadingScreen.style.display = show ? 'block' : 'none';
    if (show){
        loadingScreen.style.display = 'block'; 
        loadbtn.disabled = true;
    } else {
        loadingScreen.style.display = 'none';
        loadbtn.disabled = false
    }
}


function searchForPokemon(){
    let inputRef = document.getElementById('search_poke_data').value.toLowerCase();

    if(inputRef.length < 3) {
        alert('bitte mehr als 3 buchstaben eingeben')
        renderPokemonInfo();
    } else {
        let toSearchedPokemon = pokeDataList.filter(singlePokemon => singlePokemon.name.toLowerCase().includes(inputRef));
        renderSearchedPokemon(toSearchedPokemon);
    }
}


async function renderSearchedPokemon(toSearchedPokemon){    
    for (let i = pokeDataList.length - pokeData.results.length; i < pokeDataList.length; i++) {
        let singlePokemon = await specificPokemonData(pokeDataList[i].url);
        let firstType = capitalize(singlePokemon.types[0].type.name)
        let firstTypeColor = getTypeColor(singlePokemon.types[0].type.name);
        let secondType = singlePokemon.types[1]?.type.name
        let secondTypeColor = secondType ? getTypeColor(secondType) : null;
        let backGroundStyle = secondType ? `background: linear-gradient(45deg, ${firstTypeColor}, ${secondTypeColor});` : `background-color: ${firstTypeColor};`;

        content.innerHTML += getRenderPokemonTemplate(i, capitalize, singlePokemon, firstTypeColor, firstType, secondTypeColor, secondType);
    }
    toSearchedPokemon.innerHTML += getRenderPokemonTemplate(i, capitalize, singlePokemon, firstTypeColor, firstType, secondTypeColor, secondType);
}
