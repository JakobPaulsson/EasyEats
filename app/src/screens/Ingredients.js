import styles from "./Ingredients.css";
import Box from "@mui/material/Box";
import {Button, Divider, Fab, Link, MenuItem, Paper, TextField, Tooltip, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";

function Ingredients() {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": {mt: 3, ml: 3, width: "35ch" },
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
      <div className="pageContainer">
        <Paper elevation={8} square={false} sx={{ml: 0,mt: 3, width:"400px", height:"300px", borderRadius: "20px"}}>
        <div className="addIngredientsContainer">
          <TextField
            className="inputBox"
            id="filled-basic"
            label="Ingredient"
            variant={'standard'}
            placeholder={"Add ingredient"}/>
          <TextField
            className="inputBox"
            id="filled-basic"
            label="Amount"
            variant={'standard'}
            placeholder={"Add amount"}/>
          <TextField
              id="outlined-select-currency"
              select
              label="Select Unit"
              helperText="Select the unit of measurement"
              variant={'standard'}
              className={"inputBox"}
          >
            <MenuItem value="ml">ml</MenuItem>
            <MenuItem value="gram">gram</MenuItem>
            <MenuItem value="count">count</MenuItem>
          </TextField>

        </div>
        <div className="buttonContainer">
          <Tooltip title="Add ingredient to inventory" arrow>
          <Fab color="primary" aria-label="add" size={"small"}>
            <Add/>
          </Fab>
          </Tooltip>
        </div>
        </Paper>
        <Paper elevation={8} square={false} sx={{ml: 20,mt: 3, width:"500px", height:"600px", borderRadius: "20px"}}>
          <div className="inventoryHeader">
            <Typography variant="h6" gutterBottom component="h5" marginBottom={"unset"}>
              Inventory
            </Typography>
          </div>
          <Divider/>
          <div className="inventoryBody" />
          <div className="inventoryFooter" />
        </Paper>
      </div>
    </Box>
  );
}

export default Ingredients;
