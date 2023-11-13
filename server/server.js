const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

let db = new sqlite3.Database("../db/recipes.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the recipes database.");
});
app.listen(8080, () => {
  console.log("server listening on port 8080");
});

app.get("/recipes", async (req, res) => {
  const page = req.query.page;
  const ingredients = req.query.ingredients;
  let ingredientsQuery = "";
  for (var ingredient of ingredients) {
    ingredientsQuery += `Ingredients LIKE '%${ingredient}%' AND `;
  }
  ingredientsQuery = ingredientsQuery.slice(0, -5);
  const db = await sqlite.open({
    filename: "../db/recipes.db",
    driver: sqlite3.Database,
  });
  const result = await db.all(
    `SELECT * FROM Recipes WHERE (${ingredientsQuery}) LIMIT 8 OFFSET ${
      (page - 1) * 8
    };`,
  );
  res.send(result);
  await db.close();
});

app.get("/recipes/search", async (req, res) => {
  const page = req.query.page;
  console.log(page);
  let titleContains = req.query.title || ""; // Default to an empty string if no name provided
  let limit = parseInt(req.query.limit, 8) || 8; // Default to 10 if no limit provided
  const db = await sqlite.open({
    filename: "../db/recipes.db",
    driver: sqlite3.Database,
  });

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
