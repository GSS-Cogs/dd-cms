# -*- coding: utf-8 -*-
from plone.app.contenttypes.testing import PLONE_APP_CONTENTTYPES_FIXTURE
from plone.app.robotframework.testing import REMOTE_LIBRARY_BUNDLE_FIXTURE
from plone.app.testing import (
    FunctionalTesting,
    IntegrationTesting,
    PloneSandboxLayer,
    applyProfile,
)
from plone.testing import z2

import ukstats.ccv2.content_types


class UkstatsCcv2ContentTypesLayer(PloneSandboxLayer):

    defaultBases = (PLONE_APP_CONTENTTYPES_FIXTURE,)

    def setUpZope(self, app, configurationContext):
        # Load any other ZCML that is required for your tests.
        # The z3c.autoinclude feature is disabled in the Plone fixture base
        # layer.
        import plone.restapi

        self.loadZCML(package=plone.restapi)
        self.loadZCML(package=ukstats.ccv2.content_types)

    def setUpPloneSite(self, portal):
        applyProfile(portal, "ukstats.ccv2.content_types:default")


UKSTATS_CCV2_CONTENT_TYPES_FIXTURE = UkstatsCcv2ContentTypesLayer()


UKSTATS_CCV2_CONTENT_TYPES_INTEGRATION_TESTING = IntegrationTesting(
    bases=(UKSTATS_CCV2_CONTENT_TYPES_FIXTURE,),
    name="UkstatsCcv2ContentTypesLayer:IntegrationTesting",
)


UKSTATS_CCV2_CONTENT_TYPES_FUNCTIONAL_TESTING = FunctionalTesting(
    bases=(UKSTATS_CCV2_CONTENT_TYPES_FIXTURE,),
    name="UkstatsCcv2ContentTypesLayer:FunctionalTesting",
)


UKSTATS_CCV2_CONTENT_TYPES_ACCEPTANCE_TESTING = FunctionalTesting(
    bases=(
        UKSTATS_CCV2_CONTENT_TYPES_FIXTURE,
        REMOTE_LIBRARY_BUNDLE_FIXTURE,
        z2.ZSERVER_FIXTURE,
    ),
    name="UkstatsCcv2ContentTypesLayer:AcceptanceTesting",
)
