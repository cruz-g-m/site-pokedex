const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const detalheButton = document.getElementById('detalheButton')


const maxRecords = 151
const limit = 151
let offset = 0;


function convertPokemonToLi(pokemon) {
    return ` 
            
            <li class="pokemon ${pokemon.type}">  
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <div class="statsCollum">
            <ol class="nameStats">
            <li clss="nameStat">Hp</li>
            <li clss="nameStat">Attack</li>
            <li clss="nameStat">Defense</li>
            <li clss="nameStat">Special-Attack</li>
            <li clss="nameStat">Special-Defense</li>
            <li clss="nameStat">Speed</li>
            </ol>
            <ol class="stats">
            ${pokemon.stats.map((stat) => `<li class="stat ${stat}"> ${stat} </li>`).join('')}
            </ol>
            </div>
        </li>
        
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

//loadMoreButton.addEventListener('click', () => {
    //offset += limit
    
    //const qtdRecordNextPage = offset + limit

    //if(qtdRecordNextPage >= maxRecords){
      //  const newLimit =  maxRecords - offset
      //  loadPokemonItens(offset, newLimit)
        
       // loadMoreButton.parentElement.removeChild(loadMoreButton)

   // } else {
    //        loadPokemonItens(offset, limit)
   // }

//})



function pesquisar_pokemons() {
    let input = document.getElementById('barrapesquisa').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('pokemon');
      
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="list-item";                 
        }
    }
}



