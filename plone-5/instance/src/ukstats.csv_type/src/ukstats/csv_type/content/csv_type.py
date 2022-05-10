# -*- coding: utf-8 -*-
from plone.dexterity.content import Container


class ICSVMarker(Container):
    """
    Marker interface that defines the content type,
    and allows us to target an adapter to produce
    @connector-data compatible output.
    """
