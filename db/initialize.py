import csv
import sqlite3
import re
import os 

if os.path.exists("recipes.db"):
    os.remove("recipes.db")

conn = sqlite3.connect("recipes.db")
cursor = conn.cursor()
cursor.execute("""
    CREATE TABLE IF NOT EXISTS Recipes (
        RecipeID INTEGER,
        Title TEXT,
        Ingredients TEXT,
        CleanIngredients TEXT,
        IngredientAmount REAL,
        IngredientUnit TEXT,
        Instructions TEXT,
        ImageSrc TEXT, 
        CookingTimeMinutes INTEGER,
        Rating REAL,
        RatingCount INTEGER
    );
    """)

cursor.execute("""
    CREATE TABLE IF NOT EXISTS Users (
        UserID INTEGER PRIMARY KEY,
        Ingredients TEXT,
        IngredientAmount REAL,
        IngredientUnit TEXT,
        PreviousRecipes TEXT,
        Allergies TEXT,
        Name TEXT,
        SelectedPreset TEXT
    );
    """)

cursor.execute("""
    CREATE TABLE IF NOT EXISTS Presets (
        UserID INTEGER,
        Name TEXT,
        Icon TEXT,
        Color TEXT,
        RatingMetric FLOAT,
        CookingTimeMetric FLOAT,
        CommonIngredientsMetric FLOAT,
        NumberOfIngredientsMetric FLOAT,
        primary key (UserID, Name)
    );
    """)

# TODO: This should not be created, just an example user
cursor.execute("""
    INSERT INTO Users (UserID,
                        Ingredients,
                        IngredientAmount,
                        IngredientUnit,
                        PreviousRecipes,
                        Allergies,
                        Name,
                        SelectedPreset)
    VALUES (1, '', '', '','', '', '', '');
        """)
cursor.execute("""
    CREATE TABLE IF NOT EXISTS Scores (
        UserID INTEGER,
        RecipeID INTEGER,
        Score REAL
    );
    """)
cursor.execute("CREATE TABLE IF NOT EXISTS Ingredients (Ingredient TEXT);")

convert_unit = {
    'cup': 'ml',
    'cups': 'ml',
    'teaspoons': 'ml',
    'teaspoon': 'ml',
    'tablespoon': 'ml',
    'tablespoons': 'ml',
    'pint': 'ml',
    'pints': 'ml',
    'fluid ounce': 'ml',
    'fluid ounces': 'ml',
    'quart': 'ml',
    'quarts': 'ml',
    'dash': 'ml',
    'dashes': 'ml',
    'drop': 'ml',
    'drops': 'ml',
    
    'pinch': 'gram',
    'pinches': 'gram',
    'ounce': 'gram',
    'ounces': 'gram',
    'pound': 'gram',
    'pounds': 'gram',

    'clove': 'count',
    'cloves': 'count',
    'slice': 'count',
    'slices': 'count',
    'count': 'count'
}

convert_amount = {
    'cup': 240,
    'cups': 240,
    'teaspoons': 4.92892,
    'teaspoon': 4.92892,
    'tablespoon': 14.7868,
    'tablespoons': 14.7868,
    'pint': 473.176,
    'pints': 473.176,
    'fluid ounce': 29.5735,
    'fluid ounces': 29.5735,
    'quart': 946.353,
    'quarts': 946.353,
    'dash': 2,
    'dashes': 2,
    'drop': 2,
    'drops': 2,
    
    'pinch': 0,
    'pinches': 0,
    'ounce': 28.3495,
    'ounces': 28.3495,
    'pound': 453.592,
    'pounds': 453.592,

    'clove': 0.12,
    'cloves': 0.12,
    'slice': 0.15,
    'slices': 0.15,
    'count': 1
}

def clean_ingredient(ingredient):
    remove_patterns = [" cup ", " cups ", " tablespoons ", "package ", "packages ", "'", "\"", ":", "fluid ounces", "fluid ounce"]
    for pattern in remove_patterns:
        ingredient = ingredient.replace(pattern, "")
    regex_patterns = ["\(.*?\)", r'\d+/\d+', r'[0-9]']
    for pattern in regex_patterns:
        ingredient = re.sub(pattern, '', ingredient)
    return ingredient.strip().lower()

def parse_ingredients(ingredients):
    amounts = []
    units = []
    allowed_units = convert_unit.keys()
    for ingredient in ingredients:
        amount = 0
        unit = "count"
        if '(' in ingredient and any(x for x in ingredient[ingredient.index('(') + 1:ingredient.index(')')] if x.isdigit()):
            inner = ingredient[ingredient.index('(') + 1:ingredient.index(')')]
            try:
                unit = inner.split(" ")[1]
                if unit not in allowed_units:
                    unit = "count"
                amount = convert_amount[unit] * eval(inner.split(" ")[0])
            except:
                return None, None
        else:
            try:
                for word in ingredient.split(" "):
                    if word in allowed_units:
                        unit = word
                        break
            
                for word in ingredient.split(" "):
                    if any(c.isdigit() for c in word):
                        amount += convert_amount[unit] * eval(word)
                    else:
                        break
            except:
                return None, None
        units.append(convert_unit[unit])
        amounts.append(amount)

    return units, amounts

clean_ingredients_recipes = {}
with open('data/clean_recipes.csv', 'r', encoding='utf8') as file:
    ingredients = set()
    csv_reader = csv.DictReader(file, delimiter=';')
    next(csv_reader, None)
    for row in csv_reader:
        clean_ingredients_recipes[row['RecipeID']] = row["Ingredients"]
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

        ingredients = row['Ingredients'].replace('\'','').replace('(optional)', '').split('**')
        units, amounts = parse_ingredients(ingredients)
        if not units:
            continue
        
        clean_ingredients = eval('[\'' + clean_ingredients_recipes[ID].replace('\'','').replace(',','\',\'') + '\']')

        if 'olive oil' in row['Ingredients']:
            for i in range(len(clean_ingredients)):
                if clean_ingredients[i] == 'olive':
                    clean_ingredients[i] = 'olive oil'
                    break


        minutes = eval(row['Total Time'].replace(' d', '*24*60').replace(' h', '*60').replace(' m', '').replace(" ","+"))
        parsedRow = [row['RecipeID'], row['Recipe Name'], row['Ingredients'], ','.join(clean_ingredients), ",".join([str(x) for x in amounts]), ",".join(units), row['Directions'].replace('\'', '') , row['Recipe Photo'], minutes, ratings[ID], int(rating_counts[ID])]
        cursor.execute('''
                 INSERT INTO Recipes (RecipeID,
                                        Title,
                                        Ingredients,
                                        CleanIngredients,
                                        IngredientAmount,
                                        IngredientUnit,
                                        Instructions,
                                        ImageSrc, 
                                        CookingTimeMinutes,
                                        Rating,
                                        RatingCount)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
                 ''', parsedRow)

conn.commit()
conn.close()
