import * as React from "react";
import "./Recipe.css";
import { useLocation, useNavigate } from "react-router-dom";
import InstructionStepper from "../../components/InstructionStepper/InstructionStepper";
import RecipeError from "../../components/RecipeError/RecipeError";
import { List, ListItem, ListItemText, Paper, Checkbox } from "@mui/material";
import {
  getIngredients,
  addIngredient,
  removeIngredient,
} from "../../services/IngredientService";
import { updateScores } from "../../services/ScoreService";
import Slider from "@mui/material/Slider";
import { AuthContext } from "../../contexts/AuthContext";

function Recipe() {
  const [completed, setCompleted] = React.useState<boolean>(false);
  const [userIngredients, setUserIngredients] = React.useState<
    Array<Array<any>>
  >([]);
  const [userIngredientElements, setUserIngredientElements] =
    React.useState<any>();
  const navigate = useNavigate();

  if (!useLocation().state) return <RecipeError />;

  const authContext = React.useContext(AuthContext);
  if (!authContext) {
    throw new Error("Authcontext in Presets");
  }

  const { currentUserID } = authContext;

  const recipe = useLocation().state.recipe;
  const imperialIngredients = recipe["Ingredients"]
    .replaceAll("'", "")
    .split("**");
  const instructions = recipe["Instructions"]
    .replaceAll("'", "")
    .split("**")
    .slice(0, -1);
  const cleanIngredients = recipe["CleanIngredients"].split(",");
  const ingredientAmounts = recipe["IngredientAmount"].toString().split(",");
  const ingredients = imperialIngredients;

  const handleSliderChange = (i: number, sliderValue: number) => {
    const tmpUserIngredients = [...userIngredients];
    tmpUserIngredients[i][3] = sliderValue;
    setUserIngredients(tmpUserIngredients);
  };

  const zip = (...arr: Array<any>) =>
    Array.from({ length: Math.max(...arr.map((a) => a.length)) }, (_, i) =>
      arr.map((a) => a[i])
    );

  const getUserIngredients = () => {
    setCompleted(true);
    const ingredientElements = userIngredients.map((elements, index) => {
      const name = elements[0];
      const amount = elements[1];
      const unit = elements[2];
      return (
        <div className="sliderContainer">
          <p>{`${name} (${unit})`}</p>
          <Slider
            min={0}
            max={+amount}
            aria-label="Custom marks"
            valueLabelDisplay="auto"
            defaultValue={parseInt(
              ingredientAmounts[cleanIngredients.indexOf(name)]
            )}
            marks={[
              { value: 0, label: "0" },
              { value: amount, label: `${parseInt(amount)}` },
            ]}
            onChange={(_, value) => handleSliderChange(index, value as number)}
          />
        </div>
      );
    });
    setUserIngredientElements(ingredientElements);
  };

  const handleRemoveIngredients = async () => {
    setCompleted(false);

    for (let i = 0; i < userIngredients.length; i++) {
      const name = userIngredients[i][0];
      const currentAmount = parseFloat(userIngredients[i][1]);
      const unit = userIngredients[i][2];
      const usedAmount = parseFloat(userIngredients[i][3]);
      setTimeout;
      if (currentAmount - usedAmount <= 0) {
        await removeIngredient(currentUserID, name);
      } else {
        await addIngredient(currentUserID, name, -usedAmount, unit);
      }
    }
    updateScores(currentUserID);
    navigate("/recipes/page/1");
  };

  React.useEffect(() => {
    const newUserIngredients: Array<Array<any>> = [];
    getIngredients(currentUserID).then(function response(data) {
      if (data && data.data) {
        let zippedData = zip(
          data!.data!.ingredients,
          data!.data!.ingredientAmounts,
          data!.data!.ingredientUnit
        );

        // Filter these out so later, the index from the mapping function
        // can be used in the handleSliderChange function
        zippedData = zippedData.filter((data) =>
          cleanIngredients.includes(data[0])
        );

        zippedData.map((data) => {
          const name = data[0];
          const amount = data[1];
          const unit = data[2];
          const defaultValue: number = parseInt(
            ingredientAmounts[cleanIngredients.indexOf(name)]
          );
          newUserIngredients.push([name, amount, unit, defaultValue]);
        });

        setUserIngredients(newUserIngredients);
      }
    });
  }, []);

  return (
    <div className="recipe">
      {completed ? (
        <div className="popup">
          <div>
            Done!
            <br />
            <br />
            Choose amounts used.
          </div>
          {userIngredientElements}
          <div className="completeRecipeContainer">
            <button
              className="confirmCancelButton"
              onClick={handleRemoveIngredients}
            >
              Confirm
            </button>
            <button
              className="confirmCancelButton"
              onClick={() => setCompleted(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}
      <div className={`titleImageContainer ${completed ? "blurred" : ""}`}>
        <img className="recipeImage" src={recipe["ImageSrc"]} alt=""></img>
        <div className="titleContainer">
          <h1>{recipe["Title"]}</h1>
          <p>{`Rating: ${recipe["Rating"]}/5.0`}</p>
          <p>{`Rating Count: ${recipe["RatingCount"]}`}</p>
          <p>{`Cooking Time: ${recipe["CookingTimeMinutes"]} minutes`}</p>
        </div>
      </div>
      <div className={`descriptionContainer ${completed ? "blurred" : ""}`}>
        <div className="ingredientContainer">
          <h2>Ingredients</h2>
          <Paper
            sx={{ marginTop: "20px", marginRight: "20px", width: "90%" }}
            elevation={8}
          >
            <List sx={{ width: "100%" }}>
              {ingredients.map((value: string) => (
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
            handleComplete={getUserIngredients}
            instructions={instructions.map(
              (instruction: string, index: number) => ({
                label: `Step ${index + 1}`,
                description: `${instruction}`,
              })
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default Recipe;
