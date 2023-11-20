import React, { useState } from "react";
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
import { getSearchSuggestions } from "../../services/SearchSuggestionService";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import NumbersIcon from "@mui/icons-material/Numbers";
import ScaleIcon from "@mui/icons-material/Scale";
import WaterIcon from "@mui/icons-material/Water";
import { Add } from "@mui/icons-material";

import { IngredientItem } from "../../types/ingredient.interface"; // Adjust the import path
import { UnitTypes, UnitCategory } from "../../types/units.interface";
import OkDialog from "../../components/OkDialog/OkDialog";

type AddIngredientProps = {
  handleIngredientAdd: (ingredient: IngredientItem) => void;
};

const AddIngredient = ({ handleIngredientAdd }: AddIngredientProps) => {
  const [ingredient, setIngredient] = useState<string>("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState<string>("");
  const [options, setOptions] = useState<[string] | []>([]);
  const [unitType, setUnitType] = React.useState<UnitCategory>("fluid");
  const [open, setOpen] = React.useState(false);

  const fetchSuggestions = async (searchTerm: string) => {
    const data = await getSearchSuggestions(searchTerm);
    if (data) setOptions(data.data.searchResults);
  };

  const addIngredientClick = () => {
    if (ingredient === "" || amount === "" || unit === "") return;
    handleIngredientAdd({ name: ingredient, amount: amount, unit: unit });
  };

  const ToggleIngredientUnit = () => {
    const handleChange = (
      _: React.MouseEvent<HTMLElement>,
      newAlignment: string,
    ) => {
      if (newAlignment) {
        setUnitType(newAlignment as UnitCategory);
      }
    };

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "10px",
        }}
      >
        <ToggleButtonGroup
          color="primary"
          value={unitType}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="fluid">
            <WaterIcon />
            Fluid
          </ToggleButton>
          <ToggleButton value="count">
            <NumbersIcon />
            Number
          </ToggleButton>
          <ToggleButton value="weight">
            <ScaleIcon />
            Weight
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    );
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
          {ToggleIngredientUnit()}
          <Autocomplete
            id="grouped-demo"
            options={options.sort((a, b) => a.length - b.length)}
            ListboxProps={{ style: { maxHeight: 160, overflow: "auto" } }}
            onChange={(_, newValue) => {
              newValue ? setIngredient(newValue) : setIngredient("");
            }}
            value={ingredient}
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              height: "100px",
              marginRight: "10px",
            }}
          >
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
              label="Select Unit"
              select
              variant={"standard"}
              className={"inputBox"}
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              data-cy={"addUnit"}
            >
              {Object.values(UnitTypes[unitType]).map((unit) => (
                <MenuItem key={unit} value={unit}>
                  {unit}
                </MenuItem>
              ))}
            </TextField>
          </Box>
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
                  addIngredientClick();
                  setIngredient("");
                  setAmount("");
                  setUnit("");
                }}
              >
                <Add />
              </Fab>
            </Tooltip>
            {open ? (
              <OkDialog
                open={open}
                setOpen={setOpen}
                title="Missing fields"
                message="Please fill out all fields."
              />
            ) : null}
          </Box>
        </Container>
      </Paper>
    </Box>
  );
};

export default AddIngredient;
