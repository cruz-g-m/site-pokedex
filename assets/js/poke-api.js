const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.order
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}


pokeApi.getPokemons = (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offse=${offset}&limit=${limit}`;
     return fetch(url)
    .then((response) => response.json()) // pedido de converção do body para json
    .then((jsonBody) => jsonBody.results) //pegando do json a lista de results
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonDetails) => pokemonDetails)
    .catch((error) => console.log(error))
}