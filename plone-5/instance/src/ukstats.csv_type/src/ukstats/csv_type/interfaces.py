# -*- coding: utf-8 -*-
from plone.app.textfield import RichText
from plone.supermodel import model
from zope import schema

"""Module where all interfaces, events and exceptions live."""

from zope.publisher.interfaces.browser import IDefaultBrowserLayer


class IUkstatsCsvTypeLayer(IDefaultBrowserLayer):
    """Marker interface that defines a browser layer."""
