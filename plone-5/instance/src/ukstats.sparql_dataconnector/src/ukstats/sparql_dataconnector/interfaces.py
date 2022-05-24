# -*- coding: utf-8 -*-
"""Module where all interfaces, events and exceptions live. Based on eea.api.dataconnector add-on"""
from plone import schema
from plone.dexterity.content import Container
from plone.supermodel import model
from zope.publisher.interfaces.browser import IDefaultBrowserLayer


class IUkstatsSparqlDataconnectorLayer(IDefaultBrowserLayer):
    """
    Marker interface that defines a browser layer.
    There are no Plone templates for this; it's only editable
    using the form schema
    """


class ISPARQLDataConnector(Container):
    """
    Marker interface that defines the content type,
    and allows us to target an adapter to produce
    @connector-data compatible output.
    """


class ISPARQLDataConnectorSchema(model.Schema):
    """A SPARQL connectors form definition"""

    endpoint_url = schema.TextLine(
        title="SPARQL endpoint URL",
        required=True,
        default="https://staging.gss-data.org.uk/sparql",
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

