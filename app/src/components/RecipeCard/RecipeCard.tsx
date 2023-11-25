import React from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  Box,
  CardContent,
  CardMedia,
  Container,
  Typography,
  Tooltip,
  Paper,
  Button,
} from "@mui/material";
import { Recipe } from "../../types/recipe.interface";
import { FaGrinStars } from "react-icons/fa";

import {
  PiNumberCircleOne,
  PiNumberCircleTwo,
  PiNumberCircleThree,
  PiNumberCircleFour,
  PiNumberCircleFive,
  PiNumberCircleSix,
  PiNumberCircleSeven,
  PiNumberCircleEight,
  PiNumberCircleNine,
} from "react-icons/pi";
import { FaSadCry } from "react-icons/fa";

interface RecipeCardProps {
  recipes: Recipe[];
  navigateToRecipe: (recipe: Recipe) => void;
}

const checkIfIngriedientsMatch = (recipe: Recipe) => {
  const storagIngredients = localStorage.getItem("ingredients");
  if (!storagIngredients || storagIngredients.length === 0) {
    return [];
  }
  const storageIngredients: Array<string> =
    JSON.parse(storagIngredients).data.ingredients;
  const recipeIngredients: Array<string> =
    recipe["CleanIngredients"].split(",");
  const missingIngredients: Array<string> = [];
  recipeIngredients.forEach((recipeIngredient) => {
    if (!storageIngredients.includes(recipeIngredient)) {
      missingIngredients.push(recipeIngredient);
    }
  });
  return missingIngredients;
};

const cardIcon = (recipe: Recipe) => {
  const missingIngredients = checkIfIngriedientsMatch(recipe);

  const style = {
    color: "gray",
    fontSize: "1.5rem",
  } as React.CSSProperties;

  switch (missingIngredients.length) {
    case 0:
      return (
        <FaGrinStars
          style={{
            color: "yellow",
            fontSize: "1.5rem",
          }}
        />
      );
    case 1:
      return <PiNumberCircleOne style={style} />;
    case 2:
      return <PiNumberCircleTwo style={style} />;
    case 3:
      return <PiNumberCircleThree style={style} />;
    case 4:
      return <PiNumberCircleFour style={style} />;
    case 5:
      return <PiNumberCircleFive style={style} />;
    case 6:
      return <PiNumberCircleSix style={style} />;
    case 7:
      return <PiNumberCircleSeven style={style} />;
    case 8:
      return <PiNumberCircleEight style={style} />;
    case 9:
      return <PiNumberCircleNine style={style} />;
    default:
      return (
        <FaSadCry
          style={{
            color: "gray",
            fontSize: "1.5rem",
          }}
        />
      );
  }
};

const RecipeCard = ({ recipes, navigateToRecipe }: RecipeCardProps) => {
  const recipeElements = recipes.map((recipe) => (
    <Card variant="outlined" sx={{ maxWidth: 245 }}>
      <CardActionArea onClick={() => navigateToRecipe(recipe)}>
        <CardMedia sx={{ height: 140 }} image={recipe["ImageSrc"]}></CardMedia>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              Match: {recipe["Score"]}%
            </Typography>
            <Tooltip
              title={
                <span style={{ whiteSpace: "pre-line" }}>
                  {checkIfIngriedientsMatch(recipe).length > 0
                    ? "Some ingredients are missing: \n" +
                      "• " +
                      checkIfIngriedientsMatch(recipe).join("\n • ")
                    : "You have all the ingredients!"}
                </span>
              }
              followCursor
              onMouseOver={() => console.log("cock")}
            >
              <Box>{cardIcon(recipe)}</Box>
            </Tooltip>
          </Box>
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
        ></CardActions>
      </CardActionArea>
    </Card>
  ));

  return (
    <div className="container">
      <Paper
        elevation={12}
        sx={{
          height: "100%",
          borderRadius: "10px",
        }}
      >
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
};
export default RecipeCard;
