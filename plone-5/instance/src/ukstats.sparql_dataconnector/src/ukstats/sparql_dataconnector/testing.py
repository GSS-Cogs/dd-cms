# -*- coding: utf-8 -*-
from plone.app.contenttypes.testing import PLONE_APP_CONTENTTYPES_FIXTURE
from plone.app.robotframework.testing import REMOTE_LIBRARY_BUNDLE_FIXTURE
from plone.app.testing import (
    applyProfile,
    FunctionalTesting,
    IntegrationTesting,
    PloneSandboxLayer,
)
from plone.testing import z2

import ukstats.sparql_dataconnector


class UkstatsSparqlDataconnectorLayer(PloneSandboxLayer):

    defaultBases = (PLONE_APP_CONTENTTYPES_FIXTURE,)

    def setUpZope(self, app, configurationContext):
        # Load any other ZCML that is required for your tests.
        # The z3c.autoinclude feature is disabled in the Plone fixture base
        # layer.
        import plone.restapi
        self.loadZCML(package=plone.restapi)
        self.loadZCML(package=ukstats.sparql_dataconnector)

    def setUpPloneSite(self, portal):
        applyProfile(portal, 'ukstats.sparql_dataconnector:default')


UKSTATS_SPARQL_DATACONNECTOR_FIXTURE = UkstatsSparqlDataconnectorLayer()


UKSTATS_SPARQL_DATACONNECTOR_INTEGRATION_TESTING = IntegrationTesting(
    bases=(UKSTATS_SPARQL_DATACONNECTOR_FIXTURE,),
    name='UkstatsSparqlDataconnectorLayer:IntegrationTesting',
)


UKSTATS_SPARQL_DATACONNECTOR_FUNCTIONAL_TESTING = FunctionalTesting(
    bases=(UKSTATS_SPARQL_DATACONNECTOR_FIXTURE,),
    name='UkstatsSparqlDataconnectorLayer:FunctionalTesting',
)


UKSTATS_SPARQL_DATACONNECTOR_ACCEPTANCE_TESTING = FunctionalTesting(
    bases=(
        UKSTATS_SPARQL_DATACONNECTOR_FIXTURE,
        REMOTE_LIBRARY_BUNDLE_FIXTURE,
        z2.ZSERVER_FIXTURE,
    ),
    name='UkstatsSparqlDataconnectorLayer:AcceptanceTesting',
)
