# User Configurable Variables
TARGET_PLONE_DIRECTORY="../../plone"
PLONE_PASSWORD="admin"

# OS Level Dependencies
sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get install -y libz-dev
sudo apt-get install -y libjpeg-dev
sudo apt-get install -y openssl-dev
sudo apt-get install -y libxml2-dev
sudo apt-get install -y libxslt-dev

# Application Dependencies
sudo apt-get install -y make
sudo apt-get install -y gcc
sudo apt-get install -y python3.8-dev
sudo apt install -y python3.8-venv

## Install Node 14
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt install nodejs

## Install NVM 16
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
source ~/.nvm/nvm.sh
nvm install 16
nvm use 16
export NVM_DIR="$HOME/.nvm"

## NPM Config
npm audit fix --force

## Install Yarn
curl -o- -L https://yarnpkg.com/install.sh | bash

## Install Plone
wget --no-check-certificate https://launchpad.net/plone/5.2/5.2.5/+download/Plone-5.2.5-UnifiedInstaller-1.0.tgz
tar -xf Plone-5.2.5-UnifiedInstaller-1.0.tgz
cd Plone-5.2.5-UnifiedInstaller-1.0
bash install.sh standalone --target=$TARGET_PLONE_DIRECTORY --with-python=/usr/bin/python3.8 --password=$PLONE_PASSWORD


## Install Volto
cd ../..
mkdir volto
cd volto
npm install -g yo @plone/generator-volto
yo @plone/volto dd-cms --skip-addons

# Tidy Up
find ../../ -name 'Plone-5.2.5-UnifiedInstaller-1.0*' -exec rm -rf {} \;

