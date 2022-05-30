# -*- coding: utf-8 -*-
"""Module where all interfaces, events and exceptions live."""

from zope.publisher.interfaces.browser import IDefaultBrowserLayer
from plone.supermodel import model
from ukstats.article_type import _
from z3c.relationfield.schema import RelationChoice
from z3c.relationfield.schema import RelationList


class IUkstatsArticleTypeLayer(IDefaultBrowserLayer):
    """Marker interface that defines a browser layer."""


class IArticle(model.Schema):
    """Schema for Article Type."""

    related_items = RelationList(
        title="Related Articles",
        default=[],
        value_type=RelationChoice(
            vocabulary="plone.app.vocabularies.Catalog",
        ),
        required=False,
    )
