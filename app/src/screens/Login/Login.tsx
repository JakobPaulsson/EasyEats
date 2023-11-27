  import "./Login.css";
  import { useState, useEffect } from "react";
  import React from "react";
  import { Button, TextField } from "@mui/material";
  import { useNavigate } from "react-router-dom";
  import { sha256, sha224 } from 'js-sha256';

  function Login() {
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

    const handleLoginButton = () => {
      const encryptedPassword = sha256(password);
      console.log(encryptedPassword)
      const successfulLogin = true;
      if(successfulLogin)
        navigate("/dashboard");
    }

    const handleSignupButton = () => {
      navigate("/signup");
    }

    return (
      <div className="container">
      <img src={"/logo.png"} alt="logo" style={{width: "400px"}} />
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

        <Button
          onClick={handleLoginButton}
          variant="contained"
        >
          LOGIN
        </Button>
        <Button
          onClick={handleSignupButton}
          variant="outlined"
        >
          SIGNUP
        </Button>
      </div>
    );
  }

  export default Login;
