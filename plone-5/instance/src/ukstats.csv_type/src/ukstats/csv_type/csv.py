"""CSV Content Type Schema."""
from plone.namedfile.field import NamedBlobFile
from plone.supermodel import model
from ukstats.csv_type import _


class ICSV(model.Schema):
    """Schema for CSV Content Type."""

    csv = NamedBlobFile(
        title=_("CSV File"),
        description=_("Upload your csv file"),
        required=True,
    )
