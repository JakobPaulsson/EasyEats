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
function AddIngredient() {
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
            />
            <TextField
              className="inputBox"
              id="filled-basic"
              label="Amount"
              variant={"standard"}
              placeholder={"Add amount"}
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Select Unit"
              helperText="Select the unit of measurement"
              variant={"standard"}
              className={"inputBox"}
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
              <Fab color="primary" aria-label="add" size={"small"}>
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
