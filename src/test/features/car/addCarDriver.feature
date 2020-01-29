Feature: Add car Driver

    Scenario: Add new car driver
        When I search driver 'admin'
        Then the driver is found
        And driver name is 'Administrator'
