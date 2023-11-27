import "./Signup.css";
import { useState, useEffect } from "react";
import React from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { sha256, sha224 } from "js-sha256";

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handlePageChange = (page: number) => {
    if (page > 0) {
      setUsername(username);
    }
  };

  const handleUsername = (value: string) => {
    setUsername(username);
  };

  const handlePassword = (value: string) => {
    setPassword(password);
  };

  const handleSignupButton = () => {
    const encryptedPassword = sha256(password);
    console.log(encryptedPassword);
    const successfulSignup = false;
    if (successfulSignup) {
      navigate("/");
    }
  };

  const handleLoginButton = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <img src={"/logo.png"} alt="logo" style={{ width: "400px" }} />
      <TextField
        className="inputBox"
        id="filled-basic"
        label="Your Username"
        variant={"standard"}
        placeholder={"Enter Your Username..."}
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
        placeholder={"Enter Your Password..."}
        type={"password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        data-cy={"password-field"}
      ></TextField>

      <Button onClick={handleSignupButton} variant="contained">
        SIGNUP
      </Button>
      <Button onClick={handleLoginButton} variant="outlined">
        LOGIN
      </Button>
    </div>
  );
}

export default Signup;
