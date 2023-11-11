import styles from "./Ingredients.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function Ingredients() {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { mt: 5, ml: 10, width: "45ch" },
        "  .MuiButton-root": {
          mt: 5,
          ml: 15,
          width: "15ch",
          height: "8ch",
          borderRadius: "10px",
          textTransform: "none",
        },
      }}
      noValidate
      autoComplete="off"
    >
      {" "}
      <div className="pageContainer">
        <div className="addIngredientsContainer">
          <TextField
            className="inputBox"
            id="filled-basic"
            label="Add Ingredient..."
            variant="filled"
          />
          <TextField
            className="inputBox"
            id="filled-basic"
            label="Amount..."
            variant="filled"
          />
          <TextField
            className="inputBox"
            id="filled-basic"
            label="Unit..."
            variant="filled"
          />
          <div className="buttonContainer">
            <Button
              className="inventoryButton"
              variant="contained"
              color="primary"
            >
              Add
            </Button>
            <Button
              className="inventoryButton"
              variant="contained"
              color="error"
            >
              Remove
            </Button>
          </div>
        </div>
        <div className="inventoryContainer">
          <div className="inventoryHeader" />
          <div className="inventoryBody" />
          <div className="inventoryFooter" />
        </div>
      </div>
    </Box>
  );
}

export default Ingredients;
