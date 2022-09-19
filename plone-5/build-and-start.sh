#!/bin/bash

set -e -o pipefail

buildout "$@"
find /data -not -user plone -exec chown plone:plone {} \+
find /plone -not -user plone -exec chown plone:plone {} \+
gosu plone bin/instance console
