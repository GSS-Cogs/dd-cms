#!/bin/sh

timeout 20 sh -c "until nc -z plone 8080; do sleep 1; done"
timeout 20 sh -c "until nc -z volto 3000; do sleep 1; done"
# Todo: need to check that plone is running and the /Plone site is installed
TESTDIR=$PWD
cd /home/node/app
export SCREENSHOT_PATH=$TESTDIR/screenshots/
NODE_PATH=/home/node/app/node_modules ./node_modules/.bin/cucumber-js --require "../**/{cucumber-puppeteer,cucumber-puppeteer-axe}/features/**/*.js" --require "$TESTDIR/features/**/*.js" --world-parameters "{\"executablePath\":\"/usr/bin/chromium-browser\", \"dumpio\": true}" $TESTDIR/features --format=json:$TESTDIR/test-results.json
NODE_PATH=/home/node/app/node_modules node $TESTDIR/toHTML.js