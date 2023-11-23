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

  missingParameters: function (expectedValues, query) {
    let missingParameters = [];
    let keys = Object.keys(query);
    for (let i = 0; i < expectedValues.length; i++) {
      if (!keys.includes(expectedValues[i])) {
        missingParameters.push(expectedValues[i]);
      }
    }
    return missingParameters;
  },
};
