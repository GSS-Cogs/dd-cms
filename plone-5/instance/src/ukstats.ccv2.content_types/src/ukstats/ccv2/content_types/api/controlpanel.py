# -*- coding: utf-8 -*-
from plone import api
from plone.restapi.services import Service
from plone.restapi.serializer.converters import json_compatible

REG_BASE = 'cmsconf'


class SiteTitle(Service):
    def reply(self):
        registry_record_value = api.portal.get_registry_record(REG_BASE + '.site_title')
        response_data = {
            'site_title': registry_record_value
        }
        return json_compatible(response_data)


class PhaseBanner(Service):
    def reply(self):
        phasebanner_state = api.portal.get_registry_record(
            REG_BASE + '.phasebanner_state')
        feedback_email = api.portal.get_registry_record(REG_BASE + '.feedback_email')
        return json_compatible({'bannerDisplay': phasebanner_state, 'bannerLink': feedback_email})


class GAID(Service):
    def reply(self):
        ga_id_value = api.portal.get_registry_record(REG_BASE + '.google_analytics_id')
        response_value = {'google_analytics_id': ga_id_value}
        return json_compatible(response_value)


class HotjarID(Service):
    def reply(self):
        hotjar_id_value = api.portal.get_registry_record(
            REG_BASE + '.hotjar_analytics_id')
        response_value = {'hotjar_analytics_id': hotjar_id_value}
        return json_compatible(response_value)


class ClimateChangeNotification(Service):
    def reply(self):
        climate_change_notification_state = api.portal.get_registry_record(
            REG_BASE + '.climate_change_notification_state')
        response_data = {
            'climate_change_notification_state': climate_change_notification_state
        }
        return json_compatible(response_data)
