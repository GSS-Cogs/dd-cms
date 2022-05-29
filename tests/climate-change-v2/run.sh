#!/bin/sh

set -eo pipefail

echo -n "Waiting for plone..."
timeout 120 sh -c "until nc -z -w 1 plone 8080; do sleep 1; echo -n '.'; done"
echo -ne "ready.\nWaiting for volto..."
timeout 120 sh -c "until nc -z -w 1 volto 3000; do sleep 1; echo -n '.'; done"
echo "ready."

TESTDIR=$PWD
cd /home/node/app
export SCREENSHOT_PATH=$TESTDIR/screenshots/
NODE_PATH=/home/node/app/node_modules ./node_modules/.bin/cucumber-js --require "../**/{cucumber-puppeteer,cucumber-puppeteer-axe}/features/**/*.js" --require "$TESTDIR/features/**/*.js" --world-parameters "{\"executablePath\":\"/usr/bin/chromium-browser\", \"dumpio\": true}" $TESTDIR/features --format=json:$TESTDIR/test-results.json
cd $TESTDIR
NODE_PATH=/home/node/app/node_modules node toHTML.js