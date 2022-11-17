

const pokeApi = {}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
}


pokeApi.getPokemons = (offset = 0, limit = 15) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offse=${offset}&limit=${limit}`;
     return fetch(url)
    .then((response) => response.json()) // pedido de converção do body para json
    .then((jsonBody) => jsonBody.results) //pegando do json a lista de results
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonDetails) => pokemonDetails)
    .catch((error) => console.log(error))
}

Promise.all([
    fetch('https://pokeapi.co/api/v2/pokemon/1'),
    fetch('https://pokeapi.co/api/v2/pokemon/2'),
    fetch('https://pokeapi.co/api/v2/pokemon/3'),
    fetch('https://pokeapi.co/api/v2/pokemon/4'),
    fetch('https://pokeapi.co/api/v2/pokemon/5'),
    fetch('https://pokeapi.co/api/v2/pokemon/6'),
    fetch('https://pokeapi.co/api/v2/pokemon/7')
]).then((results) =>{
    console.log(results)
})
