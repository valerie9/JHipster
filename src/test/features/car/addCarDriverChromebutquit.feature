Feature: Car driver management quit

    Scenario: Add car driver but quit
        When I launch and login
        Then try add car driver but quit
        Then close and quit
