"""Behavior to enable certain users to nominate reviewers

Includes form fields, an indexer to make it easy to find the items with
specific reviewers, and a local role provider to grant the Reviewer and
OfficialReviewer roles appropriately.
"""

from borg.localrole.interfaces import ILocalRoleProvider
from ukstats.article_type import _
from plone.autoform import directives
from plone.autoform.interfaces import IFormFieldProvider
from plone.formwidget.autocomplete.widget import AutocompleteMultiFieldWidget
from plone.indexer.interfaces import IIndexer
from plone.supermodel import model
from zope import schema
from zope.component import adapter
from zope.interface import Interface
from zope.interface import provider


@provider(IFormFieldProvider)
class IReviewers(model.Schema):
    """Support for specifying official and unofficial reviewers
    """

    model.fieldset(
        label=u"u'Ownership",
        fields=['official_reviewers', 'unofficial_reviewers']
        )        

    directives.widget(official_reviewers=AutocompleteMultiFieldWidget)
    directives.write_permission(official_reviewers='iz.EditOfficialReviewers')
    official_reviewers = schema.Tuple(
            title=_(u'Official reviewers'),
            description=_(
                u'People or groups who may review this item in an official '
                u'capacity.'
            ),
            value_type=schema.Choice(
                title=_(u"Principal"),
                source="plone.principalsource.Principals"
            ),
            required=False,
            missing_value=(), # important!
        )

    directives.widget(unofficial_reviewers=AutocompleteMultiFieldWidget)
    directives.write_permission(unofficial_reviewers='iz.EditUnofficialReviewers')
    unofficial_reviewers = schema.Tuple(
            title=_(u'Unofficial reviewers'),
            description=_(
                u'People or groups who may review this item in a supplementary '
                u'capacity'
            ),
            value_type=schema.Choice(
                title=_(u"Principal"),
                source="plone.principalsource.Principals"
            ),
            required=False,
            missing_value=(), # important!
        )


class IReviewersMarker(Interface):
    """Marker interface that will be provided by instances using the
    IReviewers behavior. The ILocalRoleProvider adapter is registered for
    this marker.
    """


@implementer(ILocalRoleProvider)
@adapter(IReviewersMarker)
class ReviewerLocalRoles(object):
    """Grant local roles to reviewers when the behavior is used.
    """

    def __init__(self, context):
        self.context = context

    def getRoles(self, principal_id):
        """If the user is in the list of reviewers for this item, grant
        the Reader, Editor and Contributor local roles.
        """

        c = IReviewers(self.context, None)
        if c is None or (not c.official_reviewers and not c.unofficial_reviewers):
            return ()

        if principal_id in c.official_reviewers:
            return ('Reviewer', 'OfficialReviewer',)
        elif principal_id in c.unofficial_reviewers:
            return ('Reviewer',)

        return ()

    def getAllRoles(self):
        """Return a list of tuples (principal_id, roles), where roles is a
        list of roles for the given user id.
        """

        c = IReviewers(self.context, None)
        if c is None or (not c.official_reviewers and not c.unofficial_reviewers):
            return

        seen = set ()

        for principal_id in c.official_reviewers:
            seen.add(principal_id)
            yield (principal_id, ('Reviewer', 'OfficialReviewer'),)

        for principal_id in c.unofficial_reviewers:
            if principal_id not in seen:
                yield (principal_id, ('Reviewer',),)


@implementer(IIndexer)
@adapter(IReviewersMarker)
class ReviewersIndexer(object):
    """Catalog indexer for the 'reviewers' index.
    """

    def __init__(self, context):
        self.reviewers = IReviewers(context)

    def __call__(self):
        official = self.reviewers.official_reviewers or ()
        unofficial = self.reviewers.unofficial_reviewers or ()
        return tuple(set(official + unofficial))
