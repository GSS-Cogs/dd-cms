# volto-climatechange-elements

This is an implementation of the Figma designs for the Climate Change
V2 site.

It uses a mixture of the govuk-frontend styles and introduces per-component
styles in SCSS sheets.

Contains various components that are destined to be Plone blocks,
but which are currently only used in a static `cc_preview` Plone layout view.

To see the components in action, you must register the `cc_preview` layout view
in Plone, via the Zope management interface. 

The simplest thing is to register it as a valid "Available View Method" for Documents at this page:

http://localhost:8080/Plone/portal_types/Document/manage_propertiesForm

(in the dev setup.)

Include `cc_preview` in the "Available View Methods" input. Save the changes.

Back in the main CMS, create a "Page" piece of content. When editing, 
use the "..." icon in the editor, and change "View" to "cc_preview".

The content should immediately switch to the static content.


