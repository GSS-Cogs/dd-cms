FROM node:14 as stage1

WORKDIR /app
# restrict files/directories to copy in .dockerignore
COPY . /app/
ENV BUILD_TARGET=server
RUN yarn global add mrs-developer
RUN yarn develop
RUN yarn install --frozen-lockfile
RUN yarn build
