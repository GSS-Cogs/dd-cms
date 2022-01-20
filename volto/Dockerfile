FROM ubuntu:20.04

EXPOSE 3000

ENV LANG=en_GB.UTF-8
ENV LANGUAGE=en_GB:en

COPY ./ ./volto/

CMD bash ./volto/ubuntu-install.sh
#CMD cd instance
#CMD pipenv run ./bin/instance fg
#COPY site.cfg /plone/instance/
#RUN buildout -c site.cfg \
# && find /data  -not -user plone -exec chown plone:plone {} \+ \
# && find /plone -not -user plone -exec chown plone:plone {} \+
