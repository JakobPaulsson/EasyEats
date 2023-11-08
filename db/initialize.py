import csv
import sqlite3
import re

conn = sqlite3.connect("recipes.db")
cursor = conn.cursor()
cursor.execute("""
    CREATE TABLE IF NOT EXISTS Recipes (
        Title TEXT,
        Ingredients TEXT,
        CleanIngredients TEXT,
        Instructions TEXT,
        ImageSrc TEXT, 
        CookingTime TEXT,
        Rating REAL,
        RatingCount INTEGER
    );
    """)
cursor.execute("CREATE TABLE IF NOT EXISTS Ingredients (Ingredient TEXT);")

def clean_ingredient(ingredient):
    remove_patterns = [" cup ", " cups ", " tablespoons ", "package ", "packages ", "'", "\"", ":", "fluid ounces", "fluid ounce"]
    for pattern in remove_patterns:
        ingredient = ingredient.replace(pattern, "")
    regex_patterns = ["\(.*?\)", r'\d+/\d+', r'[0-9]']
    for pattern in regex_patterns:
        ingredient = re.sub(pattern, '', ingredient)
    return ingredient.strip().lower()

clean_ingredients_recipes = {}
with open('data/clean_recipes.csv', 'r', encoding='utf8') as file:
    ingredients = set()
    csv_reader = csv.DictReader(file, delimiter=';')
    next(csv_reader, None)
    for row in csv_reader:
        clean_ingredients_recipes[row['RecipeID']] = row['Ingredients']
        for ingredient in row['Ingredients'].split(','):
            if not len(ingredient) == 0 and not len(ingredient.split(' ')) > 4:
                ingredients.add(clean_ingredient(ingredient))
    cursor.executemany('''
                INSERT INTO Ingredients (Ingredient)
                VALUES (?);
                ''', [(a,) for a in ingredients])

ratings = dict()
rating_counts = dict()
with open('data/clean_reviews.csv', 'r', encoding='unicode_escape') as file:
    csv_reader = csv.DictReader(file)
    next(csv_reader, None)
    current_id = -1
    for row in csv_reader:
        if not ratings.get(row['RecipeID']):
            ratings[row['RecipeID']] = []
        ratings[row['RecipeID']].append(float(row['Rate']))
for k, v in ratings.items():
    rating_counts[k] = len(v)
    ratings[k] = round(sum(v)/len(v), 1)        

with open('data/recipes.csv', 'r', encoding='unicode_escape') as file:
    csv_reader = csv.DictReader(file, delimiter=';')
    next(csv_reader, None)
    for i, row in enumerate(csv_reader):
        ID = row['RecipeID']
        # Remove all recipes that have no rating, cook time or that does
        # not have clean ingredients. This removes around 75% of recipes
        if not ratings.get(ID) or row['Total Time'] == 'X' or ID not in clean_ingredients_recipes.keys():
            continue
        parsedRow = [row['Recipe Name'], row['Ingredients'], clean_ingredients_recipes[ID], row['Directions'] , row['Recipe Photo'], row['Total Time'], ratings[ID], int(rating_counts[ID])]
        cursor.execute('''
                 INSERT INTO Recipes (Title,
                                     Ingredients,
                                     CleanIngredients,
                                     Instructions,
                                     ImageSrc, 
                                     CookingTime,
                                     Rating,
                                     RatingCount)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?);
                 ''', parsedRow)

conn.commit()
conn.close()
