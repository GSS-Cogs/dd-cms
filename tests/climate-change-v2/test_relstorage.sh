#!/usr/bin/env bash

WITH_RELSTORAGE="-f docker-compose.yml  -f docker-compose-relstorage.yml"

# Clear any previous volumes

docker compose $WITH_RELSTORAGE down --volumes --remove-orphans

# Running the test container brings up Plone, creating the initial site in Relstorage
# Run the tests with RelStorage backend

docker compose $WITH_RELSTORAGE run --rm test
