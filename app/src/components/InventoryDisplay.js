import { useState } from "react";
import {
  Box,
  Container,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

function InventoryDisplay({ inventory, handleIngredientRemove }) {
  const inventoryItem = inventory
    ? inventory.map((item, index) => (
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
            <Typography variant="subtitle">
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
      <Box>{inventoryItem ? inventoryItem : null}</Box>
    </Paper>
  );
}

export default InventoryDisplay;
