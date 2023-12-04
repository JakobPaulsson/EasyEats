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
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import PedalBikeIcon from "@mui/icons-material/PedalBike";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import DownhillSkiingIcon from "@mui/icons-material/DownhillSkiing";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { Divider } from "@mui/material";
import Tab from "@mui/material/Tab";
import { TabContext, TabList } from "@mui/lab";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

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

  const [tabValue, setTabValue] = React.useState("1");
  const handleTabSwitch = (_: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const handlePresetClick = (item: any) => {
    setSelectedPreset(currentUserID, item.Name).then(() => {
      updateScores(currentUserID).then(() => {
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
    getPresets(currentUserID).then(function response(data) {
      const query = data?.data?.query;
      setPresetIcons(
        query.map((item: any) => {
          switch (item.Icon) {
            case "PedalBikeIcon":
              return (
                <ToggleButton value="Pedal" aria-label="yeah">
                  <PedalBikeIcon
                    sx={{
                      cursor: "pointer",
                      fontSize: 40,
                      color: `#${item.Color}`,
                    }}
                    onClick={() => handlePresetClick(item)}
                  />
                </ToggleButton>
              );
            case "BeachAccessIcon":
              return (
                <ToggleButton
                  value="Beach"
                  sx={{
                    width: "10px",
                  }}
                >
                  <BeachAccessIcon
                    sx={{
                      cursor: "pointer",
                      fontSize: 40,
                      color: `#${item.Color}`,
                    }}
                    onClick={() => handlePresetClick(item)}
                  />
                </ToggleButton>
              );
            case "DownhillSkiingIcon":
              return (
                <ToggleButton value="Skiing" aria-label="">
                  <DownhillSkiingIcon
                    sx={{
                      cursor: "pointer",
                      fontSize: 40,
                      color: `#${item.Color}`,
                    }}
                    onClick={() => handlePresetClick(item)}
                  />
                </ToggleButton>
              );
            case "RestaurantIcon":
              return (
                <ToggleButton value="Restaurant">
                  <RestaurantIcon
                    sx={{
                      cursor: "pointer",
                      fontSize: 40,
                      color: `#${item.Color}`,
                    }}
                    onClick={() => handlePresetClick(item)}
                  />
                </ToggleButton>
              );
            case "RestaurantMenuIcon":
              return (
                <ToggleButton value="RestaurantMenu">
                  <RestaurantMenuIcon
                    sx={{
                      cursor: "pointer",
                      fontSize: 40,
                      color: `#${item.Color}`,
                    }}
                    onClick={() => handlePresetClick(item)}
                  />
                </ToggleButton>
              );
            default:
              return null;
          }
        })
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

  const handleSelected = (
    _: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setSelected(newAlignment || "0");
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
          <TabContext value={tabValue}>
            <Box>
              <TabList onChange={handleTabSwitch}>
                <Tab label="All Recipes" value="1" />
                <Tab label="Matches" value="2" />
              </TabList>
            </Box>
          </TabContext>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Tooltip title="Select preset">
              <ToggleButtonGroup
                value={selected}
                onChange={handleSelected}
                exclusive
                sx={{
                  height: "48px",
                }}
              >
                {presetIcons}
              </ToggleButtonGroup>
            </Tooltip>
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
