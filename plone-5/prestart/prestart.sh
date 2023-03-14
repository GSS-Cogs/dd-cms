#!/bin/bash

# Scripts to be executed before the zope server starts.
# If using python - don't drag in new dependencies, standard library only please.
# If using bash - remember to chmod it.

# Explcitly set standard environment variables
# TODO - I don't think these should be missing, I think this is
# a sign of some sort of misconfiguration, figure it out.
export PLONE_INSTANCE=/plone/instance/bin/instance
export PLONE_HOME=/plone/instance

# Patching
patch /plone/buildout-cache/eggs/cp38/Zope-4.6.3-py3.8.egg/OFS/ObjectManager.py objectmanager.patch

# Inject env vars into the zope.conf.
python3 /plone/instance/prestart/configure_db_from_env.py