import "./Signup.css";
import { useState } from "react";
import React from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { sha256 } from "js-sha256";
import { registerUser } from "../../services/UserService";
import SignupError from "../../components/SignupError/SignupError";

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  const setErrorTextAndReset = (text: string) => {
    setErrorText(text);
    setTimeout(() => {
      setErrorText("");
    }, 3000);
  };

  const handleSignupButton = () => {
    const encryptedPassword = sha256(password);

    if (username == "") return setErrorTextAndReset("Empty username!");
    if (password == "") return setErrorTextAndReset("Empty password!");

    registerUser(username, encryptedPassword).then((data) => {
      if (data?.data?.error?.code == "SQLITE_CONSTRAINT")
        return setErrorTextAndReset("Username taken!");

      navigate("/");
    });
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
      {errorText === "" ? null : <SignupError errorText={errorText} />}
    </div>
  );
}

export default Signup;
