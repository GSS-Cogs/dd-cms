Feature: Overview

  As an end user, I can view the overview page and teaser charts.

  Background:
    Given I open the url "http://climate-change.data.gov.uk/"
    And I expect the element "#main" is visible

  Scenario: Front page is visible
    Then I expect the element "#page-document" is visible
    And I take a screenshot