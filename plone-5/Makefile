SHELL=bash

.PHONY: all
all: test build

.PHONY: build
build:
	docker build --build-arg POSTGRES_PASSWORD=$(POSTGRES_PASSWORD) --tag plone .

.PHONY: test
test:
	./bootstrap.sh
	./bin/test

.PHONY: debug
debug: build
	docker run -p 8080:8080 plone