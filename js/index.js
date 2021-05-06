const recipeInput = document.getElementById('recipe-input');
const infoRecipes = document.getElementById('info-recipes');
const button = document.getElementById('send_info');

(function addEvents() {
  button.addEventListener('click', init);
})();

function init() {
  if (!recipeInput.value) return insertError();

  cleanData();

  return getData(recipeInput.value);
}

function cleanData() {
  infoRecipes.innerHTML = '';
  recipeInput.classList.remove('error');
}

function insertError() {
  recipeInput.className = 'error';
}

function getData(recipeInput) {
  const APP_ID = '35c6ca2e';
  const APP_KEY = '9e890929f8898cc7ce56be8d77bc8666';
  const url = `https://api.edamam.com/search?q=${recipeInput}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  fetch(url)
    .then((response) => response.json())
    .then((results) => handleData(results))
    .catch((err) => console.log(err));
}

function handleData({ hits }) {
  if (!hits.length) return displayEmptyInfo();

  hits.forEach((recipes) => {
    for (const key in recipes) {
      displayInfo(recipes[key]);
    }
  });
}

function displayInfo(recipes) {
  const { label, url, image, calories } = recipes;

  let recipeCard = document.createElement('div');
  let recipeCardTittle = document.createElement('div');
  let recipeCardImg = document.createElement('div');

  recipeCard.className = 'recipe';
  recipeCardTittle.className = 'recipe-tittle';
  recipeCardImg.className = 'recipe-img';

  recipeCardTittle.innerHTML = `<h2>${label}</h2>
                                 <p>Calories: ${Math.round(calories)}</p>
                                 <a href="${url} target="_blank">Recipe Url</a>`;
  recipeCardImg.innerHTML = `<img src="${image}" alt="${label}">`;

  recipeCard.appendChild(recipeCardTittle);
  recipeCard.appendChild(recipeCardImg);
  infoRecipes.appendChild(recipeCard);

  recipeInput.value = '';
}

function displayEmptyInfo() {
  let noRecipeFound = document.createElement('div');
  let noRecipeTittle = document.createElement('div');
  let noRecipeImg = document.createElement('div');

  noRecipeFound.className = 'recipe';
  noRecipeTittle.className = 'recipe-tittle';
  noRecipeImg.className = 'recipe-img';

  noRecipeTittle.innerHTML = `<h2>Sorry!</h2>
                              <p>We didn't find any recipe with that ingredient</p>
                              <p>Try Again 😢</p>`;

  noRecipeImg.innerHTML = `<img src="./img/notFound.jpg" alt="notFound">`;

  noRecipeFound.appendChild(noRecipeTittle);
  noRecipeFound.appendChild(noRecipeImg);
  infoRecipes.appendChild(noRecipeFound);

  recipeInput.value = '';
}
