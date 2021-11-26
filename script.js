const listPokemon = document.getElementById('list');

let inicio = 1;
let fin = 151;

const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5' };

const main_types = Object.keys(colors);

const getPokemon = async (start, end) => {
  const pokeArr = [];
  for (let i = start; i <= end; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const result = await response.json();
    const types = result.types.map(type => type.type.name);
    const type = main_types.find(type => types.indexOf(type) > -1);
    const data = {
      id: result.id,
      name: result.name,
      types: type,
      color: colors[type],
      img: result.sprites['front_default'] };

    pokeArr.push(data);
  }
  pokemonCard(pokeArr);
};


const pokemonCard = arr => {
  return arr.map(pokemon => {

    const card = document.createElement('li');
    card.classList.add('pokemon-card');
    card.style.background = pokemon.color;

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-contianer');

    const image = document.createElement('img');
    image.src = pokemon.img;
    image.id = 'img-poke';
    imageContainer.append(image);

    const ide = document.createElement('h4');
    ide.innerText = "# " + pokemon.id;

    const name = document.createElement('h3');
    name.innerText = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

    const types = document.createElement('h6');
    types.innerText = "Type: " + pokemon.types;

    card.append(imageContainer, ide, name, types);
    listPokemon.append(card);



    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];

    image.onclick = function() {
    modal.style.display = "block";
    }

    span.onclick = function() {
    modal.style.display = "none";
    }

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    


  });
};
getPokemon(inicio, fin);


