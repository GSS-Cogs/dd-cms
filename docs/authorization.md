# User Authorization

By default, Plone uses a built-in user database where users are members of one or more groups and have configurable
roles: Contributor, Editor, Member, Reader, Reviewer, Site administrator, Manager.

There are a number of plugins using a [pluggable authentication
service](https://productspluggableauthservice.readthedocs.io/en/latest/) (PAS), for instance to allow users to be
authenticated using LDAP/Active Directory, OAuth2.0, etc.

For the purposes of demonstration and testing, we have used
[pas.plugins.authomatic](https://pypi.org/project/pas.plugins.authomatic/) allowing the configuration of number of OAuth
1.0a and 2.0 as well as OpenID identity providers. We have configured our Google domain, gsscogs.uk, to act as an
identity provider so that users in this domain can self register and then separately be assigned to roles or groups.

## Test Configuration

Add `pas.plugins.authomatic` to the eggs in `plone-5/instance/custom.cfg` as per the [pas.plugins.authomatic
installation instructions](https://github.com/collective/pas.plugins.authomatic#installation) and `volto-authomatic` to
`volto/package.json` as per the [volto-authomatic installation
instructions](https://github.com/collective/volto-authomatic#existing-volto-project).

Add a new OAuth 2.0 Client ID via https://console.developers.google.com/apis/credentials. Ensure that the authorized
Javascript origins are set to the base address of the web applications and that the authorized redirect URIs include
the same base address with `/api/authomatic-handler/google` when logging in via Plone and `/login-authomatic/google`
when logging in via Volto.

In the control panel / add-ons, ensure that the Authomatic PAS plugin is installed; in control panel / security, enable
self-registration. In order to configure Authomatic, we'll need to use the Plone UI, so in /api, navigate to Site Setup
and under Users there should be a configuration page for Authomatic. Select UUID as User ID and copy in the JSON
from the [authomatic.json](authomatic.json) file, filling in the client-id and client-secret values from the above OAuth
2.0 Client ID page in console.developers.google.com/apis/credentials.

The test JSON configuration should restrict users to the gsscogs.uk domain and any further roles or permissions can then
be managed through the existing users and groups web user interface.

