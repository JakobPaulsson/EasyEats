import axios from 'axios';
import './Recipes.css'
import { useState, useEffect } from 'react';
import Recipe from '../components/Recipe.js'



function Recipes() {
  const [page, setPage] = useState(0);
  const [recipes, setRecipes] = useState(null)
  const [currentRecipe, selectRecipe] = useState(null)

  useEffect(() => {
    getRecipes(1);
  }, []);

  async function getRecipes(amount) {
    let ingredients = ['tomato', 'egg'] // TODO: This should be based on ingredients specified by the user
    let ingredientsQuery = ''
    for (var ingredient of ingredients) {
      ingredientsQuery += `ingredients=${ingredient}&`
    }
    ingredientsQuery = ingredientsQuery.slice(0, -1)
    const hasItems = await axios.get(`http://localhost:8080/recipes?page=${page + amount}&${ingredientsQuery}`).then((response) => {
      if (response.data.length == 0)
        return false
      const recipeCards = response.data.map((recipe) => (
        <div key={recipe.Title} className="card">
          <div className="title">{recipe['Title']}</div>
          <div className="cardContainer">
            <img onClick={() => selectRecipe(recipe)} className="image" src={recipe['ImageSrc']} alt='' />
            <div className="completenessContainer">
              <div className="completeness">Ingredients</div>
            </div>
          </div>
        </div>))
      
      setRecipes(recipeCards);
      return true
    })
    if (hasItems && (page != 1 || amount != -1)) {
      setPage(page + amount);
    }
    
  }

  return (
    <div className="container">

      {currentRecipe ? <Recipe recipe={currentRecipe}/> : 
      
      <><div className="cardsContainer">
        {recipes ?
          recipes :
          null}
      </div>
      <div className="buttonNavigationContainer">
        <button className="button" onClick={() => {
          getRecipes(-1)
        }}>{`Previous Page`}
        </button>
        <div>{`Page ${page}`}</div>
        <button className="button" onClick={() => {
          getRecipes(1)
        }}>{`Next Page`}
        </button>
      </div></>}
      
    </div>
  );
}

export default Recipes;
