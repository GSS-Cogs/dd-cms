FROM plone:5.2.7-python38

ENV POSTGRES_DB=local
ENV POSTGRES_USER=plone
# # 172.17.0.1 is dockers internal representation of localhost
ENV POSTGRES_HOST=172.17.0.1
ENV POSTGRES_PASSWORD=""

COPY instance/custom.cfg /plone/instance/
COPY instance/src /plone/instance/src/
RUN \
    sed -i '/mysqlclient\|cx-Oracle\|ldap/d' buildout.cfg && \
    buildout -c custom.cfg && \
    find /data -not -user plone -exec chown plone:plone {} \+ && \
    find /plone -not -user plone -exec chown plone:plone {} \+
COPY instance/site.cfg /plone/instance/
COPY build-and-start.sh /usr/local/bin/build-and-start

# Copy in the zope conf template and the script dir
COPY ./zope.conf /plone/instance/parts/instance/etc/zope.conf
ADD ./scripts /plone/instance/scripts
RUN chmod -R +x /plone/instance/scripts

CMD /plone/instance/scripts/prestart.sh && \
    gosu plone bin/instance console
