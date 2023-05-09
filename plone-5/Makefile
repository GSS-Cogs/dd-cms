SHELL=bash

.PHONY: all
all: build

.PHONY: build
build:
	docker build --tag plone .

.PHONY: debug
debug: build
	docker run -p 8080:8080 -e POSTGRES_PASSWORD=${POSTGRES_PASSWORD} plone