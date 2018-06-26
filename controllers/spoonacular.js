const rp = require('request-promise');
const { spoonKey } = require('../config/environment');
const spoonacular ='https://spoonacular-recipe-food-nutrition-v1.p.mashape.com';

// index route function
function getRecipesByIngredients(req, res, next) {
  const userInput = req.query.ingredients;
  console.log(typeof(userInput));

  rp({
    method: 'GET',
    url: `${spoonacular}/recipes/findByIngredients`,
    qs: {
      number: 15,
      ranking: 2,
      fillIngredients: true,
      ingredients: userInput
    },
    headers: { 'x-mashape-key': spoonKey },
    json: true
  })
    .then(response => {
      res.json(response);
      console.log(response);
    })
    .catch(next);
}

// show route function
function getRecipeById(req, res, next) {
  // console.log(req.params.id);
  rp({
    method: 'GET',
    url: `${spoonacular}/recipes/${req.params.id}/information`,
    qs: {
      includeNutrition: 'false'
    },
    headers: {
      'Accept': 'application/json',
      'X-Mashape-Key': spoonKey
    },
    json: true
  })
    .then(response => res.json(response))
    .catch(next);
}

function autocomplete(req, res, next) {
  rp({
    method: 'GET',
    url: `${spoonacular}/food/ingredients/autocomplete`,
    qs: {
      query: req.query.query
    },
    headers: {
      'Accept': 'application/json',
      'X-Mashape-Key': spoonKey
    },
    json: true
  })
    .then(response => res.json(response))
    .catch(next);
}

module.exports={
  getRecipesByIngredients,
  getRecipeById,
  autocomplete
};
