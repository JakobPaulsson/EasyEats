import "./Recipes.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchSearchResults, fetchScored } from "../../services/RecipeService";
import { getPresets } from "../../services/PresetService";
import { setSelectedPreset } from "../../services/UserService";
import { updateScores } from "../../services/ScoreService";
import { Paper, Box, Container, Pagination, Tooltip } from "@mui/material";
import Search from "../../components/Search/Search";
import { Recipe } from "../../types/recipe.interface";
import React from "react";
import { AuthContext } from "../../contexts/AuthContext";
import PedalBikeIcon from "@mui/icons-material/PedalBike";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import DownhillSkiingIcon from "@mui/icons-material/DownhillSkiing";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { Divider, Typography } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface ItemInterface {
  Name: string;
  Icon: string;
  Color: string;
}

function Recipes() {
  const { pageNumber } = useParams();
  const [page, setPage] = useState<string | undefined>(pageNumber);
  const [searchCount, setSearchCount] = useState(0);
  const [searchParams] = useSearchParams();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [presetIcons, setPresetIcons] = useState<any>();
  const navigate = useNavigate();
  const [selected, setSelected] = React.useState("Skiing");

  const authContext = React.useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within App");
  }

  const { currentUserID } = authContext;
  useEffect(() => {
    if (search) {
      fetchSearchResults(search, page, currentUserID).then(
        function response(data) {
          if (data) {
            setRecipes(data.data.result);
            setSearchCount(data.data.count);
          }
        },
      );
    } else {
      fetchScored(
        (parseInt(page as string) - 1).toString(),
        currentUserID,
      ).then(function response(data) {
        if (data) {
          setRecipes(data.data.result);
          setSearchCount(data.data.count);
        }
      });
    }
  }, [search, page]); // Add ingredients to the dependency array

  const handlePresetClick = (item: any) => {
    setSelectedPreset(currentUserID, item.Name).then(() => {
      updateScores(currentUserID).then(() => {
        fetchScored(
          (parseInt(page as string) - 1).toString(),
          currentUserID,
        ).then(function response(data) {
          if (data) {
            setRecipes(data.data.result);
            setSearchCount(data.data.count);
          }
        });
      });
    });
  };

  const getAndSetPresetIcons = () => {
    getPresets(currentUserID).then(function response(data) {
      const query = data?.data?.query;
      setPresetIcons(
        query.map((item: ItemInterface) => {
          const propPack = {
            sx: {
              cursor: "pointer",
              fontSize: 40,
              color: `#${item.Color}`,
            },
          };

          const iconMapping: Record<string, JSX.Element> = {
            PedalBikeIcon: <PedalBikeIcon {...propPack} />,
            BeachAccessIcon: <BeachAccessIcon {...propPack} />,
            DownhillSkiingIcon: <DownhillSkiingIcon {...propPack} />,
            RestaurantIcon: <RestaurantIcon {...propPack} />,
            RestaurantMenuIcon: <RestaurantMenuIcon {...propPack} />,
          };

          return (
            <Tooltip title={item.Name}>
              <ToggleButton
                value="Pedal"
                aria-label="yeah"
                onClick={() => handlePresetClick(item)}
              >
                {iconMapping[item.Icon]}
              </ToggleButton>
            </Tooltip>
          );
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
    localStorage.setItem("recipe", JSON.stringify(recipe));
    navigate(`/recipe`);
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ToggleButtonGroup
              value={selected}
              exclusive
              sx={{
                height: "48px",
              }}
            >
              {presetIcons}
            </ToggleButtonGroup>
            <Typography
              variant="subtitle1"
              sx={{
                color: "rgba(0, 0, 0, 0.54)",
                ml: 1,
              }}
            >
              Presets
            </Typography>
          </Box>
          <Search
            currentSearch={search}
            handleSearch={handleSearch}
            key={page}
          ></Search>
        </Box>
        <Divider />
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
            }}
          ></Box>
        </Box>
        <>
          <Container>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination
                count={Math.floor(searchCount / 8)}
                variant="outlined"
                onChange={(_, page: number) => handlePageChange(page)}
              />
            </Box>
            <RecipeCard recipes={recipes} navigateToRecipe={navigateToRecipe} />
          </Container>
        </>
      </Paper>
    </div>
  );
}

export default Recipes;
