# ============================================================================
# DEXTERITY ROBOT TESTS
# ============================================================================
#
# Run this robot test stand-alone:
#
#  $ bin/test -s ukstats.ccv2.content_types -t test_chart.robot --all
#
# Run this robot test with robot server (which is faster):
#
# 1) Start robot server:
#
# $ bin/robot-server --reload-path src ukstats.ccv2.content_types.testing.UKSTATS_CCV2_CONTENT_TYPES_ACCEPTANCE_TESTING
#
# 2) Run robot tests:
#
# $ bin/robot /src/ukstats/ccv2/content_types/tests/robot/test_chart.robot
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

Scenario: As a site administrator I can add a Chart
  Given a logged-in site administrator
    and an add Chart form
   When I type 'My Chart' into the title field
    and I submit the form
   Then a Chart with the title 'My Chart' has been created

Scenario: As a site administrator I can view a Chart
  Given a logged-in site administrator
    and a Chart 'My Chart'
   When I go to the Chart view
   Then I can see the Chart title 'My Chart'


*** Keywords *****************************************************************

# --- Given ------------------------------------------------------------------

a logged-in site administrator
  Enable autologin as  Site Administrator

an add Chart form
  Go To  ${PLONE_URL}/++add++Chart

a Chart 'My Chart'
  Create content  type=Chart  id=my-chart  title=My Chart

# --- WHEN -------------------------------------------------------------------

I type '${title}' into the title field
  Input Text  name=form.widgets.IBasic.title  ${title}

I submit the form
  Click Button  Save

I go to the Chart view
  Go To  ${PLONE_URL}/my-chart
  Wait until page contains  Site Map


# --- THEN -------------------------------------------------------------------

a Chart with the title '${title}' has been created
  Wait until page contains  Site Map
  Page should contain  ${title}
  Page should contain  Item created

I can see the Chart title '${title}'
  Wait until page contains  Site Map
  Page should contain  ${title}
