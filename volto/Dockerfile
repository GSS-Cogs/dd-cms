FROM node:14 as builder

WORKDIR /app
# restrict files/directories to copy in .dockerignore
COPY .eslintrc.js babel.config.js jsconfig.json package.json razzle.config.js yarn.lock mrs.developer.json /app/
RUN \
    yarn global add mrs-developer && \
    mkdir -p src/addons && \
    yarn develop && \
    yarn install

COPY locales /app/locales/
COPY patches /app/patches/
COPY public /app/public/
COPY src /app/src/
COPY theme /app/theme/
RUN yarn install
ENV BUILD_TARGET=server
RUN yarn -s build

FROM node:14

WORKDIR /app
COPY --from=builder /app/build /app
CMD node server.js
