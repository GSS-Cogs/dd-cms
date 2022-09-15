#!/usr/bin/env bash

WITH_PERSISTENCE="-f docker-compose.yml -f docker-compose-plonedata.yml"
WITH_RELSTORAGE="${WITH_PERSISTENCE} -f docker-compose-relstorage.yml"

# Clear any previous volumes

docker-compose $WITH_PERSISTENCE down --volumes --remove-orphans

# Build the initial Plone site as filestorage

docker-compose $WITH_PERSISTENCE run --rm plone test -f /data/initialized

# Run with relstorage options, data should be migrated

docker-compose $WITH_RELSTORAGE run --rm plone test -f /data/migrated

# Finally run the tests

docker-compose $WITH_RELSTORAGE run --rm test
