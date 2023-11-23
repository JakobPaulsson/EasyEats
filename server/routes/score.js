const utility = require("./utility");

module.exports = {
  initializeScoreRoute: function (app) {
    app.get("/score", async (req, res) => {
      let expectedValues = ["userID"];
      let missingParameters = utility.missingParameters(
        expectedValues,
        req.query,
      );
      if (!missingParameters.length == 0)
        res.send({ "Missing Parameters": missingParameters });

      let db = await utility.connect();
      const result = await db.all(
        `SELECT * FROM Scores WHERE userID=${req.query.userID} ORDER BY Score DESC;`,
      );
      res.send(result);
      await db.close();
    });

    app.post("/score", async (req, res) => {
      let expectedValues = ["userID"];
      let missingParameters = utility.missingParameters(
        expectedValues,
        req.query,
      );
      if (!missingParameters.length == 0)
        res.send({ "Missing Parameters": missingParameters });

      let db = await utility.connect();
      await db.run(`DELETE FROM Scores WHERE UserID=${req.query.userID}`);
      let userIngredients = await db.get(
        `SELECT Ingredients FROM Users WHERE UserID=${req.query.userID}`,
      );
      userIngredients = userIngredients["Ingredients"].split(",");

      let recipes = await db.all(`SELECT RecipeID FROM Recipes`);
      const results = [];

      let recipeIDs = recipes.map(function (d) {
        return d["RecipeID"];
      });

      let ingredientsData = await db.all(
        `SELECT CleanIngredients, Rating, CookingTimeMinutes FROM Recipes WHERE RecipeID IN (${recipeIDs.toString()})`,
      );

      let recipesIngredients = ingredientsData.map((d) =>
        d["CleanIngredients"].split(","),
      );
      let recipesScores = ingredientsData.map((d) => d["Rating"]);
      let recipesCookingTimesMinutes = ingredientsData.map(
        (d) => d["CookingTimeMinutes"],
      );
      let scores = Array(recipes.length).fill(0);
      const COOKING_TIME_MINUTES_CAP = 200,
        NO_INGREDIENTS_CAP = 10;
      const NO_METRICS = 4;
      for (var i = 0; i < recipes.length; i++) {
        let foundIngredients = [];
        let currentIngredientsScore = 0;
        let ratingScore = recipesScores[i] / 5;
        let cookingTimeScore =
          recipesCookingTimesMinutes[i] > COOKING_TIME_MINUTES_CAP
            ? 0
            : 1 - recipesCookingTimesMinutes[i] / COOKING_TIME_MINUTES_CAP;
        let recipeIngredientsScore =
          recipesIngredients[i].length > NO_INGREDIENTS_CAP
            ? 0
            : 1 - recipesIngredients[i].length / NO_INGREDIENTS_CAP;
        for (var j = 0; j < recipesIngredients[i].length; j++) {
          const currentIngredient = recipesIngredients[i][j];
          if (
            userIngredients.includes(currentIngredient) &&
            !foundIngredients.includes(currentIngredient)
          ) {
            currentIngredientsScore += 1 / userIngredients.length;
            foundIngredients.push(currentIngredient);
          }
        }

        scores[i] = Math.round(
          (100 *
            (currentIngredientsScore +
              ratingScore +
              cookingTimeScore +
              recipeIngredientsScore)) /
            NO_METRICS,
        );
      }

      let queryString = "";
      for (var i = 0; i < recipes.length; i++)
        queryString += `(${req.query.userID}, ${recipeIDs[i]}, ${scores[i]}), `;
      queryString = queryString.slice(0, -2);
      const result = await db.run(`INSERT INTO Scores VALUES ${queryString};`);
      results.push(result);
      res.send(results);
      await db.close();
    });
  },
};
