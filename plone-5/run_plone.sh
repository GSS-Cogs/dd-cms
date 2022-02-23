#!/usr/bin/env bash

docker run -it --rm --name=plone -p 8080:8080 \
           -e FIND_LINKS='https://eggrepo.eea.europa.eu/simple/' \
           -e SITE=Plone \
           -e ADDONS='kitconcept.volto eea.api.dataconnector eea.restapi' \
           -e PLONE_DEVELOP='src/ukstats.article_type' \
           -v "$(pwd)"/instance:/instance \
           -e ZCML='kitconcept.volto.cors' \
           -e PROFILES='kitconcept.volto:default-homepage' \
           --volume=plone-data:/data \
           plone
