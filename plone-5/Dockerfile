FROM plone:5.2.7-python38

COPY instance/custom.cfg /plone/instance/
COPY instance/src /plone/instance/src/
RUN \
    sed -i '/mysqlclient\|cx-Oracle\|ldap/d' buildout.cfg && \
    buildout -c custom.cfg && \
    find /data -not -user plone -exec chown plone:plone {} \+ && \
    find /plone -not -user plone -exec chown plone:plone {} \+
COPY instance/site.cfg /plone/instance/
COPY build-and-start.sh /usr/local/bin/build-and-start
CMD gosu plone bin/instance console
