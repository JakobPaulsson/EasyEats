import "./Recipe.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InstructionStepper from "../components/InstructionStepper";
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Checkbox,
  Grid,
} from "@mui/material";

function Recipe() {
  const recipe = useLocation().state.recipe;
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

  const setIngredientsUnit = () => {};

  useEffect(() => {
    let metricIngredients = [];
    for (let i = 0; i < recipe["CleanIngredients"].length; i++) {
      let amount = Math.round(recipe["IngredientAmount"][i]);
      let unit = recipe["IngredientUnit"].split(",")[i];
      let ingredient = recipe["CleanIngredients"].split(",")[i];

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
  }, []);

  return (
    <div className="recipe">
      <div className="titleImageContainer">
        <img className="recipeImage" src={recipe["ImageSrc"]} alt=""></img>
        <div className="titleContainer">
          <h1>{recipe["Title"]}</h1>
          <p>{`Rating: ${recipe["Rating"]}/5.0`}</p>
          <p>{`Rating Count: ${recipe["RatingCount"]}`}</p>
          <p>{`Cooking Time: ${recipe["CookingTimeMinutes"]} minutes`}</p>
        </div>
      </div>
      <div className="descriptionContainer">
        <div className="ingredientContainer">
          <h2>Ingredients</h2>
          <Paper
            sx={{ marginTop: "20px", marginRight: "20px", width: "90%" }}
            elevation={8}
          >
            <List sx={{ width: "100%" }}>
              {ingredients.map((value) => (
                <ListItem key={value} secondaryAction={<Checkbox />}>
                  <ListItemText primary={value} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </div>
        <div className="instructionContainer">
          <h2>Instructions</h2>
          <InstructionStepper
            instructions={instructions.map((instruction, index) => ({
              label: `Step ${index + 1}`,
              description: `${instruction}`,
            }))}
            handle={handleComplete}
          />
        </div>
      </div>
    </div>
  );
}

export default Recipe;
