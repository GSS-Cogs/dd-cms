from ukstats.csv_type import _
from plone.supermodel import model
from plone.namedfile.field import NamedBlobFile
from zope import schema


class ICSV(model.Schema):

    """A conference program. Programs can contain Sessions."""

    title = schema.TextLine(
        title=_(u'CSVW Title'),
        required=True,
    )

    description = schema.Text(
        title=_(u'CSVW Description'),
    )


    csv = NamedBlobFile(
        title=_(u'csv'),
        required=True,
    )

    json = NamedBlobFile(
        title=_(u'JSON Meta'),
        required=True,
    )
