# -*- coding: utf-8 -*-
"""Setup tests for this package."""
from plone import api
from plone.app.testing import setRoles, TEST_USER_ID
from ukstats.article_type.testing import (
    UKSTATS_ARTICLE_TYPE_INTEGRATION_TESTING  # noqa: E501,
)

import unittest


try:
    from Products.CMFPlone.utils import get_installer
except ImportError:
    get_installer = None


class TestSetup(unittest.TestCase):
    """Test that ukstats.article_type is properly installed."""

    layer = UKSTATS_ARTICLE_TYPE_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer['portal']
        if get_installer:
            self.installer = get_installer(self.portal, self.layer['request'])
        else:
            self.installer = api.portal.get_tool('portal_quickinstaller')

    def test_product_installed(self):
        """Test if ukstats.article_type is installed."""
        self.assertTrue(self.installer.isProductInstalled(
            'ukstats.article_type'))

    def test_browserlayer(self):
        """Test that IUkstatsArticleTypeLayer is registered."""
        from ukstats.article_type.interfaces import (
            IUkstatsArticleTypeLayer)
        from plone.browserlayer import utils
        self.assertIn(
            IUkstatsArticleTypeLayer,
            utils.registered_layers())


class TestUninstall(unittest.TestCase):

    layer = UKSTATS_ARTICLE_TYPE_INTEGRATION_TESTING

    def setUp(self):
        self.portal = self.layer['portal']
        if get_installer:
            self.installer = get_installer(self.portal, self.layer['request'])
        else:
            self.installer = api.portal.get_tool('portal_quickinstaller')
        roles_before = api.user.get_roles(TEST_USER_ID)
        setRoles(self.portal, TEST_USER_ID, ['Manager'])
        self.installer.uninstallProducts(['ukstats.article_type'])
        setRoles(self.portal, TEST_USER_ID, roles_before)

    def test_product_uninstalled(self):
        """Test if ukstats.article_type is cleanly uninstalled."""
        self.assertFalse(self.installer.isProductInstalled(
            'ukstats.article_type'))

    def test_browserlayer_removed(self):
        """Test that IUkstatsArticleTypeLayer is removed."""
        from ukstats.article_type.interfaces import \
            IUkstatsArticleTypeLayer
        from plone.browserlayer import utils
        self.assertNotIn(
            IUkstatsArticleTypeLayer,
            utils.registered_layers())
