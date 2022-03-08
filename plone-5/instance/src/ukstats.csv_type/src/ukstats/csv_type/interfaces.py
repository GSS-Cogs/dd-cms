# -*- coding: utf-8 -*-
from example.conference import _
from plone.app.textfield import RichText
from plone.supermodel import model
from zope import schema

"""Module where all interfaces, events and exceptions live."""

from zope.publisher.interfaces.browser import IDefaultBrowserLayer


class IUkstatsCsvTypeLayer(IDefaultBrowserLayer):
    """Marker interface that defines a browser layer."""


class ICSV(model.Schema):

    """A conference program. Programs can contain Sessions."""

    aboutUrl = schema.URI(
        title=_(u'About URL'),
        description=_(u'About URL'),
        required=False,
    )

    base = schema.Text(
        title=_(u'CSV File Name'),
        description=_(u'CSV File Name'),
        required=True
    )

    csv_stream = schema.Text(
        title=_(u'Stream'),
        description=_(u'CSV Stream'),
        required=False
    )

    datatype = schema.Text(
        title=_(u'Data Type'),
        description=_(u'Data Type'),
        required=False,
    )

    metadata_filename = schema.Text(
        title=_(u'File Name'),
        description=_(u'File Name'),
        required=False,
    )

    containing_graph_uri = schema.URI(
        title=_(u'Graph URI'),
        description=_(u'URI'),
        required=False,
    )
