sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get install xclip -y
sudo apt-get install curl -y 
sudo apt-get install xclip -y

echo Installing...please answer prompts below...Use defaults where possible.
echo What is your Github email address? 
read MY_GITHUB_EMAIL
echo What is your name?
read MY_NAME

sudo apt-get install -y git
git config --global user.name $MY_NAME
git config --global user.email $MY_GITHUB_EMAIL
ssh-keygen -t ed25519 -C $MY_GITHUB_EMAIL

eval "$(ssh-agent -s)"

ssh-add -K ~/.ssh/id_ed25519
xclip -selection clipboard < ~/.ssh/id_ed25519.pub
xdg-open https://github.com/settings/ssh/new
echo Opened Github...paste from clipboard into the key field. Set a sensible title for this machine. If this fails for some reason, you can manually go to https://github.com/settings/ssh/new and paste ~/ssh/id_ed25519.pub content to the key field.

curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt install nodejs
sudo npm install -g ungit

sudo snap install pycharm-community --classic

git clone git@github.com:GSS-Cogs/data-driven-cms.git

echo Done installing DD-CMS Dev Tools!
