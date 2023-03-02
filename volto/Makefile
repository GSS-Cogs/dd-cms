SHELL=bash

RAZZLE_PATH=http://localhost:8080/climate-change

.PHONY: all
all: test build

.PHONY: build
build:
	yarn build

.PHONY: install
build:
	yarn develop && yarn install

.PHONY: test
test:
	yarn test

.PHONY: debug
debug: 
	yarn run clean
	RAZZLE_DEV_PROXY_API_PATH=$(RAZZLE_PATH) yarn start:dev