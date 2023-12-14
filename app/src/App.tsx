import "./App.css";
import Recipes from "./screens/Recipes/Recipes";
import Login from "./screens/Login/Login";
import Signup from "./screens/Signup/Signup";
import Dashboard from "./screens/Dashboard/Dashboard";
import Ingredients from "./screens/Ingredients/Ingredients";
import Recipe from "./screens/Recipe/Recipe";
import Presets from "./screens/Presets/Presets";
import Sidebar from "./components/SideBar/Sidebar";
import Header from "./components/Header/Header";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { UserContext } from "./contexts/UserContext";
import Loading from "./screens/Loading/Loading";
import { getIngredients } from "./services/IngredientService";
import { Helmet } from "react-helmet";
import { BrowserView, MobileView } from "react-device-detect";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import logo from "./assets/logo.png";

import { Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";

function App() {
  const userContext = React.useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within App");
  }

  const { currentUserID } = userContext;
  useEffect(() => {
    if (!currentUserID) return;
    getIngredients(currentUserID).then(function response(data) {
      localStorage.setItem("ingredients", JSON.stringify(data));
    });
  });

  const { isLoggedIn } = userContext;

  return (
    <>
      <BrowserView>
        <div className="outerContainer">
          <Helmet>
            <title>PlatePilot</title>
            <meta
              name="description"
              content="Recipe matching based on your ingredients."
            />
          </Helmet>

          {isLoggedIn && <Sidebar />}
          <div className="innerContainer">
            {isLoggedIn && <Header />}
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/loading" element={<Loading />} />
              <Route
                path="/dashboard"
                element={<ProtectedRoute element={<Dashboard />} />}
              />
              <Route
                path="/ingredients"
                element={<ProtectedRoute element={<Ingredients />} />}
              />
              <Route
                path="/recipe"
                element={<ProtectedRoute element={<Recipe />} />}
              />
              <Route
                path="/recipes/page/:pageNumber"
                element={<ProtectedRoute element={<Recipes />} />}
              />
              <Route
                path="/presets"
                element={<ProtectedRoute element={<Presets />} />}
              />
            </Routes>
          </div>
        </div>
      </BrowserView>
      <MobileView>
        <Container maxWidth="sm">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src={logo}
              sx={{
                width: "300px",
                height: "auto",
              }}
            ></Box>
            <h2>Sorry, PlatePilot is not available on mobile devices.</h2>
            <h3>Please visit us on a desktop or laptop computer.</h3>
          </Box>
        </Container>
      </MobileView>
    </>
  );
}

export default App;
