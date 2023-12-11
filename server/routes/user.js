const utility = require("./utility");

module.exports = {
  initializeUserRoute: function (app) {
    app.get("/user/preset", async (req, res) => {
      let expectedValues = ["userID"];
      let missingParameters = utility.missingParameters(
        expectedValues,
        req.query,
      );
      if (!missingParameters.length == 0)
        return res.send({ "Missing Parameters": missingParameters });

      let db = await utility.connect();
      const selectedPreset = await db.get(
        `SELECT SelectedPreset FROM Users WHERE UserID=${req.query.userID};`,
      );
      res.send(selectedPreset);
      await db.close();
    });

    app.post("/user/preset", async (req, res) => {
      let expectedValues = ["userID", "name"];
      let missingParameters = utility.missingParameters(
        expectedValues,
        req.query,
      );
      if (!missingParameters.length == 0)
        return res.send({ "Missing Parameters": missingParameters });

      let db = await utility.connect();
      const selectedPreset = await db.get(
        `UPDATE Users SET SelectedPreset='${req.query.name}' WHERE UserID=${req.query.userID};`,
      );
      res.send(selectedPreset);
      await db.close();
    });

    app.post("/user", async (req, res) => {
      let expectedValues = ["username", "password"];
      let missingParameters = utility.missingParameters(
        expectedValues,
        req.query,
      );
      if (!missingParameters.length == 0)
        return res.send({ "Missing Parameters": missingParameters });

      let db = await utility.connect();
      let max = await db.get(`SELECT MAX(UserID) FROM Users;`);
      let checkIfUserExists = await db.get(
        `SELECT UserID FROM Users WHERE Username='${req.query.username}';`,
      );
      if (checkIfUserExists !== undefined) {
        res.send({ error: "User already exists!" });
        return;
      }
      max = max["MAX(UserID)"] + 1;
      try {
        await db.all(
          `INSERT INTO Users VALUES (${max}, '${req.query.username}', '${req.query.password}', '', '', '', '', '', '', '');`,
        );
        res.send({ userID: max });
      } catch (error) {
        res.send({ error: error });
      } finally {
        await db.close();
      }
    });

    app.get("/user/login", async (req, res) => {
      let expectedValues = ["username", "password"];
      let missingParameters = utility.missingParameters(
        expectedValues,
        req.query,
      );

      if (!missingParameters.length == 0)
        return res.send({ "Missing Parameters": missingParameters });

      let db = await utility.connect();
      let userID = await db.get(
        `SELECT UserID FROM Users WHERE Username='${req.query.username}' AND Password='${req.query.password}';`,
      );
      if (userID === undefined) {
        res.send({ error: "Invalid username or password!" });
      } else {
        req.session.userID = userID["UserID"];
        res.send({ userID: userID });
      }

      await db.close();
    });

    app.get("/user/currentUser", async (req, res) => {
      if (req.session.userID) {
        res.send({ userID: req.session.userID });
      } else {
        res.send(undefined);
      }
    });

    app.post("/user/logout", async (req, res) => {
      let expectedValues = ["userID"];
      let missingParameters = utility.missingParameters(
        expectedValues,
        req.query,
      );

      if (!missingParameters.length == 0)
        return res.send({ "Missing Parameters": missingParameters });

      if (req.query.userID == req.session.userID) {
        req.session.destroy();
        res.send({ success: "Logged out!" });
      } else {
        res.send({ error: "Invalid user!" });
      }
    });
  },
};
