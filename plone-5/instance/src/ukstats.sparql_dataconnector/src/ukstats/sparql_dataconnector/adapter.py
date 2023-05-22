""" adapter module - Based on eea.api.dataconnector add-on"""
import logging
from plone.memoize import ram
from zope.component import adapter
from zope.interface import implementer
from zope.publisher.interfaces.browser import IBrowserRequest

from eea.api.dataconnector.interfaces import IDataProvider
from .interfaces import ISPARQLDataConnector
from eea.restapi.utils import timing

from SPARQLWrapper import SPARQLWrapper, JSON

logger = logging.getLogger(__name__)

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

        try:
            results = sparql.query().convert()
        except Exception as e:
            logger.exception(f"SPARQL query execution error: {str(e)}")
            results = None
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
        return {
            "results": rotate_data,
            "metadata": {},
        }

    @property
    def provided_data(self):
        """ provided data """
        self.request.response.setHeader(
            'Cache-Control', 'public, max-age=3600'
        )
        return self._provided_data()
