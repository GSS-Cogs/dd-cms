FROM plone:5

COPY site.cfg /plone/instance/
RUN buildout -c site.cfg \
 && find /data  -not -user plone -exec chown plone:plone {} \+ \
 && find /plone -not -user plone -exec chown plone:plone {} \+