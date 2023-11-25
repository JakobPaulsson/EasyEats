const utility = require("./utility");
const COOKING_TIME_MINUTES_CAP = 200;
const NO_INGREDIENTS_CAP = 10;

async function getUserIngredients(db, userID) {
  let userIngredients = await db.get(
    `SELECT Ingredients FROM Users WHERE UserID=${userID}`,
  );
  return userIngredients["Ingredients"].split(",");
}

async function getRecipeIDs(db) {
  let recipes = await db.all(`SELECT RecipeID FROM Recipes`);
  let recipeIDs = recipes.map(function (d) {
    return d["RecipeID"];
  });
  return recipeIDs;
}

async function getCoefficients(db, userID) {
  const presetQuery = await db.get(
    `SELECT SelectedPreset FROM Users WHERE UserID=${userID};`,
  );
  const presetName = presetQuery.SelectedPreset;

  let coefficients = {
    rating: 1,
    cookingTime: 1,
    commonIngredients: 1,
    numberOfIngredients: 1,
  };

  if (presetName != "") {
    const query = await db.get(
      `SELECT RatingMetric, CookingTimeMetric, CommonIngredientsMetric, NumberOfIngredientsMetric FROM Presets WHERE UserID=${userID} AND Name='${presetName}';`,
    );
    coefficients.rating = query["RatingMetric"];
    coefficients.cookingTime = query["CookingTimeMetric"];
    coefficients.commonIngredients = query["CommonIngredientsMetric"];
    coefficients.numberOfIngredients = query["NumberOfIngredientsMetric"];
  }

  return coefficients;
}

async function calculateScores(db, userID, coefficients, recipeIDs) {
  await db.run(`DELETE FROM Scores WHERE UserID=${userID}`);
  let userIngredients = await getUserIngredients(db, userID);

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

  let scores = Array(recipeIDs.length).fill(0);
  for (var i = 0; i < recipeIDs.length; i++) {
    let ratingScore = recipesScores[i] / 5;

    let cookingTimeScore = 0;
    if (recipesCookingTimesMinutes[i] < COOKING_TIME_MINUTES_CAP)
      cookingTimeScore =
        1 - recipesCookingTimesMinutes[i] / COOKING_TIME_MINUTES_CAP;

    let numberOfIngredientsScore = 0;
    if (recipesIngredients[i].length < NO_INGREDIENTS_CAP)
      numberOfIngredientsScore =
        1 - recipesIngredients[i].length / NO_INGREDIENTS_CAP;

    let commonIngredientsScore = 0;
    let foundIngredients = [];
    for (var j = 0; j < recipesIngredients[i].length; j++) {
      const currentIngredient = recipesIngredients[i][j];
      if (
        userIngredients.includes(currentIngredient) &&
        !foundIngredients.includes(currentIngredient)
      ) {
        commonIngredientsScore += 1 / userIngredients.length;
        foundIngredients.push(currentIngredient);
      }
    }

    const coefficient_sum =
      coefficients.commonIngredients +
      coefficients.rating +
      coefficients.cookingTime +
      coefficients.numberOfIngredients;
    const metricSum =
      coefficients.commonIngredients * commonIngredientsScore +
      coefficients.rating * ratingScore +
      coefficients.cookingTime * cookingTimeScore +
      coefficients.numberOfIngredients * numberOfIngredientsScore;

    scores[i] = Math.round((100 * metricSum) / coefficient_sum);
  }
  return scores;
}

module.exports = {
  initializeScoreRoute: function (app) {
    app.get("/score", async (req, res) => {
      let expectedValues = ["userID"];
      let missingParameters = utility.missingParameters(
        expectedValues,
        req.query,
      );
      if (!missingParameters.length == 0)
        return res.send({ "Missing Parameters": missingParameters });

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
        return res.send({ "Missing Parameters": missingParameters });

      let db = await utility.connect();
      await db.run(`DELETE FROM Scores WHERE UserID=${req.query.userID}`);

      let recipeIDs = await getRecipeIDs(db);
      let coefficients = await getCoefficients(db, req.query.userID);
      let scores = await calculateScores(
        db,
        req.query.userID,
        coefficients,
        recipeIDs,
      );

      let queryString = "";
      for (var i = 0; i < recipeIDs.length; i++)
        queryString += `(${req.query.userID}, ${recipeIDs[i]}, ${scores[i]}), `;
      queryString = queryString.slice(0, -2);

      const result = await db.run(`INSERT INTO Scores VALUES ${queryString};`);
      res.send(result);
      await db.close();
    });
  },
};
