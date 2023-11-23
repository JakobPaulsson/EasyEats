const utility = require("./utility");

module.exports = {
  initializePresetRoute: function (app) {
    app.get("/preset", async (req, res) => {
      console.log("arse")
      let expectedValues = ["userID", "name"]
      let missingParameters = utility.missingParameters(expectedValues, req.query);
      if (!missingParameters.length == 0)
        res.send({ "Missing Parameters": missingParameters });

      let db = await utility.connect();

      const query = await db.get(`SELECT RatingMetric, CookingTimeMetric, CommonIngredientsMetric, NumberOfIngredientsMetric FROM Presets WHERE UserID=${req.query.userID} AND Name='${req.query.name}';`);
      if (query === undefined) {
        res.send({ "error": "Invalid userID or presetID" });
      } else {
        res.send({
          "ratingMetric": query["RatingMetric"],
          "CookingTimeMetric": query["CookingTimeMetric"],
          "CommonIngredientsMetric": query["CommonIngredientsMetric"],
          "NumberOfIngredientsMetric": query["NumberOfIngredientsMetric"]
        })
      }
      await db.close();
    });

    app.post("/preset", async (req, res) => {
      let expectedValues = ["userID", "name", "icon", "color", "ratingMetric", "cookingTimeMetric", "commonIngredientsMetric", "numberOfIngredientsMetric"]
      let missingParameters = utility.missingParameters(expectedValues, req.query);
      if (!missingParameters.length == 0)
        res.send({ "Missing Parameters": missingParameters });

      let db = await utility.connect();
      try {
        const result = await db.all(`INSERT INTO Presets VALUES (${req.query.userID}, '${req.query.name}', '${req.query.icon}', '${req.query.color}', ${req.query.ratingMetric}, ${req.query.cookingTimeMetric}, ${req.query.commonIngredientsMetric}, ${req.query.numberOfIngredientsMetric});`);
        res.send(result)
      } catch (error) {
        res.send({ "error": error })
      } finally {
        await db.close();
      }
    });

    app.delete("/preset", async (req, res) => {
      let expectedValues = ["userID", "name"]
      let missingParameters = utility.missingParameters(expectedValues, req.query);
      if (!missingParameters.length == 0)
        res.send({ "Missing Parameters": missingParameters });

      let db = await utility.connect();
      const result = await db.run(`DELETE FROM Presets WHERE UserID=${req.query.userID} AND Name='${req.query.name}'`);
      res.send(result)
      await db.close();
    })

    app.patch("/preset", async (req, res) => {
      let expectedValues = ["userID", "name", "newName"]
      let missingParameters = utility.missingParameters(expectedValues, req.query);
      if (!missingParameters.length == 0)
        res.send({ "Missing Parameters": missingParameters });

      let db = await utility.connect();
      const result = await db.run(
        `UPDATE Presets SET Name="${req.query.newName}" WHERE userId=${req.query.userID} AND Name='${req.query.name}'`,
      );

      res.send(result)
      await db.close();
    })
  },
};