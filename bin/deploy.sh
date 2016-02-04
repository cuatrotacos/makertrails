#!/bin/bash

set -o errexit # Exit on error

#git branch -D deploy
#git checkout -b deploy
echo 'mobile_client/ ' >> .gitignore
git add .gitignore
git commit -m '[deploy] add mobile client to .gitignore'
git push heroku deploy:master #&& sed -i '' -e '$d' .gitignore
#git checkout dev
