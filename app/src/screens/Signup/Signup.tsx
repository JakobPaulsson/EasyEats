import "./Signup.css";
import { useState } from "react";
import React from "react";
import { Button, TextField, Box, Paper, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { sha256 } from "js-sha256";
import { registerUser } from "../../services/UserService";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PositionedSnackbar from "../../components/PositionedSnackbar/PositionedSnackbar";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");

  const handleSignupButton = (username: string, password: string) => {
    const encryptedPassword = sha256(password);

    registerUser(username, encryptedPassword).then((data) => {
      if (data?.data?.error) {
        setSnackbarText(data.data.error);
        setSnackbarOpen(true);
        setTimeout(() => {
          setSnackbarOpen(false);
        }, 2000);
      } else {
        setOpen(true);
        setTimeout(() => {
          navigate("/", { state: { signup: true } });
        }, 1000);
      }
    });
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
          <img src={"/logo.png"} alt="logo" style={{ width: "300px" }} />
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
            <AddCircleOutlineIcon sx={{ fontSize: 30, color: "white" }} />
          </Box>
          <Typography variant="h5">Sign Up</Typography>
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
                onClick={() => {
                  handleSignupButton(username, password);
                }}
                variant="contained"
                sx={{
                  backgroundColor: "#3aa5a6",
                }}
              >
                SIGN UP
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
                Already have an account? &nbsp;
                <Link variant="body1" href="/">
                  Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <PositionedSnackbar
        open={snackbarOpen}
        vertical={"top"}
        horizontal={"center"}
        severity="error"
        message={snackbarText}
      />
    </>
  );
}

export default Signup;
