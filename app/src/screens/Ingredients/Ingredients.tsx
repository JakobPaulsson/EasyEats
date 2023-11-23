import Box from "@mui/material/Box";
import AddIngredient from "../../components/AddIngredient/AddIngredient";
import InventoryDisplay from "../../components/InventoryDisplay/InventoryDisplay";
import {
  addIngredient,
  getIngredients,
  removeIngredient,
} from "../../services/IngredientService";
import { updateScores } from "../../services/ScoreService";
import { imperialToMetric } from "../../services/ConversionService";
import { useEffect, useState } from "react";
import React from "react";
import { IngredientItem } from "../../types/ingredient.interface"; // Adjust the import path

function Ingredients() {
  const [ingredients, setIngredients] = useState<IngredientItem[]>([]);

  const getAndSetIngredients = () => {
    getIngredients(1).then(function response(data) {
      const currentIngredients: IngredientItem[] = [];
      if (data && data.data) {
        for (let i = 0; i < data.data.ingredients.length; i++) {
          const name = data.data.ingredients[i];
          const amount = data.data.ingredientAmounts[i];
          const unit = data.data.ingredientUnit[i];
          currentIngredients.push({
            name: name,
            amount: amount,
            unit: unit === "count" ? "" : unit,
          });
        }
      }
      if (
        currentIngredients.length === 0 ||
        currentIngredients[0].name === ""
      ) {
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
    if (
      ingredient.name === "" ||
      ingredient.amount === "" ||
      ingredient.unit === ""
    )
      return;
    const [amount, unit] = imperialToMetric(
      +ingredient.amount,
      ingredient.unit,
    );
    addIngredient(1, ingredient.name, amount, unit).then(function response() {
      getAndSetIngredients();
      updateScores(1);
    });
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
