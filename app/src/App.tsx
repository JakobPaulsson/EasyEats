import "./App.css";
import Recipes from "./screens/Recipes/Recipes";
import Dashboard from "./screens/Dashboard/Dashboard";
import Ingredients from "./screens/Ingredients/Ingredients";
import Account from "./screens/Account/Account";
import Sidebar from "./components/SideBar/Sidebar";
import Header from "./components/Header/Header";
import Recipe from "./screens/Recipe/Recipe";
import { getIngredients } from "./services/IngredientService";
import { Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    getIngredients(1).then(function response(data) {
      localStorage.setItem("ingredients", JSON.stringify(data));
    });
  });

  return (
    <div className="outerContainer">
      <Sidebar />
      <div className="innerContainer">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/recipes/:recipeid" element={<Recipe />} />
          <Route path="/recipes/page/:pageNumber" element={<Recipes />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
