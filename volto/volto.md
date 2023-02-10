# Volto development

`volto` is a React project that uses the [razzle](https://razzlejs.org/) build system.

You can't make any useful headway in `volto` without a `plone` backend running.

## Background

We target `node` version 14 - which is the newest version of node that volto 13 supports. We use `yarn` 
for dependency management etc.

We have yarn workspaces registered in `package.json`. We have these so yarn fetches their dependencies along with
those in package.json.

We have forced some `resolutions` in package.json to prevent cross-version problems in various modules. React, for 
example, doesn't like to have separate versions installed.

There are two ways to work on volto; locally with node, or in a `docker-compose` app.

## Addons

The addons that volto loads are normally specified in the `package.json:addons` array. That can be
overridden using the ADDONS env var.

There are two aspects to using a volto addon. 

First, the add on must be available as either a `node_module` or as a `mrs-developer` managed workspace in 
this project. This step means the addon source will be present, and any dependencies it has will also be installed.

Second, to use the addon, it must be present in the `package.json:addons` array. This will cause the volto to load 
the addon when it starts.

Volto also checks for an [`ADDONS` environment var](https://docs.voltocms.com/configuration/environmentvariables/#use-add-ons-via-the-addons-environment-variable), with ";" separated addons, and overrides the value from package.json
if this env var exists.

We use this to support concurrent deployments of volto in "prod". We include the addons as package.json 
or mrs-developer deps, so they are present in every docker container. Then we use an `addons` argument, which is mapped
to the `ADDONS` env var in the build step for the container, to configure which addons are built with volto.

ADDONS is only supported in volto 14+; we run a patch to make it possible in volto 13.

During dev for an addon that won't necessarily be used in every instance, you can use a local `.env` file to override 
the addons. There's an example already for the CCv2 components. 

To use it, run `docker compose --env-file=.env.ccv2 up`

## Working on volto

### With `docker-compose`

The simplest way is to run `docker compose up` in the root of the project. 

This will start containers running plone and volto. Access volto at http://localhost:3000

The cloned volto dir is bind mounted inside the container. Hot reloading works with this setup.

### Manual steps

You have to start a `plone` instance. See the docs in that directory for the steps on that.

You'll need to have `mrs-developer` installed globally. See the [mrs-developer](#mrs-developer) section below.  It's 
a tool that clones 3rd party modules from their git repos.

From this `volto` dir,

To start from a clean slate (optional; a clean clone of the repo should already be in this state):

```bash
rm -rf node_modules
rm -rf build
git clean -f src/addons
```

Then install the dependencies:

```bash
# fetch any dependencies using mrs-developer.
# this is done first because these repos have their own deps
# which will need be be installed
yarn develop
# install the dependencies, including those from workspaces
yarn install
```

The run the dev server:

```bash
yarn start
```

> ⚠️ if you're using `nvm` to switch versions, and trying to run these commands in an IDE,
> include a PATH environment var that includes the NVM path. For any script in package.json that
> is a `razzle <subcommand>`, razzle shells another instance of `node`. So ensure the PATH references
> the right version.

### `jest` unit tests

Run `yarn test`

We have configured `jest` in `package.json` so it only tests specific add ons; we only want to test code we write!

Use the `jest.roots` section in `package.json` to tweak that. 

We don't use `razzle test` because in doing that, jest picks up the `@plone/volto/package.json` config
and ignores the overrides in our `package.json`.

The command can be run inside the `volto` container from the `docker-compose` app in the Jetbrains 
IDEs easily enough. 

## Commands

Some raw details about the commands.

### `yarn develop && yarn install`

Installs the dependencies, including the `mrs-developer` provided source packages.  

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

## Switching between git branches

If you are switching between git branches, please run following

`yarn run clean`

### mrs-developer

[mrs-developer](https://github.com/collective/mrs-developer) is a great tool
for developing multiple packages at the same time.

mrs-developer should work with this project by running the configured shortcut script:

```bash
yarn global add mrs-developer
```

Volto's latest razzle config will pay attention to your jsconfig.json file for any customizations.

In case you don't want (or can't) install mrs-developer globally, you can install it in this project by running:

```bash
yarn add -W mrs-developer
```

