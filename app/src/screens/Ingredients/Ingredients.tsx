import Box from "@mui/material/Box";
import AddIngredient from "../../components/AddIngredient/AddIngredient";
import InventoryDisplay from "../../components/InventoryDisplay/InventoryDisplay";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
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
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { AuthContext } from "../../contexts/AuthContext";

function Ingredients() {
  const [ingredients, setIngredients] = useState<IngredientItem[]>([]);
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("Authcontext in Presets");
  }

  const { currentUserID } = authContext;

  const getAndSetIngredients = () => {
    getIngredients(currentUserID).then(function response(data) {
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
    addIngredient(currentUserID, ingredient.name, amount, unit).then(
      function response() {
        getAndSetIngredients();
        updateScores(currentUserID);
      }
    );
  };

  // TODO: Hardcoded for userID 1
  const handleIngredientRemove = (name: string) => {
    removeIngredient(currentUserID, name).then(function response() {
      getAndSetIngredients();
      updateScores(currentUserID);
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
      <TabContext value={tabValue}>
        <Divider />
        <Box>
          <TabList onChange={handleTabSwitch}>
            <Tab label="Inventory" value="1" />
          </TabList>
          <Divider />
        </Box>
        <TabPanel value="1">
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
        </TabPanel>
      </TabContext>
    </Paper>
  );
}

export default Ingredients;
