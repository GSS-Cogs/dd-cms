# Plone Development Environment

Setting up a development environment for Plone can be a bit tricky. Plone currently uses `buildout` to fetch
dependencies and also to create scripts and configuration files based on those dependencies, and `buildout` support
has recently been dropped from IntelliJ/PyCharm.

Since building Plone is already scripted as a Dockerfile and built as a Docker Image, it makes sense to re-use
the configuration and scripts to re-create a local environment that can be used in IntelliJ/PyCharm to run and debug
our Plone backend.

## Build the local environment

Firstly, ensure that you have the necessary tools installed: Docker, pipenv, git, patch, sed.

For Fedora:
```bash
sudo dnf install docker pipenv sed patch git
```

For Ubuntu:
```bash
sudo apt-get install docker.io build-essential pipenv
```

For Mac/OSX, Docker can be installed using the official [Docker Desktop](https://www.docker.com/products/docker-desktop)
for Mac, or [alternately one can use Homebrew](https://dhwaneetbhatt.com/blog/run-docker-without-docker-desktop-on-macos)
to install `hyperkit`, `minikube` and the docker cli commands. Once Docker is installed, the other tools can be installed
with Homebrew:
```bash
brew install pipenv
```

Docker is used to extract a baseline `buildout` config. plone will be run in a Pipenv locally.

Finally, run `./bootstrap.sh` to create a local, virtualenv (Pipenv) separate environment with all the right dependencies
fetched by `buildout` and placed into the `buildout-cache` directory.

Once buildout completes, the `instance` directory will contain all necessary dependencies and scripts used to launch
Plone. This can be launched directly:
```bash
cd instance
pipenv run ./bin/instance fg
```

Or the project/module can be loaded into PyCharm/IntelliJ as a sub-module, using the `plone-5.iml` project file.

Note that we need to ensure that IntelliJ knows where to find all the dependencies from the `buildout-cache` folder. The
following command should output the text needed to copy/paste into `plone-5.iml` to keep it up to date with any new
dependencies:

```bash
awk 'match($0, /(buildout-cache[^'\'']*)/, a) {print "      <sourceFolder url=\"file://$MODULE_DIR$/" a[1] "\" isTestSource=\"false\" />"}' instance/bin/instance
```

## Known issues

If you've used the `docker-compose` app, the plone container `chown`s 
its instance directory to avoid permission problems, including
any of our `instance/src/` extensions that are mounted into it.

So if you have permission problems with addons, make sure you own
the files:

`chown -R instance/src/addons`

## Configure Plone

To fully access the features of the data-driven addons such as dataconnector and plotly charts, Plone will need be
configured using the site setup options. If these aren't done quite right, the Discodata Connector option won't be in
the menus and files won't supply data to charts.

In Order:
- Log in.
- Go to Site Setup.
- Go to Add-Ons.
- Install/Enable the `EEA.API.DATACONNECTOR` and `EEA.RESTAPI` add-ons.
- Go back to Dexterity Types.
- Select File.
- Go to Behaviours.
- Enable the "Data provider for files" behaviour.
- Save.
