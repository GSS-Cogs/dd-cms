FROM plone:5.2.5-python38

COPY instance/custom.cfg /plone/instance/
COPY instance/src /plone/instance/src/
RUN \
    sed -i '/RelStorage\|psycopg2\|mysqlclient\|cx-Oracle\|ldap/d' buildout.cfg && \
    buildout -c custom.cfg && \
    cd .. && \
    pip install SPARQLWrapper && \
    cd instance && \
    find /data  -not -user plone -exec chown plone:plone {} \+ && \
    find /plone -not -user plone -exec chown plone:plone {} \+
