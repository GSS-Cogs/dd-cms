""" behavior module - Based on eea.api.dataconnector add-on"""
import csv
import logging
from collections import defaultdict
from io import StringIO
from plone.app.dexterity.behaviors.metadata import DCFieldProperty
from plone.app.dexterity.behaviors.metadata import MetadataBase
from plone.dexterity.interfaces import IDexterityContent
from plone.rfc822.interfaces import IPrimaryFieldInfo
from zope.component import adapter
from zope.interface import implementer
from zope.publisher.interfaces.browser import IBrowserRequest
from .interfaces import ISPARQLConnector, ISPARQLDataProvider, ISPARQLFileDataProvider


logger = logging.getLogger(__name__)


@implementer(ISPARQLConnector)
@adapter(IDexterityContent)
class SPARQLDataConnector(MetadataBase):
    """Allow data connectivity to discodata

    See http://discomap.eea.europa.eu/App/SqlEndpoint/Browser.aspx
    """

    endpoint_url = DCFieldProperty(ISPARQLConnector["endpoint_url"])
    sparql_query = DCFieldProperty(ISPARQLConnector["sparql_query"])


@implementer(ISPARQLDataProvider)
@adapter(ISPARQLFileDataProvider, IBrowserRequest)
class SPARQLDataProviderForFiles(object):
    """Behavior implementation for content types with a File primary field"""

    def __init__(self, context, request):
        self.context = context
        self.request = request
        print("Hit SPARQLDataProviderForFiles")

    @property
    def provided_data(self):
        print("Hit provided_data")
        """ provided data """
        field = IPrimaryFieldInfo(self.context)

        if not field.value:
            return []

        text = field.value.data
        f = StringIO(text.decode("utf-8"))
        try:
            reader = csv.reader(f)
        except Exception:
            return []

        rows = list(reader)

        if not rows:
            return []

        keys = rows[0]
        res = defaultdict(list)

        for (i, k) in enumerate(keys):
            for row in rows[1:]:
                res[k].append(row[i])

        return res
