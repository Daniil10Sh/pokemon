const form = document.getElementById("search-form"); 
const inputPokeId = document.getElementById("pokemon-id"); 
const button = document.getElementById("search-button"); 
const container = document.getElementById("pokemon-container"); 
 

 
async function getPokemonFetchData(event) {
  event.preventDefault(); //Запобігає автоматичному оновленню сторінки 
  const value = inputPokeId.value //отримуємо значення інпуту 
  console.log(value) 
  if(value) { //Якщо в інпуті введено значення  
    try { 
    const getDataApiSave = await getDataApi(value)
    displayPokemonDate(getDataApiSave) 
    inputPokeId.value = '' 
    } catch(error) { 
    errors(error.message)
    } 
  } 
} 
// getPokemonFetchData() 
 
async function getDataApi(name) { 
  const pokeApi = `https://pokeapi.co/api/v2/pokemon/${name}`; 
  const responseApi = await fetch(pokeApi) 
  if (!responseApi.ok) { 
    throw new Error(`Could not fetch data for ${name}:responseApi.statusText`); 
  } 
  return responseApi.json()  
} 
 
function displayPokemonDate(pokemon) { 
  console.log('display')
  const layout = ` 
    <div> 
    <p>name: ${pokemon.name}</p>
        <p>height: ${pokemon.height}</p> 
        <p>weight: ${pokemon.weight}</p> 
        <img src='${pokemon.sprites.front_default}'/> 
        
    </div> 
    
    `; 
    container.innerHTML = layout;
}



function errors(error) {
    container.innerHTML = `
    <p>type: ${error}</p> 
    `
}

form.addEventListener('submit', getPokemonFetchData)
