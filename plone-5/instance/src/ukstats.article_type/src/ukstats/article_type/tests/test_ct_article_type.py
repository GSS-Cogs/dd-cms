# -*- coding: utf-8 -*-
from ukstats.article_type.testing import UKSTATS_ARTICLE_TYPE_INTEGRATION_TESTING  # noqa
from plone import api
from plone.app.testing import setRoles
from plone.app.testing import TEST_USER_ID
from plone.dexterity.interfaces import IDexterityFTI
from zope.component import createObject
from zope.component import queryUtility

import unittest


try:
    from plone.dexterity.schema import portalTypeToSchemaName
except ImportError:
    # Plone < 5
    from plone.dexterity.utils import portalTypeToSchemaName


class ArticleTypeIntegrationTest(unittest.TestCase):

    layer = UKSTATS_ARTICLE_TYPE_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer['portal']
        setRoles(self.portal, TEST_USER_ID, ['Manager'])
        self.parent = self.portal

    def test_ct_article_type_schema(self):
        fti = queryUtility(IDexterityFTI, name='article_type')
        schema = fti.lookupSchema()
        schema_name = portalTypeToSchemaName('article_type')
        self.assertEqual(schema_name, schema.getName())

    def test_ct_article_type_fti(self):
        fti = queryUtility(IDexterityFTI, name='article_type')
        self.assertTrue(fti)

    def test_ct_article_type_factory(self):
        fti = queryUtility(IDexterityFTI, name='article_type')
        factory = fti.factory
        obj = createObject(factory)


    def test_ct_article_type_adding(self):
        setRoles(self.portal, TEST_USER_ID, ['Contributor'])
        obj = api.content.create(
            container=self.portal,
            type='article_type',
            id='article_type',
        )


        parent = obj.__parent__
        self.assertIn('article_type', parent.objectIds())

        # check that deleting the object works too
        api.content.delete(obj=obj)
        self.assertNotIn('article_type', parent.objectIds())

    def test_ct_article_type_globally_addable(self):
        setRoles(self.portal, TEST_USER_ID, ['Contributor'])
        fti = queryUtility(IDexterityFTI, name='article_type')
        self.assertTrue(
            fti.global_allow,
            u'{0} is not globally addable!'.format(fti.id)
        )

    def test_ct_article_type_filter_content_type_false(self):
        setRoles(self.portal, TEST_USER_ID, ['Contributor'])
        fti = queryUtility(IDexterityFTI, name='article_type')
        portal_types = self.portal.portal_types
        parent_id = portal_types.constructContent(
            fti.id,
            self.portal,
            'article_type_id',
            title='article_type container',
         )
        self.parent = self.portal[parent_id]
        obj = api.content.create(
            container=self.parent,
            type='Document',
            title='My Content',
        )
        self.assertTrue(
            obj,
            u'Cannot add {0} to {1} container!'.format(obj.id, fti.id)
        )
