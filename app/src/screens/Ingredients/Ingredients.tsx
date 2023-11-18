import Box from "@mui/material/Box";
import AddIngredient from "../../components/AddIngredient/AddIngredient";
import InventoryDisplay from "../../components/InventoryDisplay/InventoryDisplay";
import {
  addIngredient,
  getIngredients,
  removeIngredient,
} from "../../services/IngredientService";
import { updateScores } from "../../services/ScoreService";
import { useEffect, useState } from "react";
import React from "react";
import { IngredientItem } from "../../types/inventory"; // Adjust the import path

function Ingredients() {
  const [ingredients, setIngredients] = useState<IngredientItem[]>([]);

  // TODO: Hardcoded for userID 1
  const getAndSetIngredients = () => {
    getIngredients(1).then(function response(data) {
      let currentIngredients: IngredientItem[] = [];
      if (data && data.data) {
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
      }
      if (currentIngredients.length === 0) {
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
  const handleIngredientAdd = (ingredient: IngredientItem): void => {
    addIngredient(1, ingredient.name, +ingredient.amount, ingredient.unit).then(
      function response() {
        getAndSetIngredients();
        updateScores(1);
      },
    );
  };

  // TODO: Hardcoded for userID 1
  const handleIngredientRemove = (name: string) => {
    removeIngredient(1, name).then(function response() {
      getAndSetIngredients();
      updateScores(1);
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
