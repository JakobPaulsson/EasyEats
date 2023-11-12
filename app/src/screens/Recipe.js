import "./Recipe.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import InstructionStepper from "../components/InstructionStepper"

function Recipe() {
  const recipe = useLocation().state.recipe;
  console.log(recipe)
  let imperialIngredients = recipe["Ingredients"]
    .replaceAll("'", "")
    .split("**");
  let instructions = recipe["Instructions"]
    .replaceAll("'", "")
    .split("**")
    .slice(0, -1);
  const [ingredients, toggleIngredientsUnits] = useState(imperialIngredients);
  
  const handleComplete = () => {
    const a = 0;
    //navigate(`recipes/${recipe.Title}`)
  };

  let metricIngredients = [];
  for (let i = 0; i < recipe["CleanIngredients"].length; i++) {
    let amount = Math.round(recipe["IngredientAmount"][i]);
    let unit = eval(recipe["IngredientUnit"])[i];
    let ingredient = eval(recipe["CleanIngredients"])[i];

    if (unit === "count") {
      metricIngredients.push(imperialIngredients[i]);
    } else {
      metricIngredients.push(
        `${amount == 0 ? "" : amount + " "}${
          unit == "count" ? "" : unit + " "
        }${ingredient}`,
      );
    }
  }

  return (
    <div className="recipe">
      <h1>{recipe["Title"]}</h1>
      <img className="recipeImage" src={recipe["ImageSrc"]} alt=""></img>
      <div className="descriptionContainer">
        <div className="ingredientContainer">
          <h2>Ingredients</h2>
          <div className="unitSwitchContainer">
            <button
              className="unitSwitchButton"
              onClick={() => toggleIngredientsUnits(imperialIngredients)}
            >
              Imperial
            </button>
            <button
              className="unitSwitchButton"
              onClick={() => toggleIngredientsUnits(metricIngredients)}
            >
              Metric
            </button>
          </div>
          <div>
            {ingredients.map((ingredient) => (
              <div>
                {`• ${ingredient}`}
                <br />
                <br />
              </div>
            ))}
          </div>
        </div>
        <div className="instructionContainer">
          <h2>Instructions</h2>
          <InstructionStepper 
            instructions=
            {instructions.map((instruction, index) => (
              {
                label:`Step ${index + 1}`,
                description:`${instruction}`
              }
            ))} 
            handle = {handleComplete}/>
        </div>
      </div>
    </div>
  );
}

export default Recipe;