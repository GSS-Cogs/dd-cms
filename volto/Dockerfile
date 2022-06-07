FROM node:14-alpine3.15 as stage1

ARG ADDONS
ENV ADDONS=$ADDONS

RUN apk --no-cache add git && \
    mkdir -p /build && \
    chown -R node:node /build
USER node
WORKDIR /build
# restrict files/directories to copy in .dockerignore
COPY --chown=node . /build/

ENV BUILD_TARGET=server
RUN yarn global add mrs-developer
RUN yarn develop
RUN yarn install --frozen-lockfile && yarn cache clean
RUN yarn build
RUN yarn install --frozen-lockfile --prod

FROM node:14-alpine3.15
RUN mkdir -p /app && \
    chown -R node:node /app
USER node
WORKDIR /app

COPY --from=stage1 /build/build /app/build/
COPY --from=stage1 /build/node_modules /app/node_modules/
COPY package.json yarn.lock /app/

EXPOSE 3000
CMD yarn start:prod