import "./Login.css";
import { useState, useContext, useEffect } from "react";
import React from "react";
import {
  Button,
  TextField,
  Box,
  Paper,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import PositionedSnackbar from "../../components/PositionedSnackbar/PositionedSnackbar";
import { useNavigate, useLocation } from "react-router-dom";
import { sha256 } from "js-sha256";
import { AuthContext } from "../../contexts/AuthContext";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { login, isLoggedIn, setUserID } = authContext;
  const [successfulLogin, setSuccessfulLogin] = useState(false);
  const [unAuthorizedRoute, setUnauthorizedRoute] = useState(false);
  const { state } = useLocation();
  useEffect(() => {
    if (isLoggedIn) {
      setOpen(true);
      setTimeout(() => {
        setSuccessfulLogin(true);
      }, 1000);

      setTimeout(() => {
        setOpen(false);
        navigate("/Loading");
        setSuccessfulLogin(false);
      }, 2000);
    }
    if (state?.failed) {
      setUnauthorizedRoute(true);
      setTimeout(() => {
        setUnauthorizedRoute(false);
      }, 2000);
    }
  }, [isLoggedIn, navigate]);

  const handleLoginButton = () => {
    setOpen(true);
    const encryptedPassword = sha256(password);
    const successfulLogin = true;
    setTimeout(() => {
      //  login();
      setUserID(1);
      setOpen(false);
      // TODO set user state instead userLoggedIn
      //localStorage.setItem("userLoggedIn", JSON.stringify(true));
      if (successfulLogin) navigate("/Loading");
    }, 2000);
  };

  const handleSignupButton = () => {
    navigate("/signup");
  };

  return (
    <>
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
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
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
      <PositionedSnackbar
        open={unAuthorizedRoute}
        vertical={"top"}
        horizontal={"center"}
        severity="error"
        message="You must login to access this page "
      />
      ;
    </>
  );
}

export default Login;
