FROM node:14

WORKDIR /app
# restrict files/directories to copy in .dockerignore
COPY . /app/
ENV BUILD_TARGET=server
RUN \
    yarn global add mrs-developer && \
    yarn develop && \
    yarn install --frozen-lockfile && \
    yarn build
