## Documentation
The repository for all things DD-CMS as part of the Integrated Data Service project.

A training on how to create your own website using Volto is available as part of the Plone training at [https://training.plone.org/5/volto/index.html](https://training.plone.org/5/volto/index.html).

## Quick Start

Below is a list of commands you will probably find useful.

### `yarn start`

Runs the project in development mode.
You can view your application at `http://localhost:3000`

The page will reload if you make edits.

### `yarn build`

Builds the app for production to the build folder.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

### `yarn start:prod`

Runs the compiled app in production.

You can again view your application at `http://localhost:3000`

### `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.

### `yarn i18n`

Runs the test i18n runner which extracts all the translation strings and
generates the needed files.


### mrs-developer

[mrs-developer](https://github.com/collective/mrs-developer) is a great tool
for developing multiple packages at the same time.

mrs-developer should work with this project by running the configured shortcut script:

```bash
yarn develop
```

Volto's latest razzle config will pay attention to your jsconfig.json file for any customizations.

In case you don't want (or can't) install mrs-developer globally, you can install it in this project by running:

```bash
yarn add -W mrs-developer
```

# Data Driven CMS
The repository for all things DD-CMS as part of the Integrated Data Service project.

## Installation

### Developer Installation
Go to the ubuntu-dev-tools-install.sh file in Github and download the file to your Ubuntu 20.04.3 installation. Execute it and follow the on-screen prompts carefully. 

It will: 
- Install Pycharm.
- Install Python.
- Install All Linux dependancies for Plone/Python/Pycharm etc.
- Install Git.
- Install the Ungit Git UI.
- Configure a GIT SSH key with your GitHub Account.
- Clone this repository into the location of the current working directory.
- Update The Operating System.

Then follow the regular install instructions as below.

### Regular Install.

Open the ubuntu-plone-20.4-plone-installer.sh installer script in the text editor of your choice and change at least the password to something sensible.

In the Linux Terminal, go to the directory with the installer script:

```
cd path/to/data-driven-cms 
```

...And then run the installer:

```
bash ubuntu-20.4-plone-installer.sh 
```

Enter your superuser credentials and hit return!

# Running A Plone Demo
Change directory into your Plone folder. By default this is "home/$USER/Plone", e.g:

```
cd /home/$USER/Plone
```

...And then run:

```
zinstance/bin/plonectl fg
```

A Plone server should launch to life with it's accessible URL on the Terminal. The username should be "admin" and the password will be what it was set to in the installer script mentioned in the Installation Section of this README,
