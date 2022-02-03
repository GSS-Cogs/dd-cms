""" adapter module - Based on eea.api.dataconnector add-on"""

import logging

from plone.memoize import ram
from zope.component import adapter
from zope.interface import implementer
from zope.publisher.interfaces.browser import IBrowserRequest

from eea.api.dataconnector.interfaces import IConnectorDataProvider, IDataProvider
from .interfaces import ISPARQLConnectorDataProvider, ISPARQLDataProvider
from eea.restapi.utils import timing

from SPARQLWrapper import SPARQLWrapper, JSON

logger = logging.getLogger(__name__)


@adapter(ISPARQLConnectorDataProvider, IBrowserRequest)
@implementer(ISPARQLDataProvider)
class SPARQLDataProviderForConnectors(object):
    """ data provider for connectors """

    def __init__(self, context, request):
        self.context = context
        self.request = request

    @timing
    def _get_data(self):
        """_get_data."""
        # query = urllib.parse.quote_plus(self.query)
        endpoint_url = self.context.endpoint_url
        query = self.context.sparql_query

        print(endpoint_url)
        print(query)

        sparql = SPARQLWrapper(endpoint_url)
        sparql.setQuery(query)
        sparql.setReturnFormat(JSON)

        results = sparql.query().convert()

        return results

    def change_orientation(self, data):
        """ change orientation """
        print("Data:", data)
        res = {}

        if not data:
            return res

        keys = data[0].keys()

        # TO DO: in-memory built, should optimize

        for k in keys:
            res[k] = [row[k]["value"] for row in data]

        return res

    # TO DO: persistent caching, periodical refresh, etc
    @ram.cache(lambda func, self: (self.context.modified(), self.request.form))
    def _provided_data(self):
        """ provided data """
        if not self.context.sparql_query:
            return []

        data = self._get_data()

        print("Data before wrangle:", data)
        rotate_data = self.change_orientation(data["results"]["bindings"])
        return rotate_data

    @property
    def provided_data(self):
        """ provided data """
        return self._provided_data()
