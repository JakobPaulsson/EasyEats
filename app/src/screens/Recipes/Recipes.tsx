import "./Recipes.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchSearchResults, fetchScored } from "../../services/RecipeService";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Pagination } from "@mui/material";
import Search from "../../components/Search/Search";
import { Recipe } from "../../types/recipe.interface";
import React from "react";
import PaperHeader from "../../components/PaperHeader/PaperHeader";
import RecipeCard from "../../components/RecipeCard/RecipeCard";

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
            <RecipeCard recipes={recipes} navigateToRecipe={navigateToRecipe} />
          </Container>
        </>
      </Paper>
    </div>
  );
}

export default Recipes;
