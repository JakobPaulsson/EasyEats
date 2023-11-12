import styles from "./Ingredients.css";
import Box from "@mui/material/Box";
import AddIngredient from "../components/AddIngredient";
import InventoryDisplay from "../components/InventoryDisplay";

function Ingredients() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AddIngredient></AddIngredient>
      <InventoryDisplay></InventoryDisplay>
    </Box>
  );
}

export default Ingredients;
