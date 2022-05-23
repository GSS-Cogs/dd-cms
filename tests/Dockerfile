FROM node:14-alpine3.14

RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      freetype-dev \
      harfbuzz \
      ca-certificates \
      ttf-freefont

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN mkdir -p /home/node/app \
      && chown -R node:node /home/node/app

USER node

WORKDIR /home/node/app

# Copy package details
COPY ./package.json ./package-lock.json ./

# Install npm packages
RUN npm ci

ENTRYPOINT [ "node_modules/.bin/cucumber-js", "--require", "../**/{app,cucumber-puppeteer,cucumber-puppeteer-axe}/features/**/*.js", "--world-parameters", "{\"executablePath\":\"/usr/bin/chromium-browser\"}" ]
