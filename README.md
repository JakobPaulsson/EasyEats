
# EasyEats

Do you ever find it hard to know what you should cook today? No problem! Introducing EasyEats, the web app that recommends you recipes based on your kitchen storage.

## Dataset

The application uses a [recipe ingredients and reviews dataset](https://www.kaggle.com/datasets/kanaryayi/recipe-ingredients-and-reviews) from Kaggle to create a SQLite database of recipes.

## Architecture

Developed with React as frontend, Node.js as backend, and SQLite3 as database. Project also uses Python for setting up the database.

## Setup & Run
### Initialize database
```
cd db
python3 initialize.py
```
### Start server
```
cd server
node server.py
```
### Start React application
```
cd app
npm run start
```