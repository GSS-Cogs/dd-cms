# -*- coding: utf-8 -*-
from plone import api
from plone.restapi.services import Service
import json

reg_base = 'cmsconf'


class SiteTitle(Service):
    def reply(self):
        registry_record_value = api.portal.get_registry_record(reg_base + '.site_title')
        response_data = {
            'site_title': registry_record_value
        }
        return json.dumps(response_data)


class PhaseBanner(Service):
    def reply(self):
        phasebanner_state = api.portal.get_registry_record(
            reg_base + '.phasebanner_state')
        feedback_email = api.portal.get_registry_record(reg_base + '.feedback_email')
        return {'bannerDisplay': phasebanner_state, 'bannerLink': feedback_email}
