const connect = require("./connect");

module.exports = {
  initializeUserRoute: function (app) {
    app.post("/user", async (req, res) => {
      let db = await connect.connect();
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
  },
};
