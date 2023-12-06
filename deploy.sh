cd app
npm run build
rsync -zarvh build eggscrape@64.227.78.28:~/app
cd ../db
python3 initialize.py
rsync -zarvh recipes.db eggscrape@64.227.78.28:~/db
cd ..
rsync -zarvh --exclude node_modules server eggscrape@64.227.78.28: