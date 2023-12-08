import "./Login.css";
import logo from "../../assets/logo.png";
import { useState, useContext, useEffect } from "react";
import React from "react";
import {
  Button,
  TextField,
  Box,
  Paper,
  Backdrop,
  CircularProgress,
  Typography,
  Link,
} from "@mui/material";
import PositionedSnackbar from "../../components/PositionedSnackbar/PositionedSnackbar";
import { useNavigate, useLocation } from "react-router-dom";
import { sha256 } from "js-sha256";
import { AuthContext } from "../../contexts/AuthContext";
import { loginUser } from "../../services/UserService";
import { MdLockOutline } from "react-icons/md";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { isLoggedIn, setUserID } = authContext;
  const [successfulLogin, setSuccessfulLogin] = useState(false);
  const [unAuthorizedRoute, setUnauthorizedRoute] = useState(false);
  const [failedLogin, setFailedLogin] = useState(false);
  const [successfulSignup, setSuccessfulSignup] = useState(false);
  const { state } = useLocation();
  useEffect(() => {
    if (isLoggedIn) {
      setOpen(true);
      setTimeout(() => {
        setSuccessfulLogin(true);
      }, 500);

      setTimeout(() => {
        setOpen(false);
        navigate("/Loading");
        setSuccessfulLogin(false);
      }, 500);
    }
    if (state?.failed) {
      setUnauthorizedRoute(true);
      setTimeout(() => {
        setUnauthorizedRoute(false);
      }, 500);
    }

    if (state?.signup) {
      setSuccessfulSignup(true);
      setTimeout(() => {
        setSuccessfulSignup(false);
      }, 500);
    }
  }, [isLoggedIn, navigate]);

  const handleLoginButton = async () => {
    setOpen(true);
    const encryptedPassword = sha256(password);
    try {
      setOpen(true);
      const response = await loginUser(username, encryptedPassword);
      setTimeout(() => {
        if (response && response.data && !response.data.error) {
          setUserID(response.data.userID.UserID);
          setOpen(false);
          navigate("/Loading");
        } else {
          setFailedLogin(true);
          setOpen(false);
        }
      }, 500);
    } catch (error) {
      setOpen(false);
    }
  };

  const handleSignupButton = () => {
    navigate("/signup");
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: "25%",
          borderRadius: "20px",
          marginTop: "8%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            mb: 2,
            rowGap: "20px",
          }}
        >
          <img src={logo} alt="logo" style={{ width: "300px" }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f50057",
              borderRadius: "50%",
              height: "45px",
              width: "45px",
            }}
          >
            <MdLockOutline style={{ fontSize: 30, color: "white" }} />
          </Box>
          <Typography variant="h5">Login</Typography>
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Button
                onClick={handleLoginButton}
                variant="contained"
                sx={{
                  backgroundColor: "#3aa5a6",
                }}
              >
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
              <Typography
                variant="body1"
                sx={{
                  mt: 2,
                }}
              >
                Don't have an account? &nbsp;
                <Link
                  variant="body1"
                  onClick={() => navigate("/signup")}
                  href="#"
                >
                  Sign up
                </Link>
              </Typography>
            </Box>
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
      <PositionedSnackbar
        open={failedLogin}
        vertical={"top"}
        horizontal={"center"}
        severity="error"
        message="Invalid username or password"
      />
      <PositionedSnackbar
        open={successfulSignup}
        vertical={"top"}
        horizontal={"center"}
        severity="success"
        message="Signup successful"
      />
    </>
  );
}

export default Login;
