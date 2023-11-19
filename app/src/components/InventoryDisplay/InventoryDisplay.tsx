import {
  Box,
  Container,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
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
            <Typography variant="h5">
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
          textAlign: "center",
          backgroundColor: "grey",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        }}
      >
        <Container>
          <Typography
            variant="h6"
            gutterBottom
            component="h5"
            marginBottom={"unset"}
          >
            Inventory
          </Typography>
        </Container>
      </Box>
      <Box data-cy={"inventory"}>{inventoryItem ? inventoryItem : null}</Box>
    </Paper>
  );
};

export default InventoryDisplay;
