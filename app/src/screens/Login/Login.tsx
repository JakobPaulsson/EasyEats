import "./Login.css";
import { useState } from "react";
import React from "react";
import {
  Button,
  TextField,
  Box,
  Paper,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { sha256 } from "js-sha256";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleLoginButton = () => {
    setOpen(true);
    const encryptedPassword = sha256(password);
    const successfulLogin = true;
    setTimeout(() => {
      setOpen(false);
      if (successfulLogin) navigate("/dashboard");
    }, 2000);
  };

  const handleSignupButton = () => {
    navigate("/signup");
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "20%",
        borderRadius: "20px",
        marginTop: "10%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          rowGap: "40px",
        }}
      >
        <img src={"/logo.png"} alt="logo" style={{ width: "300px" }} />
        <TextField
          className="inputBox"
          id="filled-basic"
          label="Username"
          variant={"standard"}
          placeholder={"Enter Username..."}
          type={"text"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          data-cy={"username-field"}
        ></TextField>

        <TextField
          className="inputBox"
          id="filled-basic"
          label="Password"
          variant={"standard"}
          placeholder={"Enter Password..."}
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-cy={"password-field"}
        ></TextField>

        <Box
          sx={{
            display: "flex",
            gap: 3,
            mb: 2,
          }}
        >
          <Button onClick={handleLoginButton} variant="contained">
            LOGIN
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </Button>
          <Button onClick={handleSignupButton} variant="outlined">
            SIGNUP
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default Login;
