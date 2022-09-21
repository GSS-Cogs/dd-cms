#!/bin/bash
set -e

COMMANDS="adduser debug fg foreground help kill logreopen logtail reopen_transcript run show status stop wait"
START="console start restart"

# Fixing permissions for external /data volumes
mkdir -p /data/blobstorage /data/cache /data/filestorage /data/instance /data/log /data/zeoserver
mkdir -p /plone/instance/src

# Add [instance] section for RelStorage if ENV RELSTORAGE_ADAPTER_OPTIONS is set

if [ -v RELSTORAGE_ADAPTER_OPTIONS ]; then
  echo "Adding relstorage config"
  /add_relstorage.py custom.cfg migration.conf
fi

if [ ! -e /data/initialized ]; then
  echo "Creating initial Plone site"
  buildout -c custom.cfg buildout:parts+=plonesite
  touch /data/initialized
elif [ -v RELSTORAGE_ADAPTER_OPTIONS ]; then
  buildout -c custom.cfg
fi

find /data  -not -user plone -exec chown plone:plone {} \+
find /plone -not -user plone -exec chown plone:plone {} \+

if [ -e /data/filestorage/Data.fs ] && [ -v RELSTORAGE_ADAPTER_OPTIONS ] && [ ! -e /data/migrated ]; then
  echo "Migrating from filestorage to relstorage"
  gosu plone bin/zodbconvert migration.conf
  touch /data/migrated
fi

# Plone instance start
if [[ $START == *"$1"* ]]; then
  exec gosu plone bin/instance console
fi

# Plone instance helpers
if [[ $COMMANDS == *"$1"* ]]; then
  exec gosu plone bin/instance "$@"
fi

# Custom
exec "$@"
