import './Recipe.css'
import { useState } from 'react';


function Recipe({ recipe }) {
  let imperialIngredients = recipe['Ingredients'].replaceAll("'", "").split("**")
  let instructions = recipe['Instructions'].replaceAll("'", "").split("**").slice(0, -1)
  const [ingredients, toggleIngredientsUnits] = useState(imperialIngredients);
  
  
  let metricIngredients = []
  for (var i = 0; i < eval(recipe['CleanIngredients']).length; i++) {
    let ingredientString = ''
    let amount = (Math.round(eval(recipe['IngredientAmount'])[i]))
    let unit = eval(recipe['IngredientUnit'])[i]
    let ingredient = eval(recipe['CleanIngredients'])[i]
    if (unit == 'count') {
      ingredientString = imperialIngredients[i];
    } else {
      ingredientString = `${amount == 0 ? '' : amount + ' '}${unit == 'count' ? '' : unit + ' '}${ingredient}`
    }
    metricIngredients.push(ingredientString)
  }


  return (
    <div className="recipe">
        <h1>{recipe['Title']}</h1>
        <img className="recipeImage" src={recipe['ImageSrc']} alt=''></img>
        <div>
        <h2>Ingredients</h2>
        <div className='unitSwitchContainer'>
          <button className='unitSwitchButton' onClick={() => toggleIngredientsUnits(imperialIngredients)}>Imperial</button>
          <button className='unitSwitchButton' onClick={() => toggleIngredientsUnits(metricIngredients)}>Metric</button>
        </div>
        </div>
        <div>
          {ingredients.map((ingredient) => (<div>{`• ${ingredient}`}<br/><br/></div>))}
        </div>
        <h2>Directions</h2>
        {instructions.map((ingredient, index) => (<div><b>{`Step ${index + 1}`}</b><br/>{`${ingredient}`}</div>))}
    </div>
  );
}

export default Recipe;
