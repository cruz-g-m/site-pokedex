const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.id
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    
    const stats = pokeDetail.stats.map((statSlot) => statSlot.base_stat)
    const [stat] = stats

    pokemon.stats = stats
    pokemon.stat = stat



    //const baseStats = pokeDetail.stats.base_stat
    //const [baseStat] = baseStats

   // pokemon.baseStats = baseStats
    //pokemon.baseStat = baseStat

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}


pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
     return fetch(url)
    .then((response) => response.json()) // pedido de converção do body para json
    .then((jsonBody) => jsonBody.results) //pegando do json a lista de results
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonDetails) => pokemonDetails)
    .catch((error) => console.log(error))
}
