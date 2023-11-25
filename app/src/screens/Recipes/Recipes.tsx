import "./Recipes.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchSearchResults, fetchScored } from "../../services/RecipeService";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Pagination } from "@mui/material";
import { getPresets } from "../../services/PresetService";
import { setSelectedPreset } from "../../services/UserService";
import { updateScores } from "../../services/ScoreService";

import {
  Card,
  Paper,
  Box,
  Container,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardActionArea,
  Pagination,
} from "@mui/material";
import Search from "../../components/Search/Search";
import { Recipe } from "../../types/recipe.interface";
import React from "react";
import PaperHeader from "../../components/PaperHeader/PaperHeader";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import PedalBikeIcon from "@mui/icons-material/PedalBike";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import DownhillSkiingIcon from "@mui/icons-material/DownhillSkiing";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

function Recipes() {
  const { pageNumber } = useParams();
  const [page, setPage] = useState<string | undefined>(pageNumber);
  const [searchCount, setSearchCount] = useState(0);
  const [searchParams] = useSearchParams();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [presetIcons, setPresetIcons] = useState();
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

  const handlePresetClick = (item: any) => {
    setSelectedPreset(1, item.Name).then(() => {
      console.log(page);
      updateScores(1).then(() => {
        fetchScored(page).then(function response(data) {
          if (data) {
            setRecipes(data.data.result);
            setSearchCount(data.data.count);
          }
        });
      });
    });
  };

  const getAndSetPresetIcons = () => {
    getPresets(1).then(function response(data) {
      const query = data?.data?.query;
      setPresetIcons(
        query.map((item: any) => {
          switch (item.Icon) {
            case "PedalBikeIcon":
              return (
                <PedalBikeIcon
                  onClick={() => {
                    handlePresetClick(item);
                  }}
                  sx={{
                    cursor: "pointer",
                    fontSize: 40,
                    color: `#${item.Color}`,
                  }}
                />
              );
            case "BeachAccessIcon":
              return (
                <BeachAccessIcon
                  onClick={() => {
                    handlePresetClick(item);
                  }}
                  sx={{
                    cursor: "pointer",
                    fontSize: 40,
                    color: `#${item.Color}`,
                  }}
                />
              );
            case "DownhillSkiingIcon":
              return (
                <DownhillSkiingIcon
                  onClick={() => {
                    handlePresetClick(item);
                  }}
                  sx={{
                    cursor: "pointer",
                    fontSize: 40,
                    color: `#${item.Color}`,
                  }}
                />
              );
            case "RestaurantIcon":
              return (
                <RestaurantIcon
                  onClick={() => {
                    handlePresetClick(item);
                  }}
                  sx={{
                    cursor: "pointer",
                    fontSize: 40,
                    color: `#${item.Color}`,
                  }}
                />
              );
            case "RestaurantMenuIcon":
              return (
                <RestaurantMenuIcon
                  onClick={() => {
                    handlePresetClick(item);
                  }}
                  sx={{
                    cursor: "pointer",
                    fontSize: 40,
                    color: `#${item.Color}`,
                  }}
                />
              );
            default:
              return null;
          }
        }),
      );
    });
  };

  useEffect(() => {
    setPage(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    getAndSetPresetIcons();
  }, []);

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
            Match: {recipe["Score"]}%
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
            justifyContent: "space-between",
            alignItems: "center",
            mb: "20px",
            marginLeft: "65px",
            marginRight: "65px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              mt: 1,
              gap: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography gutterBottom variant="h5" component="div">
                Presets
              </Typography>
              <Paper
                elevation={6}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  padding: "5px",
                }}
              >
                {presetIcons}
              </Paper>
            </Box>
          </Box>
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
