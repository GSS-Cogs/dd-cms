# Data Driven CMS

Publishing and disseminating statistics is typically done by preparing data, analysing and generating reports that
summarise and support the insights of the analysis.

We want to enable statisticians to create and disseminate reports that are fundamentally data-driven so that:
* they can create content in the browser; 
* data can be added to content;
* the content is driven by the data and so outputs are _reproducable_;
* multiple, external data sources can be used together to derive _added value_.
* the data can be disseminated such that it can be _re-used_; 

Creation, editing, drafting and reviewing of the reports, dashboards and underlying data should be done using the same
web interface that is used to manage and disseminate these artifacts, using a content management system.

To support this, we are basing some prototypes and demos on top of an existing open source content management system,
Plone/Volto, and more specifically the [great work](https://github.com/eea) that has been done for the European
Environment agency on data driven content. We are concentrating on developing add-on components highlighted below as
open source, re-usable packages that themselves make full use of other open source packages.

![components](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.github.com/GSS-Cogs/dd-cms/main/docs/components.puml)