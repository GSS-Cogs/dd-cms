TARGET_PLONE_DIRECTORY="/home/$USER/Plone"
PLONE_PASSWORD="admin"

sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get install -y libz-dev
sudo apt-get install -y libjpeg-dev
sudo apt-get install -y openssl-dev
sudo apt-get install -y libxml2-dev
sudo apt-get install -y libxslt-dev

sudo apt-get install -y make
sudo apt-get install -y gcc
sudo apt-get install -y python3.8-dev
sudo apt install -y python3.8-venv

wget --no-check-certificate https://launchpad.net/plone/5.2/5.2.5/+download/Plone-5.2.5-UnifiedInstaller-1.0.tgz
tar -xf Plone-5.2.5-UnifiedInstaller-1.0.tgz
cd Plone-5.2.5-UnifiedInstaller-1.0
bash install.sh standalone --target=$TARGET_PLONE_DIRECTORY --with-python=/usr/bin/python3.8 --password=$PLONE_PASSWORD
sudo reboot
