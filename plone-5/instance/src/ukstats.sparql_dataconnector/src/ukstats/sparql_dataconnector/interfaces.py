# -*- coding: utf-8 -*-
"""Module where all interfaces, events and exceptions live. Based on eea.api.dataconnector add-on"""
from plone.app.z3cform.widget import QueryStringFieldWidget
from plone import schema
from plone.autoform.interfaces import IFormFieldProvider
from plone.autoform import directives as form
from plone.dexterity.content import Container
from plone.supermodel import model
from zope.interface import provider
from zope.interface import Interface
from zope.interface import Attribute
from zope.publisher.interfaces.browser import IDefaultBrowserLayer
from eea.api.dataconnector.interfaces import IBasicDataProvider


class IUkstatsSparqlDataconnectorLayer(IDefaultBrowserLayer):
    """Marker interface that defines a browser layer."""


class ISPARQLDataConnector(Container):
    """ Another marker """


class ISPARQLDataConnectorSchema(model.Schema):
    """A SPARQL connector"""

    endpoint_url = schema.TextLine(
        title="SPARQL endpoint URL",
        required=True,
        default="http://dbpedia.org/sparql",
    )
    sparql_query = schema.Text(
        title="SPARQL Query",
        required=True,
        default="""
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            SELECT ?label
            WHERE { <http://dbpedia.org/resource/Asturias> rdfs:label ?label }
        """
    )

