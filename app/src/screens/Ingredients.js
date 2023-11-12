import styles from "./Ingredients.css";
import Box from "@mui/material/Box";
import AddIngredient from "../components/AddIngredient";
import InventoryDisplay from "../components/InventoryDisplay";
import { useState } from "react";

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  const handleIngredientAdd = (name, amount, unit) => {
    setIngredients([...ingredients, { name, amount, unit }]);
  };

  const handleIngredientRemove = (name) => {
    setIngredients(ingredients.filter((item) => item.name !== name));
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
