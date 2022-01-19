FROM ubuntu:20.04

COPY ./ubuntu-install.sh /
COPY ./instance/custom.cfg /instance/custom.cfg
COPY ./sparql-dataconnector.patch /

CMD bash ubuntu-install.sh
#CMD cd instance
#CMD pipenv run ./bin/instance fg
#COPY site.cfg /plone/instance/
#RUN buildout -c site.cfg \
# && find /data  -not -user plone -exec chown plone:plone {} \+ \
# && find /plone -not -user plone -exec chown plone:plone {} \+
