============================
ukstats.sparql_dataconnector
============================

A Plone content type that fetches results from a SPARQL
endpoint, and exposes them via an EEA-compatible
`@connector-data` route.

Features
--------

- Basic implementation
- Not-parameterized; runs the entered SPARQL literally


Documentation
-------------

None yet

Translations
------------

- English

Installation
------------

Install ukstats.sparql_dataconnector by adding it to your buildout::

    [buildout]

    ...

    eggs =
        ukstats.sparql_dataconnector


and then running ``bin/buildout``


Contribute
----------

- Issue Tracker: https://github.com/GSS-Cogs/dd-cms/issues
- Source Code: https://github.com/GSS-Cogs/dd-cms

License
-------

The project is licensed under the GPLv2.
