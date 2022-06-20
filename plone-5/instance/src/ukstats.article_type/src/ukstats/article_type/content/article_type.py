# -*- coding: utf-8 -*-
from z3c.relationfield.schema import RelationChoice
from z3c.relationfield.schema import RelationList
from plone.dexterity.content import Container
from plone.supermodel import model


class IArticleType(model.Schema):
    """Marker interface for ArticleType"""

    related_list = RelationList(
        title="Related Items",
        default=[],
        value_type=RelationChoice(
            vocabulary="plone.app.vocabularies.Catalog",
        ),
        required=False,
    )
