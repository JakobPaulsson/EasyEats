import axios from "axios";
import "./Recipes.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Recipe from "../components/Recipe.js";
import Search from "../components/Search";
function Recipes() {
  const { pageNumber } = useParams();
  const [page, setPage] = useState(pageNumber);
  const ingredients = ["milk", "egg"]; // This should be dynamic based on user input
  const [recipes, setRecipes] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (search.length === 0) {
      const loadRecipes = async () => {
        try {
          const ingredientsQuery = ingredients
            .map((ing) => `ingredients=${ing}`)
            .join("&");
          const response = await axios.get(
            `http://localhost:8080/recipes/?page=${page}&${ingredientsQuery}`,
          );
          if (response && response.data) {
            setRecipes(response.data);
          } else {
            setRecipes([]);
          }
        } catch (error) {
          console.error("Failed to fetch recipes:", error);
          setRecipes([]);
        }
      };
      loadRecipes();
    } else {
      setSearch(search);
    }
  }, [page]); // Add ingredients to the dependency array

  useEffect(() => {
    setPage(pageNumber);
  }, [pageNumber]);

  const navigateToRecipe = (recipe) => {
    navigate(`/recipes/${encodeURIComponent(recipe.Title)}`, {
      state: { recipe },
    });
  };

  const recipeElements = recipes.map((recipe) => (
    <div key={recipe.Title} className="card">
      <div className="title">{recipe["Title"]}</div>
      <div className="cardContainer">
        <img
          onClick={() => navigateToRecipe(recipe)}
          className="image"
          src={recipe["ImageSrc"]}
          alt=""
        />
        <div className="completenessContainer">
          <div className="completeness">Ingredients</div>
        </div>
      </div>
    </div>
  ));

  const handlePageChange = (newPage) => {
    if (newPage > 0) {
      navigate(`/recipes/page/${newPage}`);
    }
  };

  const handleSearch = (value) => {
    console.log(value);
    if (Array.isArray(value.value)) {
      setRecipes(value.value);
    } else {
      console.error("Search response is not an array");
      setRecipes([]);
    }
    setSearch(value.query);
  };
  return (
    <div className="container">
      <Search
        string={search}
        page={page}
        handleSearch={handleSearch}
        key={page}
      ></Search>
      {currentRecipe ? (
        <Recipe recipe={currentRecipe} />
      ) : (
        <>
          <div className="cardsContainer">
            {recipeElements.length > 0 ? (
              recipeElements
            ) : (
              <p>No recipes found.</p>
            )}
          </div>
          <div className="buttonNavigationContainer">
            <button
              className="button"
              onClick={() => handlePageChange(+page - 1)}
            >
              Previous Page
            </button>
            <div>{`Page ${page}`}</div>
            <button
              className="button"
              onClick={() => handlePageChange(+page + 1)}
            >
              Next Page
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Recipes;
