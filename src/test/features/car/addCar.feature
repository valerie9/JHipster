Feature: Car management

    Scenario: Retrieve car
        When I search car '6'
        Then the car is not found
