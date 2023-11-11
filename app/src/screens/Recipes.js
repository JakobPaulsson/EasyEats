import axios from "axios";
import "./Recipes.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchRecipes, fetchSearchResults } from "../services/RecipeService";
import Recipe from "../components/Recipe.js";
import Search from "../components/Search";
function Recipes() {
  const { pageNumber } = useParams();
  const [page, setPage] = useState(pageNumber);
  const [searchCount, setSearchCount] = useState(0);
  const [searchParams] = useSearchParams();
  const ingredients = ["milk", "egg"]; // This should be dynamic based on user input
  const [recipes, setRecipes] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (search.length === 0) {
      fetchRecipes(ingredients, page).then((r) => setRecipes(r.data));
    } else {
      fetchSearchResults(search, page).then(function response(data) {
        setRecipes(data.data.result);
        setSearchCount(data.data.count);
      });
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
      if (!search) {
        navigate(`/recipes/page/${newPage}`);
      } else {
        if (searchCount / newPage > 8)
          navigate(`/recipes/page/${newPage}?search=${search}`);
      }
    }
  };

  const handleSearch = async (value) => {
    const searchResults = await fetchSearchResults(value.searchValue, page);
    setSearchCount(searchResults.data.count);
    setRecipes(searchResults.data.result);
    setSearch(value.searchValue);
    setPage(1);
    navigate(`/recipes/page/${1}?search=${value.searchValue}`);
    console.log(searchCount);
  };
  return (
    <div className="container">
      <Search
        string={search}
        page={page}
        currentSearch={search}
        handleSearch={handleSearch}
        key={page}
      ></Search>
      {searchCount > 0 ? <h3>Total results: {searchCount}</h3> : null}
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
