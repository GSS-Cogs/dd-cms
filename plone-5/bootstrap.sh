#!/usr/bin/env bash

set -e
plone=$(docker create plone:5.2.5)
for f in base.cfg buildout-base.cfg buildout.cfg develop.cfg lxml_static.cfg requirements.txt
do
  docker cp $plone:/plone/instance/$f instance/$f
done
docker rm -v $plone

if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -Ei '' 's|var-dir=/data|var-dir=data|;/RelStorage|psycopg2|mysqlclient|cx-Oracle|ldap/d' instance/buildout.cfg
else
    sed -i 's|var-dir=/data|var-dir=data|;/RelStorage\|psycopg2\|mysqlclient\|cx-Oracle\|ldap/d' instance/buildout.cfg
fi

pipenv --python 3.9

# preserve my path to reset it after the below...
mypath=$PATH

# Grab the ENV variables from the Plone 5 docker image
# N.B. Sets versions used below and also PATH and LANG
export $(docker inspect --format='{{join .Config.Env " "}}' plone:5.2.5)

# restore my path variable
export PATH=$mypath

pipenv install requests==2.27.1 pip==$PIP setuptools==$SETUPTOOLS zc.buildout==$ZC_BUILDOUT wheel==$WHEEL SPARQLWrapper
cd instance
pipenv run buildout -c custom.cfg
cd ..
