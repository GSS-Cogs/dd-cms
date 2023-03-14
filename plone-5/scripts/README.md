# Scripts

Scripts for use on a _running_ plone server.

## Prestart

Scripts that need to be ran _before_ the server starts should be called via ./prestart.sh

The following command will let you run python scripts on the box in a more adhoc manner using the installed plone stack (sometimes necessary but to be avoided where possible, especially in production).

```
/plone/instance/bin/instance run <my-script>.py
```

Because we have multiple plone sites, the plone pytohn api will need to be prompted if you want to acquire traversable python objects (such as `site` and `portal`) you can do this via explicitly specifiying the site when you all this script, example:

```
/plone/instance/bin/instance run -O climate-change <my-script>.py
```