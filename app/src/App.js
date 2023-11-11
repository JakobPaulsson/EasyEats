import "./App.css";
import Recipes from "./screens/Recipes";
import Dashboard from "./screens/Dashboard";
import Ingredients from "./screens/Ingredients";
import Account from "./screens/Account";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Recipe from "./components/Recipe";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="outerContainer">
      <Sidebar />
      <div className="innerContainer">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/recipes/:recipe" element={<Recipe />} />
          <Route path="/recipes/page/:pageNumber" element={<Recipes />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
