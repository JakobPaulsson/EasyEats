import * as React from "react";
import { Paper, Typography } from "@mui/material";

const RecipeError = () => {
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: "20px",
        marginTop: "200px",
      }}
      elevation={8}
    >
      <Typography sx={{ color: "red" }} variant="h5">
        Cannot display recipe
      </Typography>
    </Paper>
  );
};
export default RecipeError;
