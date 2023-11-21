const connect = require("./connect");

module.exports = {
  initializeSuggestionsRoute: function (app) {
    app.get("/suggestions", async (req, res) => {
      let db = await connect.connect();
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
