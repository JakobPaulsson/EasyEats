import React, { useContext } from "react";
import "./Dashboard.css";
import {
  Card,
  Box,
  Container,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
import { fetchScored } from "../../services/RecipeService";
import { Recipe } from "../../types/recipe.interface";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

function Dashboard() {
  const [recipes, setRecipes] = React.useState<any>([]);
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("Authcontext in Presets");
  }
  const { currentUserID } = userContext;

  const navigateToRecipe = (recipe: Recipe) => {
    localStorage.setItem("recipe", JSON.stringify(recipe));
    navigate(`/recipe`);
  };

  const createRecipeElements = (recipes: Array<Recipe>) => {
    return recipes.map((recipe: Recipe) => (
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          padding: "5px",
        }}
      >
        <CardActionArea
          onClick={() => navigateToRecipe(recipe)}
          sx={{
            display: "flex",
          }}
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "200px",
            }}
          >
            <Typography gutterBottom>{recipe.Title}</Typography>
            <Typography gutterBottom>{"todo"}</Typography>
          </Container>
          <CardMedia
            sx={{ height: 140, width: 140 }}
            image={recipe.ImageSrc}
            title={"test"}
          />
        </CardActionArea>
      </Card>
    ));
  };

  React.useEffect(() => {
    fetchScored("0", currentUserID).then(function response(data) {
      if (data) {
        setRecipes(createRecipeElements(data.data.result.slice(0, 3)));
      }
    });
  }, []);

  return (
    <Container
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        padding: "50px",
        gap: "20px",
        marginLeft: "50px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "30px",
        }}
      >
        <Typography variant="h5">Top Recipes</Typography>
        {recipes}
      </Box>
    </Container>
  );
}

export default Dashboard;
