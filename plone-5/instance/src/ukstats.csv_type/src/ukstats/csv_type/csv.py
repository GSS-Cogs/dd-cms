from ukstats.csv_type import _
from plone.supermodel import model
from plone.namedfile.field import NamedBlobFile
from zope import schema


class ICSV(model.Schema):
    """A conference program. Programs can contain Sessions."""
    csv = NamedBlobFile(
        title=_(u'csv'),
        description=_(u'Upload your csv file'),
        required=True,
    )
