# Plone Development Environment

Setting up a development environment for Plone can be a bit tricky. Plone currently uses `buildout` to fetch
dependencies and also to create scripts and configuration files based on those dependencies, and `buildout` support
has recently been dropped from IntelliJ/PyCharm.

Since building Plone is already scripted as a Dockerfile and built as a Docker Image, it makes sense to re-use
the configuration and scripts to re-create a local environment that can be used in IntelliJ/PyCharm to run and debug
our Plone backend.

## Build the local environment

Run `./bootstrap.sh` to create a local, virtualenv (Pipenv) separate environment with all the right dependencies
fetched by `buildout` and placed into the `buildout-cache` directory.

Once complete, the project/module can be loaded into IntelliJ as a sub-module, using the `plone-5.iml` project file.

Note that we need to ensure that IntelliJ knows where to find all the dependencies from the `buildout-cache` folder. The
following command should output the text needed to copy/paste into `plone-5.iml` to keep it up to date with any new
dependencies:

```bash
awk 'match($0, /(buildout-cache[^'\'']*)/, a) {print "      <sourceFolder url=\"file://$MODULE_DIR$/" a[1] "\" isTestSource=\"false\" />"}' instance/bin/instance
```