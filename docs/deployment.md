# Deployment

The `deploy` directory contains a `docker-compose.yml` that deploys the `climate-1.ukstats.dev`
and `climate-2.ukstats.dev` sites.  It is designed to sit behind an existing load balancer,
currently the "cogs_proxy".

They use a `ADDONS` environment var to selectively enable their relevant addons. For these
deployments that includes `volto-authomatic`, for OAuth based login.

`climate-2` includes the `volto-climatechange-elements` addon, which brings in CCv2 styling
and some blocks and layouts from CCv2.

They both run on a single Plone backend.

The deployment is run from the `deployment-jenkinsfile`,  which is configured in a
simple jenkins pipeline job.
