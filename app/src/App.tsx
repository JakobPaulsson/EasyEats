import "./App.css";
import Recipes from "./screens/Recipes/Recipes";
import Login from "./screens/Login/Login";
import Signup from "./screens/Signup/Signup";
import Dashboard from "./screens/Dashboard/Dashboard";
import Ingredients from "./screens/Ingredients/Ingredients";
<<<<<<< HEAD
import Recipe from "./screens/Recipe/Recipe";
=======
>>>>>>> 962597b (Remove settings page from sidebar and rename the account page to presets)
import Presets from "./screens/Presets/Presets";
import Sidebar from "./components/SideBar/Sidebar";
import Header from "./components/Header/Header";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { AuthContext } from "./contexts/AuthContext";
import Loading from "./screens/Loading/Loading";
import { getIngredients } from "./services/IngredientService";

import { Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    getIngredients(1).then(function response(data) {
      localStorage.setItem("ingredients", JSON.stringify(data));
    });
  });

  const authContext = React.useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within App");
  }

  const { isLoggedIn } = authContext;

  return (
    <div className="outerContainer">
      {isLoggedIn && <Sidebar />}
      <div className="innerContainer">
        {isLoggedIn && <Header />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
<<<<<<< HEAD
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
=======
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/recipes/:recipeid" element={<Recipe />} />
          <Route path="/recipes/page/:pageNumber" element={<Recipes />} />
          <Route path="/presets" element={<Presets />} />
>>>>>>> 962597b (Remove settings page from sidebar and rename the account page to presets)
        </Routes>
      </div>
    </div>
  );
}

export default App;
