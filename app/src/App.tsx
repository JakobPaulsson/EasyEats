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
import { AuthContext } from "./contexts/AuthContext";
import Loading from "./screens/Loading/Loading";
import { getIngredients } from "./services/IngredientService";

import { Route, Routes } from "react-router-dom";
import React, { useEffect, useContext } from "react";

function App() {
  const authContext = React.useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within App");
  }

  const { currentUserID } = authContext;
  useEffect(() => {
    getIngredients(currentUserID).then(function response(data) {
      localStorage.setItem("ingredients", JSON.stringify(data));
    });
  });

  const { isLoggedIn } = authContext;

  return (
    <div className="outerContainer">
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
            path="/recipes/:recipeid"
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
  );
}

export default App;
