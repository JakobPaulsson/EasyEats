import "./Recipes.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchSearchResults, fetchScored } from "../../services/RecipeService";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Pagination } from "@mui/material";
import Search from "../../components/Search/Search";
import { Recipe } from "../../types/recipe.interface";
import React from "react";
import PaperHeader from "../../components/PaperHeader/PaperHeader";

function Recipes() {
  const { pageNumber } = useParams();
  const [page, setPage] = useState<string | undefined>(pageNumber);
  const [searchCount, setSearchCount] = useState(0);
  const [searchParams] = useSearchParams();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (search) {
      fetchSearchResults(search, page).then(function response(data) {
        if (data) {
          setRecipes(data.data.result);
          setSearchCount(data.data.count);
        }
      });
    } else {
      fetchScored(page).then(function response(data) {
        if (data) {
          setRecipes(data.data.result);
          setSearchCount(data.data.count);
        }
      });
    }
  }, [search, page]); // Add ingredients to the dependency array

  useEffect(() => {
    setPage(pageNumber);
  }, [pageNumber]);
  const navigateToRecipe = (recipe: Recipe) => {
    navigate(`/recipes/${encodeURIComponent(recipe.Title)}`, {
      state: { recipe },
    });
  };

  const recipeElements = recipes.map((recipe) => (
    <Card variant="outlined" sx={{ maxWidth: 245 }}>
      <CardActionArea onClick={() => navigateToRecipe(recipe)}>
        <CardMedia
          sx={{ height: 140 }}
          image={recipe["ImageSrc"]}
          title={recipe["Title"]}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Score:{recipe["Score"]}
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            noWrap={true}
          >
            {recipe["Title"]}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap={true}>
            {recipe["Instructions"]}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Button size="small">Learn More</Button>
        </CardActions>
      </CardActionArea>
    </Card>
  ));

  const handlePageChange = (page: number) => {
    if (page > 0) {
      if (!search) {
        navigate(`/recipes/page/${page}`);
      } else {
        if (searchCount / page > 8)
          navigate(`/recipes/page/${page}?search=${page}`);
      }
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    navigate(`/recipes/page/${1}?search=${value}`);
  };
  return (
    <div className="container">
      <Paper
        elevation={12}
        sx={{
          width: "80%",
          height: "80%",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <PaperHeader title="Recipes" />
          <Search
            currentSearch={search}
            handleSearch={handleSearch}
            key={page}
          ></Search>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: "20px",
          }}
        >
          <Pagination
            count={Math.floor(searchCount / 8)}
            variant="outlined"
            onChange={(_, page: number) => handlePageChange(page)}
          />
        </Box>
        <>
          <Container>
            <div className="cardsContainer">
              {recipeElements.length > 0 ? (
                recipeElements
              ) : (
                <p>No recipes found.</p>
              )}
            </div>
          </Container>
        </>
      </Paper>
    </div>
  );
}

export default Recipes;
