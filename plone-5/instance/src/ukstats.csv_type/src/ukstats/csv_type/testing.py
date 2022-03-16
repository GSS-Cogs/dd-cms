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

import ukstats.csv_type


class UkstatsCsvTypeLayer(PloneSandboxLayer):

    defaultBases = (PLONE_APP_CONTENTTYPES_FIXTURE,)

    def setUpZope(self, app, configurationContext):
        # Load any other ZCML that is required for your tests.
        # The z3c.autoinclude feature is disabled in the Plone fixture base
        # layer.
        import plone.restapi
        self.loadZCML(package=plone.restapi)
        self.loadZCML(package=ukstats.csv_type)

    def setUpPloneSite(self, portal):
        applyProfile(portal, 'ukstats.csv_type:default')


UKSTATS_CSV_TYPE_FIXTURE = UkstatsCsvTypeLayer()


UKSTATS_CSV_TYPE_INTEGRATION_TESTING = IntegrationTesting(
    bases=(UKSTATS_CSV_TYPE_FIXTURE,),
    name='UkstatsCsvTypeLayer:IntegrationTesting',
)


UKSTATS_CSV_TYPE_FUNCTIONAL_TESTING = FunctionalTesting(
    bases=(UKSTATS_CSV_TYPE_FIXTURE,),
    name='UkstatsCsvTypeLayer:FunctionalTesting',
)


UKSTATS_CSV_TYPE_ACCEPTANCE_TESTING = FunctionalTesting(
    bases=(
        UKSTATS_CSV_TYPE_FIXTURE,
        REMOTE_LIBRARY_BUNDLE_FIXTURE,
        z2.ZSERVER_FIXTURE,
    ),
    name='UkstatsCsvTypeLayer:AcceptanceTesting',
)
