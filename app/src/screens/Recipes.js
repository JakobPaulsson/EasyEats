import axios from "axios";
import "./Recipes.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation, useSearchParams } from "react-router-dom";
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
      fetchSearchResults(search).then(r => setRecipes(r));
    }
  }, [page]); // Add ingredients to the dependency array

  useEffect(() => {
    setPage(pageNumber);
  }, [pageNumber]);

  const fetchSearchResults = async (string) => {
    try {
      console.log(string);
      const ingredientsQuery = `title=${string}`;
      console.log(ingredientsQuery);
      const response = await axios.get(
          `http://localhost:8080/recipes/search?page=${page}&${ingredientsQuery}`,
      );
      if (response && response.data) {
        setSearchCount(response.data.count[0]["COUNT(*)"]);
        console.log(searchCount);
        return response.data.result;
      }
    } catch (error) {
      console.error("Failed to fetch search query", error);
    }
  };

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
    console.log(search)
    if (newPage > 0) {
      if(!search) {
        navigate(`/recipes/page/${newPage}`);
      }
      else {
        if(searchCount/newPage > 8)
        navigate(`/recipes/page/${newPage}?search=${search}`)
      }
    }
  }

  const handleSearch = async (value) => {
    const searchResults = await fetchSearchResults(value.searchValue);
    setRecipes(searchResults);
    setSearch(value.searchValue);
    setPage(1);
    navigate(`/recipes/page/${1}?search=${value.searchValue}`);
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
      {searchCount > 0? (<h3>Total results: {searchCount}</h3>) : null}
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
