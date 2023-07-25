# -*- coding: utf-8 -*-
from plone import api
from plone.restapi.services import Service
from plone.restapi.serializer.converters import json_compatible

reg_base = 'cmsconf'


class SiteTitle(Service):
    def reply(self):
        registry_record_value = api.portal.get_registry_record(reg_base + '.site_title')
        response_data = {
            'site_title': registry_record_value
        }
        return json_compatible(response_data)


class PhaseBanner(Service):
    def reply(self):
        phasebanner_state = api.portal.get_registry_record(
            reg_base + '.phasebanner_state')
        feedback_email = api.portal.get_registry_record(reg_base + '.feedback_email')
        return {'bannerDisplay': phasebanner_state, 'bannerLink': feedback_email}

class GA_ID(Service):
    def reply(self):
        ga_id_value = api.portal.get_registry_record(reg_base + '.google_analytics_id')
        response_value = {'google_analytics_id': ga_id_value}
        return json_compatible(response_value)

class Hotjar_ID(Service):
    def reply(self):
        hotjar_id_value = api.portal.get_registry_record(reg_base + '.hotjar_analytics_id')
        response_value = {'hotjar_analytics_id' : hotjar_id_value}
        return json_compatible(response_value)