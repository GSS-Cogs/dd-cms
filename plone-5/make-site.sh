#!/bin/bash

set -e -o pipefail

buildout -c site.cfg buildout:parts+=plonesite
find /data -not -user plone -exec chown plone:plone {} \+
find /plone -not -user plone -exec chown plone:plone {} \+
