# OS Level Dependencies
apt-get update -y
apt-get upgrade -y
apt-get install -y sudo
apt-get install -y curl
apt-get install -y make
apt-get install -y gcc
apt-get install -y g++

## Install Node 14
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt install nodejs

## Install NVM 16
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
source ~/.nvm/nvm.sh
nvm install 14
nvm use 14
export NVM_DIR="$HOME/.nvm"

## NPM Config
npm audit fix --force

## Install Yarn
curl -o- -L https://yarnpkg.com/install.sh | bash
export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"

## Install Volto
cd /volto/
yarn
yarn start
