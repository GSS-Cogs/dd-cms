#!/bin/sh

export NODE_PATH=/home/node/app/node_modules
TESTDIR=$PWD
node /home/node/app/node_modules/google-lighthouse-puppeteer/bin/lighthouse-puppeteer.js -f $TESTDIR/lighthouse-config.js -d $TESTDIR/reports/ -w -l '- --preset=desktop --skip-audits=is-on-https,redirects-http,uses-http2 '
