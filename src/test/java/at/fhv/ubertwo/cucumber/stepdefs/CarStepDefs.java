package at.fhv.ubertwo.cucumber.stepdefs;

import at.fhv.ubertwo.web.rest.CarResource;
import io.cucumber.java.Before;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class CarStepDefs extends StepDefs {

    @Autowired
    private CarResource carResource;

    private MockMvc restCarMockMvc;

    @Before
    public void setup() {
        this.restCarMockMvc = MockMvcBuilders.standaloneSetup(carResource).build();
    }

    @When("I search car {string}")
    public void i_search_car(String carId) throws Throwable {
        actions = restCarMockMvc.perform(get("/api/cars/" + carId)
            .accept(MediaType.APPLICATION_JSON));
    }

    @Then("the car is found")
    public void the_car_is_found() throws Throwable {
        actions
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE));
    }

    @Then("the name is {string}")
    public void the_name_is(String name) throws Throwable {
        actions.andExpect(jsonPath("$.name").value(name));
    }
}
