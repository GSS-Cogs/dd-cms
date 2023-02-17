#!/bin/bash

# Scripts to be executed before the zope server starts.
# If using python - don't drag in new dependencies, standard library only please.
# If using bash - remember to chmod it.

# Inject env vars into the zope.conf.
python3 /plone/instance/prestart/configure_db_from_env.py