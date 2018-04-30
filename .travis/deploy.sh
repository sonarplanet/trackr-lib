#!/bin/sh

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_files() {
  git checkout -b publish
  git add -f dist src package.json README.md # -f option because dist is in .gitignore
  git commit --message "Travis build: #$TRAVIS_BUILD_NUMBER"
}

upload_files() {
  git remote add travis https://${GH_TOKEN}@github.com/sonarplanet/trackr-lib.git
  git push --quiet --set-upstream -f travis publish
}

setup_git
commit_files
upload_files