Feature: Car management

    Scenario: Retrieve car
        When I search car '6'
        Then the car is found
        And the name is 'Sleek'
