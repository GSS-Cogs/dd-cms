Feature: Overview

  As an end user, I can view the overview page and teaser charts.

  Background:
    Given I open the url "http://climate-change.data.gov.uk/"
    And I expect the element "#main" is visible

  Scenario: Front page is visible
    Then I expect the element "#page-document" is visible
    And I take a screenshot

  Scenario: Navigation bar menus
    When I wait for xpath "//span[contains(text(), 'Dashboards')]" to be visible
    And I click the "span" element containing "Dashboards"
    And I wait for xpath "//p[contains(text(), 'Dashboards about the different indicators of climate change')]" to be visible
    And I wait for xpath "//a[contains(text(), 'Emissions')]" to be visible
    Then I take a screenshot

  Scenario: Related links
    When I wait for xpath "//*[contains(text(), 'Related Links')]" to be visible
    And I wait for xpath "//*[contains(text(), 'Met Office')]" to be visible
    Then I take a screenshot

  Scenario: Dashboard tiles
    When I wait for xpath "//*[contains(text(), 'Annual mean temperature')]" to be visible
    Then I expect the element "svg.cc-spark-line" is visible
    And I take a screenshot