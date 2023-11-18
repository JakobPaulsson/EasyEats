import Box from "@mui/material/Box";
import {
  Container,
  Fab,
  MenuItem,
  Paper,
  TextField,
  Tooltip,
  Autocomplete,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import React, { useState } from "react";
import { getSearchSuggestions } from "../../services/SearchSuggestionService";

import { IngredientItem } from "../../types/inventory"; // Adjust the import path

type AddIngredientProps = {
  handleIngredientAdd: (ingredient: IngredientItem) => void;
};

const AddIngredient = ({ handleIngredientAdd }: AddIngredientProps) => {
  const [ingredient, setIngredient] = useState<string>("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("");
  const [options, setOptions] = useState<[string] | []>([]);

  const fetchSuggestions = async (searchTerm: string) => {
    let data = await getSearchSuggestions(searchTerm);
    if (data) setOptions(data.data.searchResults);
  };

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
            <Autocomplete
              id="grouped-demo"
              options={options.sort((a, b) => a.length - b.length)}
              ListboxProps={{ style: { maxHeight: 160, overflow: "auto" } }}
              onChange={(_, newValue) => {
                newValue ? setIngredient(newValue) : setIngredient("");
              }}
              renderInput={(params) => (
                <TextField
                  variant={"standard"}
                  data-cy={"addIngredient"}
                  onChange={(e) => {
                    fetchSuggestions(e.target.value);
                  }}
                  {...params}
                  label="Ingredient"
                />
              )}
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
              data-cy={"addAmount"}
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
              data-cy={"addUnit"}
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
                data-cy={"addButton"}
                onClick={() => {
                  setIngredient("");
                  setAmount("");
                  setUnit("");
                  handleIngredientAdd({
                    name: ingredient,
                    amount: amount,
                    unit: unit,
                  });
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
};

export default AddIngredient;
