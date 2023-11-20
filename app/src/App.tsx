import "./App.css";
import Recipes from "./screens/Recipes/Recipes";
import Dashboard from "./screens/Dashboard/Dashboard";
import Ingredients from "./screens/Ingredients/Ingredients";
import Account from "./screens/Account/Account";
import Sidebar from "./components/SideBar/Sidebar";
import Header from "./components/Header/Header";
import Recipe from "./screens/Recipe/Recipe";
import { Route, Routes } from "react-router-dom";
import React from "react";

function App() {
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
