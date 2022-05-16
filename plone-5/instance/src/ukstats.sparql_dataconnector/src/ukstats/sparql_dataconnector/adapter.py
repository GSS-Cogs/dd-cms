""" adapter module - Based on eea.api.dataconnector add-on"""

from plone.memoize import ram
from zope.component import adapter
from zope.interface import implementer
from zope.publisher.interfaces.browser import IBrowserRequest

from eea.api.dataconnector.interfaces import IDataProvider
from .interfaces import ISPARQLDataConnector
from eea.restapi.utils import timing

from SPARQLWrapper import SPARQLWrapper, JSON


@adapter(ISPARQLDataConnector, IBrowserRequest)
@implementer(IDataProvider)
class SPARQLDataProviderForConnectors(object):
    """
    queries the SPARQL endpoint and formats the data in a way
    compatible with the EEAs existing @connector-data route
    """

    def __init__(self, context, request):
        self.context = context
        self.request = request

    @timing
    def _get_data(self):
        endpoint_url = self.context.endpoint_url
        query = self.context.sparql_query

        sparql = SPARQLWrapper(endpoint_url)
        sparql.setQuery(query)
        sparql.setReturnFormat(JSON)

        results = sparql.query().convert()

        return results

    def change_orientation(self, keys, data):
        """ change orientation """
        res = {}

        if not data:
            return res

        # TO DO: in-memory built, should optimize

        for k in keys:
            res[k] = [row[k]["value"] if k in row else None for row in data]

        return res

    # TO DO: persistent caching, periodical refresh, etc
    @ram.cache(lambda func, self: (self.context.modified(), self.request.form))
    def _provided_data(self):
        """ provided data """
        if not self.context.sparql_query:
            return []

        data = self._get_data()

        rotate_data = self.change_orientation(data['head']['vars'], data["results"]["bindings"])
        return rotate_data

    @property
    def provided_data(self):
        """ provided data """
        return self._provided_data()
