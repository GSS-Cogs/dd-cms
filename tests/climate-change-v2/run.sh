#!/bin/sh

set -e -o pipefail

WAIT_TIMEOUT=180

echo -n "Waiting for plone..."
timeout $WAIT_TIMEOUT sh -c 'while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' plone:8080)" != "200" ]]; do sleep 5; echo -n "."; done'
echo -ne "ready.\nWaiting for volto..."
timeout $WAIT_TIMEOUT sh -c 'while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' volto:3000)" != "200" ]]; do sleep 5; echo -n "."; done'
echo "ready."

TESTDIR=$PWD
cd /home/node/app
export SCREENSHOT_PATH=$TESTDIR/screenshots/
export NODE_PATH=/home/node/app/node_modules
export PATH=$NODE_PATH/.bin:$PATH
cucumber-js --require "../**/{cucumber-puppeteer,cucumber-puppeteer-axe}/features/**/*.js" --require "$TESTDIR/features/**/*.js" --world-parameters "{\"executablePath\":\"/usr/bin/chromium-browser\", \"dumpio\": true, \"defaultViewport\": {\"width\": 1512, \"height\": 982}}" $TESTDIR/features --format=json:$TESTDIR/test-results.json --exit
cd $TESTDIR
node toHTML.js
node toJunit.js
