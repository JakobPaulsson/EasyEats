import Box from "@mui/material/Box";
import AddIngredient from "../components/AddIngredient";
import InventoryDisplay from "../components/InventoryDisplay";
import {
  getIngredients,
  addIngredient,
  removeIngredient,
} from "../services/IngredientService";
import { useState, useEffect } from "react";

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  // TODO: Hardcoded for userID 1
  const getAndSetIngredients = () => {
    getIngredients(1).then(function response(data) {
      let currentIngredients = [];
      for (var i = 0; i < data.data.ingredients.length; i++) {
        let name = data.data.ingredients[i];
        let amount = data.data.ingredientAmounts[i];
        let unit = data.data.ingredientUnit[i];
        currentIngredients.push({
          name: name,
          amount: amount,
          unit: unit === "count" ? "" : unit,
        });
      }
      if (currentIngredients[0].name == "") {
        setIngredients([]);
      } else {
        setIngredients(currentIngredients);
      }
    });
  };

  useEffect(() => {
    getAndSetIngredients();
  }, []);

  // TODO: Hardcoded for userID 1
  const handleIngredientAdd = (name, amount, unit) => {
    addIngredient(1, name, amount, unit).then(function response(data) {
      getAndSetIngredients();
    });
  };

  // TODO: Hardcoded for userID 1
  const handleIngredientRemove = (name) => {
    removeIngredient(1, name).then(function response(data) {
      getAndSetIngredients();
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AddIngredient handleIngredientAdd={handleIngredientAdd}></AddIngredient>
      <InventoryDisplay
        inventory={ingredients}
        handleIngredientRemove={handleIngredientRemove}
      ></InventoryDisplay>
    </Box>
  );
}

export default Ingredients;
