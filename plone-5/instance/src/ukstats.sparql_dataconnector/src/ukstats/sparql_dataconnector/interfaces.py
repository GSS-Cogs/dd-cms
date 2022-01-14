# -*- coding: utf-8 -*-
"""Module where all interfaces, events and exceptions live."""
from plone import schema
from plone.autoform.interfaces import IFormFieldProvider
from plone.supermodel import model
from zope.interface import provider
from zope.publisher.interfaces.browser import IDefaultBrowserLayer


class IUkstatsSparqlDataconnectorLayer(IDefaultBrowserLayer):
    """Marker interface that defines a browser layer."""


@provider(IFormFieldProvider)
class ISPARQLConnector(model.Schema):
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
