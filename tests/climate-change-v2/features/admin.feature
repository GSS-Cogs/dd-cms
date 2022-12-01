Feature: Administration

  As a site administrator, I can log in and administer the site.

  Background:
    Given I open the url "http://climate-change.data.gov.uk/"
    And I expect the element "#main" is visible

  Scenario: login link/button
    Given I wait for element "'/login?return_url='" for 100 seconds
    And I click the link "'/login?return_url='" and wait for the element "#page-login"
    Then I expect the element "#page-login" contains text "Sign in to start session"

  Scenario: admin login
    Given I wait for element "'/login?return_url='" for 100 seconds
    And I click the link "'/login?return_url='" and wait for the element "#page-login"
    And I type "admin" in the "#email" element
    And I type "admin" in the "#password" element
    And I take a screenshot
    When I click the button "#login-form-submit" and wait for the element "#page-document"
    And I expect the element "#page-document" is visible after "60" seconds

  Scenario: add-ons installed
    Given I expect the element "#toolbar-personal" is visible after "30" seconds
    When I click the element "#toolbar-personal" and wait for the element "a[href='/controlpanel']"
    And I wait for xpath "//a[contains(text(), 'Site Setup')]" to be visible
    And I wait for 1 seconds
    And I take a screenshot
    Then I expect the element "a[href='/controlpanel']" is visible
    When I click the link "a[href='/controlpanel']" and wait for the element "#main .controlpanel"
    And I take a screenshot
    And I click the xpath link "//a[@href='/controlpanel/addons']" and wait for the network to be idle
    Then I expect the element "#main" contains text "Add-ons Settings"
    And I wait for xpath "//div[contains(text(), 'ukstats.ccv2.theme')]" to be visible
    And I wait for xpath "//div[contains(text(), 'ukstats.sparql_dataconnector')]" to be visible
    And I wait for xpath "//div[contains(text(), 'CSV Content Type')]" to be visible
    And I wait for xpath "//div[contains(text(), 'eea.api.dataconnector')]" to be visible
    And I take a screenshot
