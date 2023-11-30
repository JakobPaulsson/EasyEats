const utility = require("./utility");

module.exports = {
  initializePresetRoute: function (app) {
    app.get("/preset", async (req, res) => {
      let expectedValues = ["userID"];
      let missingParameters = utility.missingParameters(
        expectedValues,
        req.query,
      );
      if (!missingParameters.length == 0) {
        return res.send({ "Missing Parameters": missingParameters });
      }

      let db = await utility.connect();

      const query = await db.all(
        `SELECT Name, Icon, Color FROM Presets WHERE UserID=${req.query.userID};`,
      );
      if (query === undefined) {
        res.send({ error: "Invalid userID or presetID" });
      } else {
        res.send({ query });
      }
      await db.close();
    });

    app.post("/preset", async (req, res) => {
      let expectedValues = [
        "userID",
        "name",
        "icon",
        "color",
        "ratingMetric",
        "cookingTimeMetric",
        "commonIngredientsMetric",
        "numberOfIngredientsMetric",
      ];
      let missingParameters = utility.missingParameters(
        expectedValues,
        req.query,
      );
      if (!missingParameters.length == 0)
        return res.send({ "Missing Parameters": missingParameters });

      const ratingMetric = req.query.ratingMetric;
      const cookingTimeMetric = req.query.cookingTimeMetric;
      const commonIngredientsMetric = req.query.commonIngredientsMetric;
      const numberOfIngredientsMetric = req.query.numberOfIngredientsMetric;
      if (
        ratingMetric +
          cookingTimeMetric +
          commonIngredientsMetric +
          numberOfIngredientsMetric ==
        0
      )
        return res.send({ error: "ALL_ZERO_METRICS" });

      let db = await utility.connect();
      try {
        const result = await db.all(
          `INSERT INTO Presets VALUES (${req.query.userID}, '${req.query.name}', '${req.query.icon}', '${req.query.color}', ${ratingMetric}, ${cookingTimeMetric}, ${commonIngredientsMetric}, ${numberOfIngredientsMetric});`,
        );
        res.send(result);
      } catch (error) {
        res.send({ error: error });
      } finally {
        await db.close();
      }
    });

    app.delete("/preset", async (req, res) => {
      let expectedValues = ["userID", "name"];
      let missingParameters = utility.missingParameters(
        expectedValues,
        req.query,
      );
      if (!missingParameters.length == 0)
        return res.send({ "Missing Parameters": missingParameters });

      let db = await utility.connect();
      const result = await db.run(
        `DELETE FROM Presets WHERE UserID=${req.query.userID} AND Name='${req.query.name}'`,
      );
      res.send(result);
      await db.close();
    });

    app.patch("/preset", async (req, res) => {
      let expectedValues = ["userID", "name", "newName"];
      let missingParameters = utility.missingParameters(
        expectedValues,
        req.query,
      );
      if (!missingParameters.length == 0)
        return res.send({ "Missing Parameters": missingParameters });

      let db = await utility.connect();
      const result = await db.run(
        `UPDATE Presets SET Name="${req.query.newName}"
         WHERE userId=${req.query.userID} AND Name='${req.query.name}'`,
      );

      res.send(result);
      await db.close();
    });
  },
};
