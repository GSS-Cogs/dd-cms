FROM plone:5.2.7-python38

ARG POSTGRES_DB=local
ARG POSTGRES_USER=plone
# 172.17.0.1 is dockers internal representatio of localhost
ARG POSTGRES_HOST=172.17.0.1
# don't default this, in case of mix ups with builds
ARG POSTGRES_PASSWORD

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
COPY ./zope.conf /plone/instance/parts/instance/etc/zope.conf

# Horrid sed hack to inject build args into zope.conf as env vars
# are not recognised by zope.conf
RUN sed -i "s/POSTGRES_DB/$POSTGRES_DB/g" /plone/instance/parts/instance/etc/zope.conf
RUN sed -i "s/POSTGRES_USER/$POSTGRES_USER/g" /plone/instance/parts/instance/etc/zope.conf
RUN sed -i "s/POSTGRES_HOST/$POSTGRES_HOST/g" /plone/instance/parts/instance/etc/zope.conf
RUN sed -i "s/POSTGRES_PASSWORD/$POSTGRES_PASSWORD/g" /plone/instance/parts/instance/etc/zope.conf

CMD gosu plone bin/instance console
