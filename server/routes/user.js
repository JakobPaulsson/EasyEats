const utility = require("./utility");

module.exports = {
  initializeUserRoute: function (app) {
    app.post("/user", async (req, res) => {
      let expectedValues = ["ingredients", "ingredientAmount", "IngredientUnit", "previousRecipes", "allergies", "name"]
      let missingParameters = utility.missingParameters(expectedValues, req.query);
      if (!missingParameters.length == 0)
        res.send({ "Missing Parameters": missingParameters });

      let db = await utility.connect();
      const max = await db.get(`SELECT MAX(UserID) FROM Users;`);
      let usersQuery = `(${max["MAX(UserID)"] + 1}, ${req.query.ingredients}, ${req.query.ingredientAmount
        }, ${req.query.IngredientUnit}, ${req.query.previousRecipes}, ${req.query.allergies
        }, ${req.query.name})`;
      const result = await db.all(`INSERT INTO Users VALUES ${usersQuery};`);
      res.send(result);
      await db.close();
    });
  },
};
