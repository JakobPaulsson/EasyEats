import Box from "@mui/material/Box";
import AddIngredient from "../../components/AddIngredient/AddIngredient";
import InventoryDisplay from "../../components/InventoryDisplay/InventoryDisplay";
import PaperHeader from "../../components/PaperHeader/PaperHeader";
import Paper from "@mui/material/Paper";
import {
  addIngredient,
  getIngredients,
  removeIngredient,
} from "../../services/IngredientService";
import { updateScores } from "../../services/ScoreService";
import { imperialToMetric } from "../../services/ConversionService";
import { useEffect, useState, useContext } from "react";
import React from "react";
import { IngredientItem } from "../../types/ingredient.interface"; // Adjust the import path
import { UserContext } from "../../contexts/UserContext";

function Ingredients() {
  const [ingredients, setIngredients] = useState<IngredientItem[]>([]);
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("Authcontext in Presets");
  }

  const { currentUser } = userContext;

  const getAndSetIngredients = () => {
    if (!currentUser) return;
    getIngredients(currentUser.UserID).then(function response(data) {
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

  const [tabValue, setTabValue] = React.useState("1");
  const handleTabSwitch = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  // TODO: Hardcoded for userID 1
  const handleIngredientAdd = (ingredient: IngredientItem): void => {
    if (!currentUser) return;
    if (
      ingredient.name === "" ||
      ingredient.amount === "" ||
      ingredient.unit === ""
    )
      return;
    const [amount, unit] = imperialToMetric(
      +ingredient.amount,
      ingredient.unit
    );
    addIngredient(currentUser.UserID, ingredient.name, amount, unit).then(
      function response() {
        getAndSetIngredients();
        updateScores(currentUser.UserID);
      }
    );
  };

  // TODO: Hardcoded for userID 1
  const handleIngredientRemove = (name: string) => {
    if (!currentUser) return;
    removeIngredient(currentUser.UserID, name).then(function response() {
      getAndSetIngredients();
      updateScores(currentUser.UserID);
    });
  };

  return (
    <Paper
      elevation={6}
      sx={{
        m: 5,
        width: "70%",
        height: "800px",
        borderRadius: "10px",
      }}
    >
      <PaperHeader title="Ingredients" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AddIngredient
          handleIngredientAdd={handleIngredientAdd}
        ></AddIngredient>
        <InventoryDisplay
          inventory={ingredients}
          handleIngredientRemove={handleIngredientRemove}
        ></InventoryDisplay>
      </Box>
    </Paper>
  );
}

export default Ingredients;
