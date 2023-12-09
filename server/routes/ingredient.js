const utility = require("./utility");

module.exports = {
  initializeIngredientRoute: function (app) {
    app.get("/ingredient", async (req, res) => {
      let expectedValues = ["userID"];
      let missingParameters = utility.missingParameters(
        expectedValues,
        req.query
      );
      if (!missingParameters.length == 0)
        return res.send({ "Missing Parameters": missingParameters });

      let db = await utility.connect();
      const query = await db.get(
        `SELECT Ingredients, IngredientAmount, IngredientUnit FROM Users WHERE userID=${req.query.userID};`
      );
      if (query == undefined)
        return res.send({
          ingredients: [],
          ingredientAmounts: [],
          ingredientUnit: [],
        });
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

    app.delete("/ingredient", async (req, res) => {
      let expectedValues = ["userID", "ingredient"];
      let missingParameters = utility.missingParameters(
        expectedValues,
        req.query
      );
      if (!missingParameters.length == 0)
        return res.send({ "Missing Parameters": missingParameters });

      let db = await utility.connect();
      const query = await db.get(
        `SELECT Ingredients, IngredientAmount, IngredientUnit FROM Users WHERE userID=${req.query.userID};`
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
        `UPDATE Users SET Ingredients="${ingredients}", IngredientAmount="${ingredientAmounts}", IngredientUnit="${ingredientUnits}" WHERE userId=${req.query.userID}`
      );
      res.send({ result });
      await db.close();
    });

    app.post("/ingredient", async (req, res) => {
      let expectedValues = [
        "userID",
        "ingredient",
        "ingredientAmount",
        "ingredientUnit",
      ];
      let missingParameters = utility.missingParameters(
        expectedValues,
        req.query
      );
      if (!missingParameters.length == 0)
        return res.send({ "Missing Parameters": missingParameters });

      let db = await utility.connect();
      const query = await db.get(
        `SELECT Ingredients, IngredientAmount, IngredientUnit FROM Users WHERE userID=${req.query.userID};`
      );
      let ingredients = [],
        ingredientAmounts = [],
        ingredientUnits = [];
      let ingredient = req.query.ingredient,
        amount = req.query.ingredientAmount,
        unit = req.query.ingredientUnit;

      if (query["Ingredients"].length == 0) {
        await db.run(
          `UPDATE Users SET Ingredients="${ingredient}", IngredientAmount="${amount}", IngredientUnit="${unit}" WHERE userId=${req.query.userID}`
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
          `UPDATE Users SET Ingredients="${ingredients}", IngredientAmount="${ingredientAmounts}", IngredientUnit="${ingredientUnits}" WHERE userId=${req.query.userID}`
        );
      } else {
        ingredientAmounts[ingredientIndex] = (
          parseFloat(ingredientAmounts[ingredientIndex]) + parseFloat(amount)
        ).toString();
        await db.run(
          `UPDATE Users SET IngredientAmount="${ingredientAmounts}" WHERE userId=${req.query.userID}`
        );
      }
      res.send({});
      await db.close();
    });
  },
};
