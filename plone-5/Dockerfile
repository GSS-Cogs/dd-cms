FROM plone:5.2.7-python38

ARG POSTGRES_DB=local
ARG POSTGRES_USER=plone
# 172.17.0.1 is dockers internal representation of localhost
ARG POSTGRES_HOST=172.17.0.1
# don't default this, in case of mix ups with builds
ARG POSTGRES_PASSWORD
# location of the zope config, shouldn't change but lets not repeat ourselves
ARG ZOPE_CONF_LOCATION=/plone/instance/parts/instance/etc/zope.conf

# Check for mandatory build argument POSTGRES_PASSWORD
RUN \
    : "${POSTGRES_PASSWORD:?Build argument POSTGRES_PASSWORD needs to be set and non-empty.}"

COPY instance/custom.cfg /plone/instance/
COPY instance/src /plone/instance/src/
RUN \
    sed -i '/mysqlclient\|cx-Oracle\|ldap/d' buildout.cfg && \
    buildout -c custom.cfg && \
    find /data -not -user plone -exec chown plone:plone {} \+ && \
    find /plone -not -user plone -exec chown plone:plone {} \+
COPY instance/site.cfg /plone/instance/
COPY build-and-start.sh /usr/local/bin/build-and-start

# Copy in the zope conf template
COPY ./zope.conf $ZOPE_CONF_LOCATION

# Horrid sed hack to inject build args into zope.conf as plone doesn't
# sem to evalute new/unexpected environment variables at run time
RUN sed -i "s/POSTGRES_DB/$POSTGRES_DB/g" $ZOPE_CONF_LOCATION
RUN sed -i "s/POSTGRES_USER/$POSTGRES_USER/g" $ZOPE_CONF_LOCATION
RUN sed -i "s/POSTGRES_HOST/$POSTGRES_HOST/g" $ZOPE_CONF_LOCATION
RUN sed -i "s/POSTGRES_PASSWORD/$POSTGRES_PASSWORD/g" $ZOPE_CONF_LOCATION

CMD gosu plone bin/instance console
