#!/usr/bin/env bash
yarn build &&
cd build &&
git init &&
git add . &&
git commit -m 'deploy' &&
git remote add origin git@gitee.com:huang-haotian/picturebed.git &&
git push -u origin master -f &&
cd -
