# -*- coding: utf-8 -*-
"""Module where all interfaces, events and exceptions live."""
from example.conference import _
from plone.app.textfield import RichText
from plone.supermodel import model
from zope import schema

from zope.publisher.interfaces.browser import IDefaultBrowserLayer


class IUkstatsCsvTypeLayer(IDefaultBrowserLayer):
    """Marker interface that defines a browser layer."""


class ICSV(model.Schema):

    """A conference program. Programs can contain Sessions."""

    title = schema.TextLine(
        title=_(u'Program name'),
    )

    description = schema.Text(
        title=_(u'Program summary'),
    )

    start = schema.Datetime(
        title=_(u'Start date'),
        required=False,
    )

    end = schema.Datetime(
        title=_(u'End date'),
        required=False,
    )

    details = RichText(
        title=_(u'Details'),
        description=_(u'Details about the program.'),
        required=False,
    )
