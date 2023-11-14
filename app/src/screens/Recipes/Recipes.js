import styles from "./Recipes.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchSearchResults } from "../../services/RecipeService";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardHeader } from "@mui/material";
import { Pagination } from "@mui/material";
import Search from "../../components/Search/Search";

function Recipes() {
  const { pageNumber } = useParams();
  const [page, setPage] = useState(pageNumber);
  const [searchCount, setSearchCount] = useState(0);
  const [searchParams] = useSearchParams();
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (search) {
      fetchSearchResults(search, page).then(function response(data) {
        setRecipes(data.data.result);
        setSearchCount(data.data.count);
      });
    }
  }, [search, page]); // Add ingredients to the dependency array

  useEffect(() => {
    setPage(pageNumber);
  }, [pageNumber]);
  const navigateToRecipe = (recipe) => {
    navigate(`/recipes/${encodeURIComponent(recipe.Title)}`, {
      state: { recipe },
    });
  };

  const recipeElements = recipes.map((recipe) => (
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
      <>
        <div className="cardsContainer">
          {recipeElements.length > 0 ? (
            recipeElements
          ) : (
            <p>No recipes found.</p>
          )}
        </div>
      </>
      )
    </div>
  );
}

export default Recipes;
