Feature: App

Scenario: Render App component
    Given I have App component
    When I click the URL
    Then I should be able to render App without crash