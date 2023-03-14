"""
Removes all signed in user credentials (oauth)

This is necessary to resolve a horrible edge case where we change the site url
but sign in credentials linger in the database.

This is effectively a massed forced logout, new logins will
then commence with oauth handshakes using the updated url
"""

from zope.component import getUtility
from plone.authomatic.useridentites import UserIdentity






# #from transaction import commit

# registry = getUtility(IAuthomaticCredentialsRegistry)

# for user_id in app.portal_membership.listMemberIds():
#     credentials = registry.get_by_user(user_id)
#     if credentials is not None:
#         registry.remove(credentials)

# commit()



