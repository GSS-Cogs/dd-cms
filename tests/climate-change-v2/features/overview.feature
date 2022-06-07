Feature: Overview

  As an end user, I can view the overview page and teaser charts.

  Background:
    Given I open the url "http://climate-change.data.gov.uk/"
    And I expect the element "#main" is visible

  Scenario: Front page is visible
    Then I expect the element "#page-document" is visible
    And I take a screenshot

  Scenario: Navigation bar menus
    When I click the "span" element containing "Dashboards"
    And I wait for xpath "//p[contains(text(), 'Dashboards about the different indicators of climate change')]" to be visible
    And I wait for xpath "//a[contains(text(), 'Emissions')]" to be visible
    Then I take a screenshot