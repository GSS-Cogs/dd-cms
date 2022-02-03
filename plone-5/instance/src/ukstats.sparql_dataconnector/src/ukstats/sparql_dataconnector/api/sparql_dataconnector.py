# -*- coding: utf-8 -*-
""" dataconnector """

import logging
from ukstats.sparql_dataconnector.interfaces import ISPARQLDataProvider
from ukstats.sparql_dataconnector.interfaces import IBasicDataProvider
from plone.restapi.deserializer import json_body
from plone.restapi.interfaces import IExpandableElement
from plone.restapi.services import Service
from zope.component import adapter
from zope.component import getMultiAdapter
from zope.interface import implementer
from zope.interface import Interface


logger = logging.getLogger()


def handle_any(data, iov):
    """data is a dictionary of lists; we need to find which indexes in those
    lists to keep

    query is like  :
    [{u'i': u'NUTS_CODE',
      u'o': # u'plone.app.querystring.operation.selection.any',
      u'v': [u'enp4do4qw8']"""

    column = iov["i"]

    if column not in data:
        return data

    row = data[column]
    value = iov["v"]

    assert isinstance(value, list)  # 'cause op below is 'in'
    indexes = [i for i, v in enumerate(row) if v in value]

    res = {k: [row[x] for x in indexes] for k, row in data.items()}

    return res


HANDLERS = {u"plone.app.querystring.operation.selection.any": handle_any}


def handle_filter(data, _filter):
    """ handle filter """
    handler = HANDLERS.get(_filter["o"])

    if handler is None:
        logger.warning("Unhandled data filter %s", _filter["o"])

    return handler(data, _filter)


def filter_data(data, query):
    """this is a simple, uncomplete and limited implementation of a query
    parser.
    See plone.app.querystring.queryparser for some details on querystrings"""

    if not query:
        return data

    for _filter in query:
        data = handle_filter(data, _filter)

    return data


@implementer(IExpandableElement)
@adapter(IBasicDataProvider, Interface)
class ConnectorData(object):
    """ connector data """

    def __init__(self, context, request):
        self.context = context
        self.request = request

    def __call__(self, expand=False):
        result = {
            "connector-data": {
                "@id": "{}/@connector-data".format(self.context.absolute_url())
            }
        }

        if not expand:
            return result

        # connector = IDataProvider(self.context)
        connector = getMultiAdapter(
            (self.context, self.request), IDataProvider)
        result["connector-data"]["data"] = connector.provided_data

        return result


class ConnectorDataGet(Service):
    """ connector data - get """

    def reply(self):
        """ reply """
        data = ConnectorData(self.context, self.request)

        return data(expand=True)["connector-data"]


class ConnectorDataPost(Service):
    """ connector data - post """

    def reply(self):
        """ reply """
        result = ConnectorData(self.context, self.request)(expand=True)
        qs = json_body(self.request)["query"]

        data = filter_data(result["connector-data"]["data"], qs)
        result["connector-data"]["data"] = data

        return result["connector-data"]
