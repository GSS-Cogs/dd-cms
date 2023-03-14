"""
Removes all signed in user credentials (oauth)

This is necessary to resolve a horrible edge case where we change the site url
but sign in credentials linger in the database.

This is effectively a massed forced logout, new logins will
then commence with oauth handshakes using the updated url
"""

from zope.component import getUtility
from zope.component.hooks import getSite
from zope.publisher.interfaces import ISessionDataManager

site = getSite()
sdm = getUtility(ISessionDataManager)
