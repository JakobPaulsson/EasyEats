const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')
const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors())


app.listen(8080, () => {
      console.log('server listening on port 8080')
})

app.get('/recipes', async (req, res) => {
    const page = req.query.page
    const ingredients = req.query.ingredients
    let ingredientsQuery = ""
    for (var ingredient of ingredients) {
        ingredientsQuery += `Ingredients LIKE '%${ingredient}%' AND `
    }
    ingredientsQuery = ingredientsQuery.slice(0, -5);
    const db = await sqlite.open({
        filename: '../db/recipes.db',
        driver: sqlite3.Database
    })
    const result = await db.all(`SELECT * FROM Recipes WHERE (${ingredientsQuery}) LIMIT 8 OFFSET ${(page - 1)* 8};`)
    res.send(result)
})