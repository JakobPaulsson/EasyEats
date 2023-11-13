import Box from "@mui/material/Box";
import {
  Container,
  Divider,
  Fab,
  MenuItem,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";
function AddIngredient({ handleIngredientAdd }) {
  const [ingredient, setIngredient] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("");
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { mt: 3, ml: 3, width: "35ch" },
        "  .MuiButton-root": {
          width: "15ch",
          height: "45px",
          borderRadius: "10px",
          textTransform: "none",
        },
      }}
      noValidate
      autoComplete="off"
    >
      {" "}
      <Paper
        elevation={8}
        square={false}
        sx={{
          ml: 0,
          mt: 3,
          width: "400px",
          height: "300px",
          borderRadius: "20px",
        }}
      >
        <Container>
          <div className="addIngredientsContainer">
            <TextField
              className="inputBox"
              id="filled-basic"
              label="Ingredient"
              variant={"standard"}
              placeholder={"Add ingredient"}
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
            />
            <TextField
              className="inputBox"
              id="filled-basic"
              label="Amount"
              variant={"standard"}
              placeholder={"Add amount"}
              type={"number"}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Select Unit"
              helperText="Select the unit of measurement"
              variant={"standard"}
              className={"inputBox"}
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              <MenuItem value="ml">ml</MenuItem>
              <MenuItem value="gram">gram</MenuItem>
              <MenuItem value="count">count</MenuItem>
            </TextField>
          </div>
          <Box
            sx={{
              display: "flex",
              alignContent: "flex-end",
              justifyContent: "flex-end",
              marginRight: "10px",
            }}
          >
            <Tooltip title="Add ingredient to inventory" arrow>
              <Fab
                color="primary"
                aria-label="add"
                size={"small"}
                onClick={() => {
                  setIngredient("");
                  setAmount("");
                  setUnit("");
                  handleIngredientAdd(ingredient, amount, unit);
                }}
              >
                <Add />
              </Fab>
            </Tooltip>
          </Box>
        </Container>
      </Paper>
    </Box>
  );
}

export default AddIngredient;