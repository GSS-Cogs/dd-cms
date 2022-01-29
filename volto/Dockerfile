FROM node:14

WORKDIR /app
# restrict files/directories to copy in .dockerignore
COPY . /app/
RUN \
    yarn global add mrs-developer && \
    yarn develop && \
    yarn install --frozen-lockfile && \
    yarn build
CMD yarn start
