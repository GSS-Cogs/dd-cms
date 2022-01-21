# User Configurable Variables
TARGET_PLONE_DIRECTORY="../../plone-5/"
PLONE_PASSWORD="admin"

# OS Level Dependencies
apt-get update -y
apt-get upgrade -y
apt-get install -y libz-dev
apt-get install -y libjpeg-dev
apt-get install -y openssl-dev
apt-get install -y libxml2-dev
apt-get install -y libxslt-dev
apt-get install sudo

# App Level Dependencies
apt-get install -y make
apt-get install -y gcc
apt-get install -y python3.8-dev
apt-get install -y python3.8-venv
apt-get install python3-pip
apt-get install -y wget
apt-get install -y patch
apt-get install -y pipenv

# Install Plone
wget --no-check-certificate https://launchpad.net/plone/5.2/5.2.5/+download/Plone-5.2.5-UnifiedInstaller-1.0.tgz
tar -xf Plone-5.2.5-UnifiedInstaller-1.0.tgz
cd Plone-5.2.5-UnifiedInstaller-1.0
bash install.sh standalone --target=$TARGET_PLONE_DIRECTORY --with-python=/usr/bin/python3.8 --password=$PLONE_PASSWORD

# Apply Patch
cd ../instance
pipenv --python 3.8
pipenv install SPARQLWrapper
# cd instance/
pipenv run buildout -c custom.cfg
cd ..
patch -N -r - -s -p0 < sparql-dataconnector.patch

# Tidy Up
find ../../ -name 'Plone-5.2.5-UnifiedInstaller-1.0*' -exec rm -rf {} \;