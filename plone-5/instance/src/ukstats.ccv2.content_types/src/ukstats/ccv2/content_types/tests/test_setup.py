# -*- coding: utf-8 -*-
"""Setup tests for this package."""
import unittest

from plone import api
from plone.app.testing import TEST_USER_ID, setRoles

from ukstats.ccv2.content_types.testing import (  # noqa: E501
    UKSTATS_CCV2_CONTENT_TYPES_INTEGRATION_TESTING,
)

try:
    from Products.CMFPlone.utils import get_installer
except ImportError:
    get_installer = None


class TestSetup(unittest.TestCase):
    """Test that ukstats.ccv2.content_types is properly installed."""

    layer = UKSTATS_CCV2_CONTENT_TYPES_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer["portal"]
        if get_installer:
            self.installer = get_installer(self.portal, self.layer["request"])
        else:
            self.installer = api.portal.get_tool("portal_quickinstaller")

    def test_product_installed(self):
        """Test if ukstats.ccv2.content_types is installed."""
        self.assertTrue(
            self.installer.is_product_installed("ukstats.ccv2.content_types")
        )

    def test_browserlayer(self):
        """Test that IUkstatsCcv2ContentTypesLayer is registered."""
        from plone.browserlayer import utils

        from ukstats.ccv2.content_types.interfaces import IUkstatsCcv2ContentTypesLayer

        self.assertIn(IUkstatsCcv2ContentTypesLayer, utils.registered_layers())


class TestUninstall(unittest.TestCase):

    layer = UKSTATS_CCV2_CONTENT_TYPES_INTEGRATION_TESTING

    def setUp(self):
        self.portal = self.layer["portal"]
        if get_installer:
            self.installer = get_installer(self.portal, self.layer["request"])
        else:
            self.installer = api.portal.get_tool("portal_quickinstaller")
        roles_before = api.user.get_roles(TEST_USER_ID)
        setRoles(self.portal, TEST_USER_ID, ["Manager"])
        self.installer.uninstall_product("ukstats.ccv2.content_types")
        setRoles(self.portal, TEST_USER_ID, roles_before)

    def test_product_uninstalled(self):
        """Test if ukstats.ccv2.content_types is cleanly uninstalled."""
        self.assertFalse(
            self.installer.is_product_installed("ukstats.ccv2.content_types")
        )

    def test_browserlayer_removed(self):
        """Test that IUkstatsCcv2ContentTypesLayer is removed."""
        from plone.browserlayer import utils

        from ukstats.ccv2.content_types.interfaces import IUkstatsCcv2ContentTypesLayer

        self.assertNotIn(IUkstatsCcv2ContentTypesLayer, utils.registered_layers())
