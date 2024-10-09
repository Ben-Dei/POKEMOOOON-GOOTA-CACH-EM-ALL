function getRenderPokemonTemplate(i, capitalize, singlePokemon, firstTypeColor, firstType, secondTypeColor, secondType){
    return /*html*/`
            <div class="pokeCard" onclick="morePokemonData(${i})">
                <div>${capitalize(pokeDataList[i].name)}</div>
                <img src="${singlePokemon.sprites.front_default}">
                <div class="type" style="background-color:${firstTypeColor}">${firstType}</div>
                ${secondType ? `<div class="type" style="background-color:${secondTypeColor}">${capitalize(secondType)}</div>` : ''} </div>`;
}
function getMorePokemonDataTemplate(backGroundStyle, specificPokemon, firstTypeColor){
   return /*html*/ `
        <div style="${backGroundStyle}">
            <img class="pokeImg" src="${specificPokemon.sprites.front_default}" alt="${specificPokemon.name}">
            <p>#${specificPokemon.id} ${capitalize(specificPokemon.name)}</p>
            <div>Type: ${specificPokemon.types.map(t => t.type.name).join(', ')}</div>
            <div>Height: ${(specificPokemon.height / 10).toFixed(1)} m</div>
            <div>Weight: ${(specificPokemon.weight / 10).toFixed(1)} kg</div>
            <div>Base Experience: ${specificPokemon.base_experience}</div>
            <div>Abilities: ${specificPokemon.abilities.map(a => a.ability.name).join(', ')}</div></div>
        <div><button id="btn-prev" onclick="prevPokemon()">back</button><button id="btn-next" onclick="nextPokemon()">next</button></div>`;
}