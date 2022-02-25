# ============================================================================
# DEXTERITY ROBOT TESTS
# ============================================================================
#
# Run this robot test stand-alone:
#
#  $ bin/test -s ukstats.article_type -t test_article_type.robot --all
#
# Run this robot test with robot server (which is faster):
#
# 1) Start robot server:
#
# $ bin/robot-server --reload-path src ukstats.article_type.testing.UKSTATS_ARTICLE_TYPE_ACCEPTANCE_TESTING
#
# 2) Run robot tests:
#
# $ bin/robot /src/ukstats/article_type/tests/robot/test_article_type.robot
#
# See the http://docs.plone.org for further details (search for robot
# framework).
#
# ============================================================================

*** Settings *****************************************************************

Resource  plone/app/robotframework/selenium.robot
Resource  plone/app/robotframework/keywords.robot

Library  Remote  ${PLONE_URL}/RobotRemote

Test Setup  Open test browser
Test Teardown  Close all browsers


*** Test Cases ***************************************************************

Scenario: As a site administrator I can add a article_type
  Given a logged-in site administrator
    and an add article_type form
   When I type 'My article_type' into the title field
    and I submit the form
   Then a article_type with the title 'My article_type' has been created

Scenario: As a site administrator I can view a article_type
  Given a logged-in site administrator
    and a article_type 'My article_type'
   When I go to the article_type view
   Then I can see the article_type title 'My article_type'


*** Keywords *****************************************************************

# --- Given ------------------------------------------------------------------

a logged-in site administrator
  Enable autologin as  Site Administrator

an add article_type form
  Go To  ${PLONE_URL}/++add++article_type

a article_type 'My article_type'
  Create content  type=article_type  id=my-article_type  title=My article_type

# --- WHEN -------------------------------------------------------------------

I type '${title}' into the title field
  Input Text  name=form.widgets.IBasic.title  ${title}

I submit the form
  Click Button  Save

I go to the article_type view
  Go To  ${PLONE_URL}/my-article_type
  Wait until page contains  Site Map


# --- THEN -------------------------------------------------------------------

a article_type with the title '${title}' has been created
  Wait until page contains  Site Map
  Page should contain  ${title}
  Page should contain  Item created

I can see the article_type title '${title}'
  Wait until page contains  Site Map
  Page should contain  ${title}
