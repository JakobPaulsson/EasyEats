require("dotenv").config();
const express = require("express");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const cors = require("cors");
const app = express();
const score = require("./routes/score");
const user = require("./routes/user");
const ingredient = require("./routes/ingredient");
const recipes = require("./routes/recipes");
const suggestions = require("./routes/suggestions");
const preset = require("./routes/preset");

node_env = process.env.NODE_ENV;

app.use(
  cors({
    origin:
      node_env === "production"
        ? "https://www.martinis.dev"
        : "http://localhost:3000",
    credentials: true,
  })
);
app.options("/*", (_, res) => {
  res.sendStatus(200);
});

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    node_env === "production"
      ? "https://www.martinis.dev/platepilot"
      : "http://localhost:3000"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

function checkUserID(req, res, next) {
  if (+req.session.userID !== +req.query.userID) {
    return res.status(403).send({ error: "Unauthorized access" });
  }

  next(); // Proceed to the next middleware/route handler if the check passes
}

app.use(express.json());
app.set("trust proxy", 1); // trust first proxy

app.use(
  session({
    store: new SQLiteStore({ db: "sessions.db", dir: "../db" }), // Configuring SQLite store
    secret: process.env.SECRET_KEY, // Replace with your secret key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

user.initializeUserRoute(app);
app.use(checkUserID);
score.initializeScoreRoute(app);
ingredient.initializeIngredientRoute(app);
recipes.initializeRecipesRoute(app);
suggestions.initializeSuggestionsRoute(app);
preset.initializePresetRoute(app);

app.listen(8080, () => {
  console.log("server listening on port 8080");
});
