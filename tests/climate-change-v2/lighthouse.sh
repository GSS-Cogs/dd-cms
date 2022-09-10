#!/bin/sh

export NODE_PATH=/home/node/app/node_modules
node /home/node/app/node_modules/google-lighthouse-puppeteer/bin/lighthouse-puppeteer.js -f /app/lighthouse-config.js -d reports/ -w -l '- --preset=desktop --skip-audits=is-on-https,redirects-http,uses-http2 '
