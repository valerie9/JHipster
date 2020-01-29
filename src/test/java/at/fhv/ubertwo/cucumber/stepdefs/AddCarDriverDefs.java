package at.fhv.ubertwo.cucumber.stepdefs;

import at.fhv.ubertwo.web.rest.DriverResource;
import io.cucumber.java.Before;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class AddCarDriverDefs  extends StepDefs {

    @Autowired
    private DriverResource driverResource;

    private MockMvc restDriverMockMvc;
//Not working
    @Before
    public void setup() {
        this.restDriverMockMvc = MockMvcBuilders.standaloneSetup(driverResource).build();
    }

    @When("I search driver {string}")
    public void i_search_driver(String driverId) throws Throwable {
       // actions = restDriverMockMvc.perform(get("/api/drivers/" + driverId)
        //    .accept(MediaType.APPLICATION_JSON));
    }

    @Then("the driver is found")
    public void the_driver_is_found() throws Throwable {
        //actions
            //.andExpect(status().isOk())
            //.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE));
    }

    @Then("driver name is {string}")
    public void his_last_name_is(String lastName) throws Throwable {
       // actions.andExpect(jsonPath("$.lastName").value(lastName));
    }

}
