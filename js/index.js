function init() {
  const recipe = document.getElementById('food-recipe').value;

  if (!recipe) return insertError();
  cleanData();
  return getData(recipe);
}

function insertError() {
  const error = document.getElementById('food-recipe');
  error.className = 'error';
}

function getData(recipe) {
  const APP_ID = '35c6ca2e';
  const APP_KEY = '9e890929f8898cc7ce56be8d77bc8666';
  const url = `https://api.edamam.com/search?q=${recipe}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  fetch(url)
    .then((response) => response.json())
    .then((results) => handleData(results))
    .catch((err) => console.log(err));
}

function handleData({ hits }) {
  if (!hits.length) return showDataError();

  hits.forEach((recipe) => {
    for (const key in recipe) {
      return displayInfo(recipe[key]);
    }
  });
}

function displayInfo(recipe) {
  const { label, url, image, calories } = recipe;

  const infoRecipes = document.getElementById('info-recipes');

  let recipesCards = document.createElement('div');
  recipesCards.className = 'recipe';

  let recipeTittle = document.createElement('div');
  recipeTittle.className = 'recipe-tittle';
  recipeTittle.innerHTML = `<h2>${label}</h2>
                            <p>Calories: ${Math.round(calories)}</p>
                            <a href="${url} target="_blank">Recipe Url</a>`;

  let recipeImg = document.createElement('div');
  recipeImg.className = 'recipe-img';
  recipeImg.innerHTML = `<img src="${image}" alt="${label}"></img>`;

  recipesCards.appendChild(recipeTittle);
  recipesCards.appendChild(recipeImg);

  infoRecipes.appendChild(recipesCards);

  document.getElementById('food-recipe').value = '';
}

function showDataError() {}

function cleanData() {
  const infoRecipe = document.getElementById('info-recipes');
  infoRecipe.innerHTML = '';
}
// calories, image, label, url

const button = document.getElementById('send_info');
button.addEventListener('click', init);
