SHELL=bash

RAZZLE_PATH=http://localhost:8080/climate-change

.PHONY: all
all: audit test build

.PHONY: build
build:
	yarn build

.PHONY: install
install:
	yarn develop && yarn install

# yarn audit will always return a non-zero exit code if
# any vulnerabilities are found regardless of severity
.PHONY: audit
audit: install
	yarn audit --summary

.PHONY: test
test: install
	yarn test --watchAll=false

.PHONY: debug
debug: 
	yarn run clean
	RAZZLE_DEV_PROXY_API_PATH=$(RAZZLE_PATH) yarn start:dev
