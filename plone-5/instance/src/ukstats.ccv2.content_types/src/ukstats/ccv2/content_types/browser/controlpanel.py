from plone import schema
from plone.app.registry.browser.controlpanel import ControlPanelFormWrapper
from plone.app.registry.browser.controlpanel import RegistryEditForm
from plone.autoform import directives
from plone.restapi.controlpanels import RegistryConfigletPanel
from zope.component import adapter
from zope.interface import Interface


class ICMSSiteSettings(Interface):
    site_title = schema.TextLine(
        title="Site Title",
        description="Set site title",
        default="Fantastic CMS Site",
        required=False,
    )

    hotjar_analytics_id = schema.TextLine(
        title="Hotjar Analytics ID",
        description="Set hotjar analytics ID",
        default="",
        required=False,
    )

    google_analytics_id = schema.TextLine(
        title="Google Analytics ID",
        description="Set google analytics ID",
        default="",
        required=False,
    )

    feedback_email = schema.TextLine(
        title="Phase Banner Feedback Email",
        description="Set email address for feedback in phase banner",
        default="",
        required=False,
    )

    phasebanner_state = schema.Bool(
        title="Enable phase banner",
        description="Enable or disable phase banner",
        default=True,
        required=False,
    )

    directives.widget("site_title", frontendOptions={"widget": "TextLinesFieldWidget"})

    directives.widget(
        "hotjar_analytics_id", frontendOptions={"widget": "TextLinesFieldWidget"}
    )

    directives.widget(
        "feedback_email", frontendOptions={"widget": "TextLinesFieldWidget"}
    )

    directives.widget(
        "phasebanner_state", frontendOptions={"widget": "SingleCheckBoxFieldWidget"}
    )


class CMSconfRegistryEditForm(RegistryEditForm):
    schema = ICMSSiteSettings
    schema_prefix = "cmsconf"
    label = "CMS Settings"


class CMSControlPanelFormWrapper(ControlPanelFormWrapper):
    form = CMSconfRegistryEditForm


@adapter(Interface, Interface)
class CMSRegistryConfigletPanel(RegistryConfigletPanel):
    """Volto control panel"""

    schema = ICMSSiteSettings
    schema_prefix = "cmsconf"
    configlet_id = "cmsconf-controlpanel"
    configlet_category_id = "Products"
    title = "CMS Settings"
    group = "Products"