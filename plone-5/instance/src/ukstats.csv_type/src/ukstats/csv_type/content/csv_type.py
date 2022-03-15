# -*- coding: utf-8 -*-
from plone.dexterity.content import Container
from plone.supermodel import model
from plone.dexterity.content import Container

class ICSVType(model.Schema):
    """ Marker interface for CSV Type
    """


class ICSVMarker(Container):
    """ Another marker """
