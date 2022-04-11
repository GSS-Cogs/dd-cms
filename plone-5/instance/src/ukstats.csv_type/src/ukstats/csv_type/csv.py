"""CSV Content Type Schema."""
from plone import api
from plone.namedfile.field import NamedBlobFile
from plone.supermodel import model
from Products.Five import BrowserView

from ukstats.csv_type import _


class ICSV(model.Schema):
    """Schema for CSV Content Type."""

    csv = NamedBlobFile(
        title=_("CSV File"),
        description=_("Upload your csv file"),
        required=True,
    )

    json = NamedBlobFile(
        title=_("JSON Metadata"),
        description=_("Upload your JSON Metadata file"),
        required=False,
    )


class CSVView(BrowserView):
    def csv(self):
        context = aq_inner(self.context)
        catalog = api.portal.get_tool(name="portal_catalog")

        return catalog(
            object_provides=ICSV.__identifier__,
            path="/".join(context.getPhysicalPath()),
        )
