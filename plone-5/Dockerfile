FROM plone:5.2.5-python38

COPY instance/custom.cfg /plone/instance/
COPY instance/src /plone/instance/src/
COPY sparql-dataconnector.patch /plone/
RUN \
    sed -i '/RelStorage\|psycopg2\|mysqlclient\|cx-Oracle\|ldap/d' buildout.cfg && \
    buildout -c custom.cfg && \
    cd .. && \
    pip install SPARQLWrapper && \
    apt-get update && \
    apt-get install patch && \
    patch -p0 < sparql-dataconnector.patch && \
    rm -rf /var/lib/apt/lists/* && \
    cd instance && \
    find /data  -not -user plone -exec chown plone:plone {} \+ && \
    find /plone -not -user plone -exec chown plone:plone {} \+
