# -*- coding: utf-8 -*-
import unittest

from plone import api
from plone.app.testing import TEST_USER_ID, setRoles
from plone.dexterity.interfaces import IDexterityFTI
from zope.component import createObject, queryUtility

from ukstats.ccv2.content_types.testing import (  # noqa
    UKSTATS_CCV2_CONTENT_TYPES_INTEGRATION_TESTING,
)

try:
    from plone.dexterity.schema import portalTypeToSchemaName
except ImportError:
    # Plone < 5
    from plone.dexterity.utils import portalTypeToSchemaName


class FigureIntegrationTest(unittest.TestCase):

    layer = UKSTATS_CCV2_CONTENT_TYPES_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer["portal"]
        setRoles(self.portal, TEST_USER_ID, ["Manager"])
        self.parent = self.portal

    def test_ct_figure_schema(self):
        fti = queryUtility(IDexterityFTI, name="Figure")
        schema = fti.lookupSchema()
        schema_name = portalTypeToSchemaName("Figure")
        self.assertIn(schema_name.lstrip("plone_0_"), schema.getName())

    def test_ct_figure_fti(self):
        fti = queryUtility(IDexterityFTI, name="Figure")
        self.assertTrue(fti)

    def test_ct_figure_factory(self):
        fti = queryUtility(IDexterityFTI, name="Figure")
        factory = fti.factory
        obj = createObject(factory)

    def test_ct_figure_adding(self):
        setRoles(self.portal, TEST_USER_ID, ["Contributor"])
        obj = api.content.create(
            container=self.portal,
            type="Figure",
            id="figure",
        )

        parent = obj.__parent__
        self.assertIn("figure", parent.objectIds())

        # check that deleting the object works too
        api.content.delete(obj=obj)
        self.assertNotIn("figure", parent.objectIds())

    def test_ct_figure_globally_addable(self):
        setRoles(self.portal, TEST_USER_ID, ["Contributor"])
        fti = queryUtility(IDexterityFTI, name="Figure")
        self.assertTrue(fti.global_allow, "{0} is not globally addable!".format(fti.id))

    def test_ct_figure_filter_content_type_false(self):
        setRoles(self.portal, TEST_USER_ID, ["Contributor"])
        fti = queryUtility(IDexterityFTI, name="Figure")
        portal_types = self.portal.portal_types
        parent_id = portal_types.constructContent(
            fti.id,
            self.portal,
            "figure_id",
            title="Figure container",
        )
        self.parent = self.portal[parent_id]
        obj = api.content.create(
            container=self.parent,
            type="Document",
            title="My Content",
        )
        self.assertTrue(obj, "Cannot add {0} to {1} container!".format(obj.id, fti.id))
