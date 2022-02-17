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

import ukstats.article_type


class UkstatsArticleTypeLayer(PloneSandboxLayer):

    defaultBases = (PLONE_APP_CONTENTTYPES_FIXTURE,)

    def setUpZope(self, app, configurationContext):
        # Load any other ZCML that is required for your tests.
        # The z3c.autoinclude feature is disabled in the Plone fixture base
        # layer.
        import plone.restapi
        self.loadZCML(package=plone.restapi)
        self.loadZCML(package=ukstats.article_type)

    def setUpPloneSite(self, portal):
        applyProfile(portal, 'ukstats.article_type:default')


UKSTATS_ARTICLE_TYPE_FIXTURE = UkstatsArticleTypeLayer()


UKSTATS_ARTICLE_TYPE_INTEGRATION_TESTING = IntegrationTesting(
    bases=(UKSTATS_ARTICLE_TYPE_FIXTURE,),
    name='UkstatsArticleTypeLayer:IntegrationTesting',
)


UKSTATS_ARTICLE_TYPE_FUNCTIONAL_TESTING = FunctionalTesting(
    bases=(UKSTATS_ARTICLE_TYPE_FIXTURE,),
    name='UkstatsArticleTypeLayer:FunctionalTesting',
)


UKSTATS_ARTICLE_TYPE_ACCEPTANCE_TESTING = FunctionalTesting(
    bases=(
        UKSTATS_ARTICLE_TYPE_FIXTURE,
        REMOTE_LIBRARY_BUNDLE_FIXTURE,
        z2.ZSERVER_FIXTURE,
    ),
    name='UkstatsArticleTypeLayer:AcceptanceTesting',
)
