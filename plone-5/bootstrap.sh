#!/usr/bin/env bash

plone=$(docker create plone:5)
for f in base.cfg buildout-base.cfg buildout.cfg develop.cfg lxml_static.cfg requirements.txt
do
  docker cp $plone:/plone/instance/$f instance/$f
done
docker rm -v $plone

sed -i 's|var-dir=/data|var-dir=data|;/RelStorage\|psycopg2\|mysqlclient\|cx-Oracle\|ldap/d' instance/buildout.cfg

pipenv --python 3.8

# Grab the ENV variables from the Plone 5 docker image
# N.B. Sets versions used below and also PATH and LANG
export $(docker inspect --format='{{join .Config.Env " "}}' plone:5)

pipenv install pip==$PIP setuptools==$SETUPTOOLS zc.buildout==$ZC_BUILDOUT wheel==$WHEEL
cd instance
pipenv run buildout -c custom.cfg
