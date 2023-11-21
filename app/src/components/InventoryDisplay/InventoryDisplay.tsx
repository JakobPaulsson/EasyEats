import { Box, Divider, IconButton, Paper, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import React from "react";

import { IngredientItem } from "../../types/ingredient.interface"; // Adjust the import path

type InventoryDisplayProps = {
  inventory: IngredientItem[];
  handleIngredientRemove: (s: string) => void;
};

const InventoryDisplay: React.FC<InventoryDisplayProps> = ({
  inventory,
  handleIngredientRemove,
}) => {
  const inventoryItem = inventory
    ? inventory.map((item) => (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              ml: 3,
              "& button": {
                alignSelf: "flex-end",
              },
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                textTransform: "capitalize",
              }}
            >
              {item.name} {item.amount} {item.unit}
            </Typography>
            <IconButton
              aria-label="delete"
              id={item.name}
              onClick={() => handleIngredientRemove(item.name)}
            >
              <Delete />
            </IconButton>
          </Box>
          <Divider />
        </>
      ))
    : null;

  return (
    <Paper
      elevation={8}
      square={false}
      sx={{
        ml: 20,
        mt: 3,
        width: "500px",
        height: "600px",
        borderRadius: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          backgroundColor: "#ededed",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          height: "45px",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          component="h5"
          marginBottom={"unset"}
        >
          Inventory
        </Typography>
      </Box>
      <Box data-cy={"inventory"}>{inventoryItem ? inventoryItem : null}</Box>
    </Paper>
  );
};

export default InventoryDisplay;
