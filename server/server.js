const express = require("express");
const cors = require("cors");
const app = express();
const score = require("./routes/score")
const user = require("./routes/user")
const ingredient = require("./routes/ingredient")
const recipes = require("./routes/recipes")
const suggestions = require("./routes/suggestions")

app.use(cors());
app.listen(8080, () => {
  console.log("server listening on port 8080");
});

score.initializeScoreRoute(app)
user.initializeUserRoute(app)
ingredient.initializeIngredientRoute(app)
recipes.initializeRecipesRoute(app)
suggestions.initializeSuggestionsRoute(app)