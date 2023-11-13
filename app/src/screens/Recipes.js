import axios from "axios";
import styles from "./Recipes.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchSearchResults, fetchScored } from "../services/RecipeService";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardHeader } from "@mui/material";
import { Pagination } from "@mui/material";
import PaginationItem from "@mui/material/PaginationItem";
import Recipe from "./Recipe.js";
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
    if (search) {
      fetchSearchResults(search, page).then(function response(data) {
        setRecipes(data.data.result);
        setSearchCount(data.data.count);
      });
    } else {
      fetchScored(page).then(function response(data) {
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

  const recipeElements2 = recipes.map((recipe) => (
    <Card variant="outlined" sx={{ maxWidth: 245 }}>
      {recipe["Score"] ? (
        <CardHeader title={`Score ${recipe["Score"]}`} />
      ) : null}
      <CardActionArea onClick={() => navigateToRecipe(recipe)}>
        <CardMedia
          sx={{ height: 140 }}
          image={recipe["ImageSrc"]}
          title={recipe["Title"]}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {recipe["Title"]}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap={true}>
            {recipe["Instructions"]}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </CardActionArea>
    </Card>
  ));

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

  const handlePageChange = (event, page) => {
    if (page > 0) {
      if (!search) {
        navigate(`/recipes/page/${page}`);
      } else {
        if (searchCount / page > 8)
          navigate(`/recipes/page/${page}?search=${page}`);
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
  };
  return (
    <div className="container">
      <Search
        className={styles.searchBar}
        string={search}
        page={page}
        currentSearch={search}
        handleSearch={handleSearch}
        key={page}
      ></Search>
      <div className="buttonNavigationContainer">
        <Pagination
          count={Math.floor(searchCount / 8)}
          variant="outlined"
          onChange={handlePageChange}
        />
      </div>
      {currentRecipe ? (
        <Recipe recipe={currentRecipe} />
      ) : (
        <>
          <div className="cardsContainer">
            {recipeElements2.length > 0 ? (
              recipeElements2
            ) : (
              <p>No recipes found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Recipes;
