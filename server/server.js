const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

async function connect() {
  const db = await sqlite.open({
    filename: "../db/recipes.db",
    driver: sqlite3.Database,
  });
  return db;
}

app.listen(8080, () => {
  console.log("server listening on port 8080");
});

app.post("/recipes/score", async (req, res) => {
  let db = await connect();
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
  let recipesIngredients = await db.all(
    `SELECT CleanIngredients FROM Recipes WHERE RecipeID IN (${recipeIDs.toString()})`,
  );
  recipesIngredients = recipesIngredients.map(function (d) {
    return d["CleanIngredients"].split(",");
  });

  let scores = Array(recipes.length).fill(0);
  for (var i = 0; i < recipes.length; i++) {
    for (var j = 0; j < recipesIngredients[i].length; j++) {
      if (userIngredients.includes(recipesIngredients[i][j])) scores[i]++;
    }
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

app.get("/recipes/score", async (req, res) => {
  let db = await connect();
  const result = await db.all(
    `SELECT * FROM Scores WHERE userID=${req.query.userID} ORDER BY Score DESC;`,
  );
  res.send(result);
  await db.close();
});

app.post("/user", async (req, res) => {
  let db = await connect();
  const max = await db.get(`SELECT MAX(UserID) FROM Users;`);
  let usersQuery = `(${max["MAX(UserID)"] + 1}, ${req.query.ingredients}, ${
    req.query.ingredientAmount
  }, ${req.query.IngredientUnit}, ${req.query.previousRecipes}, ${
    req.query.allergies
  }, ${req.query.name})`;
  const result = await db.all(`INSERT INTO Users VALUES ${usersQuery};`);
  res.send(result);
  await db.close();
});

app.delete("/ingredient", async (req, res) => {
  let db = await connect();
  const query = await db.get(
    `SELECT Ingredients, IngredientAmount, IngredientUnit FROM Users WHERE userID=${req.query.userID};`,
  );
  let ingredients = [],
    ingredientAmounts = [],
    ingredientUnits = [];
  if (query["Ingredients"].includes(",")) {
    ingredients = query["Ingredients"].split(",");
    ingredientAmounts = query["IngredientAmount"].split(",");
    ingredientUnits = query["IngredientUnit"].split(",");
  } else {
    ingredients = [query["Ingredients"]];
    ingredientAmounts = [query["IngredientAmount"]];
    ingredientUnits = [query["IngredientUnit"]];
  }
  const removeIndex = ingredients.indexOf(req.query.ingredient);
  ingredients.splice(removeIndex, 1);
  ingredientAmounts.splice(removeIndex, 1);
  ingredientUnits.splice(removeIndex, 1);
  const result = await db.run(
    `UPDATE Users SET Ingredients="${ingredients}", IngredientAmount="${ingredientAmounts}", IngredientUnit="${ingredientUnits}" WHERE userId=${req.query.userID}`,
  );
  res.send({ result });
  await db.close();
});

app.get("/ingredient", async (req, res) => {
  let db = await connect();
  const query = await db.get(
    `SELECT Ingredients, IngredientAmount, IngredientUnit FROM Users WHERE userID=${req.query.userID};`,
  );
  if (query["Ingredients"].includes(",")) {
    const ingredients = query["Ingredients"].split(",");
    const ingredientAmounts = query["IngredientAmount"].split(",");
    const ingredientUnit = query["IngredientUnit"].split(",");
    res.send({ ingredients, ingredientAmounts, ingredientUnit });
  } else {
    const ingredients = [query["Ingredients"]];
    const ingredientAmounts = [query["IngredientAmount"]];
    const ingredientUnit = [query["IngredientUnit"]];
    res.send({ ingredients, ingredientAmounts, ingredientUnit });
  }
  await db.close();
});

app.post("/ingredient", async (req, res) => {
  let db = await connect();
  const query = await db.get(
    `SELECT Ingredients, IngredientAmount, IngredientUnit FROM Users WHERE userID=${req.query.userID};`,
  );
  let ingredients = [],
    ingredientAmounts = [],
    ingredientUnits = [];
  let ingredient = req.query.ingredient,
    amount = req.query.ingredientAmount,
    unit = req.query.ingredientUnit;

  if (query["Ingredients"].length == 0) {
    await db.run(
      `UPDATE Users SET Ingredients="${ingredient}", IngredientAmount="${amount}", IngredientUnit="${unit}" WHERE userId=${req.query.userID}`,
    );
    res.send({});
    return await db.close();
  }

  if (query["Ingredients"].includes(",")) {
    ingredients = query["Ingredients"].split(",");
    ingredientAmounts = query["IngredientAmount"].split(",");
    ingredientUnits = query["IngredientUnit"].split(",");
  } else {
    ingredients = [query["Ingredients"]];
    ingredientAmounts = [query["IngredientAmount"]];
    ingredientUnits = [query["IngredientUnit"]];
  }
  const ingredientIndex = ingredients.indexOf(ingredient);
  if (ingredientIndex == -1) {
    ingredients.push(ingredient);
    ingredientAmounts.push(amount);
    ingredientUnits.push(unit);
    await db.run(
      `UPDATE Users SET Ingredients="${ingredients}", IngredientAmount="${ingredientAmounts}", IngredientUnit="${ingredientUnits}" WHERE userId=${req.query.userID}`,
    );
  } else {
    ingredientAmounts[ingredientIndex] = (
      parseInt(ingredientAmounts[ingredientIndex]) + parseInt(amount)
    ).toString();
    await db.run(
      `UPDATE Users SET IngredientAmount="${ingredientAmounts}" WHERE userId=${req.query.userID}`,
    );
  }
  res.send({});
  await db.close();
});

app.get("/recipes", async (req, res) => {
  let db = await connect();
  const page = req.query.page;
  let scoreQuery = await db.all(
    `SELECT RecipeID, Score FROM Scores ORDER BY score DESC LIMIT 8 OFFSET ${
      (page - 1) * 8
    }`,
  );
  let count = await db.all(`SELECT COUNT(*) FROM recipes`);
  count = count[0]["COUNT(*)"];
  let recipeIDs = scoreQuery.map(function (d) {
    return d["RecipeID"];
  });
  let scores = scoreQuery.map(function (d) {
    return d["Score"];
  });
  let result;
  if (recipeIDs.length === 0) {
    result = await db.all(
      `SELECT * FROM Recipes LIMIT 8 OFFSET ${((page - 1) * 8, page * 8)}`,
    );
  } else {
    let queryString = "(";
    for (var i = 0; i < recipeIDs.length; i++)
      queryString += `${recipeIDs[i]}, `;
    queryString = queryString.slice(0, -2) + `)`;
    result = await db.all(
      `SELECT * FROM Recipes WHERE RecipeID IN ${queryString}`,
    );
    for (var i = 0; i < result.length; i++) result[i]["Score"] = scores[i];
  }
  res.send({ result, count });
  await db.close();
});

app.get("/recipes/search", async (req, res) => {
  let db = await connect();
  const page = req.query.page;
  let titleContains = req.query.title || ""; // Default to an empty string if no name provided
  let limit = parseInt(req.query.limit, 8) || 8; // Default to 10 if no limit provided
  const result = await db.all(
    `SELECT * FROM recipes WHERE Title LIKE ? LIMIT ? OFFSET ? `,
    ["%" + titleContains + "%", limit, (page - 1) * 8],
  );
  const countQuery = await db.all(
    `SELECT COUNT(*) FROM recipes WHERE Title LIKE? LIMIT?`,
    ["%" + titleContains + "%", limit],
  );
  const count = countQuery[0]["COUNT(*)"];
  res.send({ result, count });
  await db.close();
});
