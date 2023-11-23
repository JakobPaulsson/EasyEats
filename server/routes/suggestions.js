const utility = require("./utility");

module.exports = {
  initializeSuggestionsRoute: function (app) {
    app.get("/suggestions", async (req, res) => {
      let expectedValues = ["searchInput"];
      let missingParameters = utility.missingParameters(
        expectedValues,
        req.query,
      );
      if (!missingParameters.length == 0)
        res.send({ "Missing Parameters": missingParameters });

      let db = await utility.connect();
      const searchQuery = await db.all(
        `SELECT * FROM Ingredients WHERE Ingredient LIKE '%${req.query.searchInput}%' LIMIT 10`,
      );
      let searchResults = searchQuery.map(function (d) {
        return d["Ingredient"];
      });
      res.send({ searchResults });
      await db.close();
    });
  },
};
