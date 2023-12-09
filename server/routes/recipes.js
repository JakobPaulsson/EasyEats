const utility = require("./utility");

module.exports = {
  initializeRecipesRoute: function (app) {
    app.get("/recipes", async (req, res) => {
      let expectedValues = ["page"];
      let missingParameters = utility.missingParameters(
        expectedValues,
        req.query
      );
      if (!missingParameters.length == 0)
        return res.send({ "Missing Parameters": missingParameters });

      let db = await utility.connect();
      const page = req.query.page;
      let scoreQuery = await db.all(
        `SELECT RecipeID, Score FROM Scores ORDER BY score DESC LIMIT 8 OFFSET ${
          page * 8
        }`
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
          `SELECT * FROM Recipes LIMIT 8 OFFSET ${((page - 1) * 8, page * 8)}`
        );
      } else {
        let queryString = "(";
        for (var i = 0; i < recipeIDs.length; i++)
          queryString += `${recipeIDs[i]}, `;
        queryString = queryString.slice(0, -2) + `)`;
        result = await db.all(
          `SELECT * FROM Recipes WHERE RecipeID IN ${queryString}`
        );

        for (var i = 0; i < recipeIDs.length; i++) {
          result[i]["Score"] = scores[recipeIDs.indexOf(result[i].RecipeID)];
        }
        result.sort((a, b) => b.Score - a.Score);
      }
      res.send({ result, count });
      await db.close();
    });

    app.get("/recipes/search", async (req, res) => {
      let expectedValues = ["page"];
      let missingParameters = utility.missingParameters(
        expectedValues,
        req.query
      );
      if (!missingParameters.length == 0)
        return res.send({ "Missing Parameters": missingParameters });

      let db = await utility.connect();
      const page = req.query.page;
      let titleContains = req.query.title || ""; // Default to an empty string if no name provided
      let limit = parseInt(req.query.limit, 8) || 8; // Default to 8 if no limit provided
      const result = await db.all(
        `SELECT * FROM recipes WHERE Title LIKE ? LIMIT ? OFFSET ? `,
        ["%" + titleContains + "%", limit, (page - 1) * 8]
      );
      const countQuery = await db.all(
        `SELECT COUNT(*) FROM recipes WHERE Title LIKE? LIMIT?`,
        ["%" + titleContains + "%", limit]
      );
      const count = countQuery[0]["COUNT(*)"];
      res.send({ result, count });
      await db.close();
    });
  },
};
