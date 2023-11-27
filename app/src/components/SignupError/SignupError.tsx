import * as React from "react";
import { Paper, Typography } from "@mui/material";

interface SignupErrorProps {
  errorText: string;
}

const SignupError = ({ errorText }: SignupErrorProps) => {
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: "20px",
      }}
      elevation={8}
    >
      <Typography sx={{ color: "red" }} variant="h5">
        {errorText}
      </Typography>
    </Paper>
  );
};
export default SignupError;
