FROM ubuntu:20.04

EXPOSE 8080

ENV LANG=en_GB.UTF-8
ENV LANGUAGE=en_GB:en

COPY ./ubuntu-install.sh ./plone-5/
COPY ./instance/custom.cfg ./plone-5/instance/custom.cfg
COPY ./sparql-dataconnector.patch ./plone-5/

CMD bash ./plone/ubuntu-install.sh
#CMD cd instance
#CMD pipenv run ./bin/instance fg
#COPY site.cfg /plone/instance/
#RUN buildout -c site.cfg \
# && find /data  -not -user plone -exec chown plone:plone {} \+ \
# && find /plone -not -user plone -exec chown plone:plone {} \+
