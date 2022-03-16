""" behavior module """

import logging

from io import StringIO
import csv
from plone.memoize import ram
from zope.component import adapter
from zope.interface import implementer
from zope.publisher.interfaces.browser import IBrowserRequest

from eea.api.dataconnector.interfaces import IDataProvider
from ukstats.csv_type.content.csv_type import ICSVMarker

logger = logging.getLogger(__name__)


@adapter(ICSVMarker, IBrowserRequest)
@implementer(IDataProvider)
class DataProviderForCsvws(object):
    """ data provider for connectors """

    def __init__(self, context, request):
        self.context = context
        self.request = request

    # TO DO: persistent caching, periodical refresh, etc
    @ram.cache(lambda func, self: (self.context.modified(), self.request.form))
    def _provided_data(self):
        """ provided data """
        print(self.context.csv)

        results = {}
        reader = csv.reader(StringIO(self.context.csv.data.decode('utf8')))
        headers = False
        for row in reader:
            if not headers:
                headers = row
                for col in row:
                    results[col] = []
            else:
                for index, val in enumerate(row):
                    results[headers[index]].append(val)

        return results

    @property
    def provided_data(self):
        """ provided data """
        return self._provided_data()
