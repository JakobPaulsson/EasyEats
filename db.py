import csv
import sqlite3
import pandas as pd
import os

csv_path = "recipes.csv"
db_name = "recipes.db"

def get_all_ingredients():
    all_ingredients = set()
    num_ingredients = 0
    df = pd.read_csv(csv_path)
    for i, row in enumerate(df.iterrows()):
        ingredients = row[1]['RecipeIngredientParts']
        if not '(' in ingredients: # Just one ingredient
            all_ingredients.add(ingredients.replace('\"', ''))
            continue
            
        ingredientsParsed = ingredients[1:].replace('"','').replace('(','').replace(')','').split(',')
        num_ingredients += len(ingredientsParsed)
        for ingredient in ingredientsParsed:
            all_ingredients.add(ingredient.strip())
    pd.DataFrame(all_ingredients, columns =['ingredients']).to_csv('ingredients.csv', index=False)

if not os.path.isfile('ingredients.csv'):
    get_all_ingredients()

def search_ingredients():
    ingredients = ["saffr", "milk"]
    conditions = ' AND '.join([f"Ingredients LIKE '%{ingredient}%'" for ingredient in ingredients])
    conn = sqlite3.connect("recipes.db")
    cursor = conn.cursor()
    query = f"""
                SELECT Ingredients
                FROM Recipes
                WHERE {conditions}
            """

    cursor.execute(query)
    result = cursor.fetchall()
    print(result)
    quit()

def add_recipes():
    with open(csv_path, 'r', encoding='utf8') as file:
        csv_reader = csv.DictReader(file)

        next(csv_reader, None)

        for row in csv_reader:
            if not 'c(' in row['RecipeIngredientParts']:
                continue

            image = None
            
            if not row['Images'] == 'character(0)':
                if '(' in row['Images']: # Multiple images, just get first one
                    image = row['Images'].split(',')[0][3:]
                else:
                    image = row['Images'].replace('"','')
            

            parsedRow = [row['Name'], row['RecipeIngredientParts'][1:].replace('(','[').replace(')',']'), row['RecipeInstructions'][1:].replace('(','[').replace(')',']'), image, row['Calories'], row['TotalTime'], row['AggregatedRating'], row['ReviewCount']]
            cursor.execute('''
                INSERT INTO Recipes (Title,
                                    Ingredients,
                                    Instructions,
                                    ImageSrc, 
                                    Calories,
                                    CookingTime,
                                    Rating,
                                    RatingCount)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);
                ''', parsedRow)

conn = sqlite3.connect(db_name)
cursor = conn.cursor()
cursor.execute("""
    CREATE TABLE IF NOT EXISTS Recipes (
        Title TEXT,
        Ingredients TEXT,
        Instructions TEXT,
        ImageSrc TEXT, 
        Calories REAL,
        CookingTime TEXT,
        Rating REAL,
        RatingCount REAL
    );
    """)

add_recipes()
conn.commit()
conn.close()
