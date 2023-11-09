import './Recipe.css'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';


function Recipe() {
  const recipe = useLocation().state.recipe;
  let imperialIngredients = recipe['Ingredients'].replaceAll("'", "").split("**")
  let instructions = recipe['Instructions'].replaceAll("'", "").split("**").slice(0, -1)
  const [ingredients, toggleIngredientsUnits] = useState(imperialIngredients);
  
  
  let metricIngredients = []
  for (var i = 0; i < (recipe['CleanIngredients']).length; i++) {
    let amount = (Math.round((recipe['IngredientAmount'])[i]))
    let unit = eval(recipe['IngredientUnit'])[i]
    let ingredient = eval(recipe['CleanIngredients'])[i]
    if (unit == 'count') {
      metricIngredients.push(imperialIngredients[i]);
    } else {
      metricIngredients.push(`${amount == 0 ? '' : amount + ' '}${unit == 'count' ? '' : unit + ' '}${ingredient}`);
    }
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
