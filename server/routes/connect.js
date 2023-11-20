const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

module.exports = {
  connect: async function () {
    const db = await sqlite.open({
      filename: "../db/recipes.db",
      driver: sqlite3.Database,
    });
    return db;
  },
};
