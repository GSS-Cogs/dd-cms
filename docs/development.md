# Development

`dd-cms` uses two components, the `plone-5` backend CMS (in python) and the 
`volto` React frontend for it (in plain Javascript).

There are [plone](plone.md) and [volto](volto.md) specific docs.

## Quickest start

The quickest way to start is to run the [`docker-compose`](../docker-compose.yml) app defined in the root of the
project, and then open http://localhost:3000 in your browser once they're running.

## M1 Mac users

You may run into an issue with the plone docker image on an M1 Mac machine.

Running this command `docker pull --platform linux/x86_64 plone:5.2.5` seems to solve the issue.

If you are using the `docker-compose` dev environment to mainly work on javascript dev, the version number 
of the image needs to match the version in the `docker-compose.yml` file.

If you are doing local development on plone, the version number of the image needs to match the version 
in the `bootstrap.sh` file.

## Common scenarios

#### Backend developer wants to run Plone within PyCharm / IntelliJ to help write and debug Python.

Use the instructions in [plone](plone.md) to create a local `pipenv` dev environment.
If you need to use Volto, start only the `plone` part of the `docker-compose` app:

```bash
docker compose up -d plone
```
#### Frontend developer wants to run Volto with hot-reload.

Run the `docker-compose` app from the project root. 

#### Full stack developer wants to run the various different Plone + Volto stack locally to test things out.

Use the instructions in [plone](plone.md) to create a local `pipenv` dev environment.
Use the instructions in [volto](volto.md) "Manual Steps" to create a local node 14 dev environment

#### Tester wants to build and run all the things on a local machine.

Run the `docker-compose` app from the project root. 

#### Deployment of all the things to some staging machine with OAuth login.

Check [deployment.md](deployment.md)

