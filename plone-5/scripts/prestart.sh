#!/bin/bash

# Scripts to be executed before the zope server starts.
# If using python - don't drag in new dependencies, standard library only please.
# If using bash - remember to chmod it.

# Inject env vars into the zope.conf.
python3 /plone/instance/scripts/configure_db_from_env.py

# Apply any patches
chmod +x /plone/instance/scripts/patch.sh
/plone/instance/scripts/patch.sh