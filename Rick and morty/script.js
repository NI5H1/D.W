let allCharacters = [];
let displayedCharacters = 0;

function fillCharacterArticles(characters, clear = false) {
  const container = document.querySelector('.carta-pj');
  if (clear) {
    container.innerHTML = '';
  }

  characters.forEach((character) => {
    const article = document.createElement('article');
    article.classList.add('pj');
    article.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <h2>${character.name}</h2>
      <h3>${character.status}</h3>
    `;
    container.appendChild(article);
  });
}

function displayInitialCharacters() {
  const initialCharacters = allCharacters.slice(0, 12);
  fillCharacterArticles(initialCharacters);
  displayedCharacters = 12;
}

function displayMoreCharacters() {
  const nextCharacters = allCharacters.slice(displayedCharacters, displayedCharacters + 12);
  fillCharacterArticles(nextCharacters);
  displayedCharacters += 12;
}

function getMoreCharacters(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      allCharacters = allCharacters.concat(data.results);
      if (displayedCharacters === 0) {
        displayInitialCharacters();
      }
      if (data.info.next) {
        getMoreCharacters(data.info.next);
      }
    })
    .catch(error => {
      console.error('Hubo un error al obtener los datos:', error);
    });
}

fetch('https://rickandmortyapi.com/api/character/')
  .then(response => response.json())
  .then(data => {
    allCharacters = data.results;
    displayInitialCharacters();
    if (data.info.next) {
      getMoreCharacters(data.info.next);
    }
  })
  .catch(error => {
    console.error('Hubo un error al obtener los datos:', error);
  });

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', function() {
  const searchTerm = this.value.trim().toLowerCase();
  const filteredCharacters = allCharacters.filter(character =>
    character.name.toLowerCase().includes(searchTerm)
  );
  fillCharacterArticles(filteredCharacters, true);
});

const loadMoreBtn = document.createElement('button');
loadMoreBtn.id = 'load-more-btn';
loadMoreBtn.textContent = 'Cargar más';
loadMoreBtn.style.display = 'block';
loadMoreBtn.style.margin = '20px auto';
document.body.appendChild(loadMoreBtn);

loadMoreBtn.addEventListener('click', displayMoreCharacters);
