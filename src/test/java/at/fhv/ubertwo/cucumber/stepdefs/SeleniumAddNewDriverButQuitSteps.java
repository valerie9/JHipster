package at.fhv.ubertwo.cucumber.stepdefs;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

public class SeleniumAddNewDriverButQuitSteps {
    private final WebDriver driver = new ChromeDriver();

    @Given("I launch and login")
    public void open_chrome_launch_application_login() throws Throwable
    {
        driver.manage().window().maximize();
        Actions.loginAsAdmin(driver);
    }

    @Then("try add car driver but quit")
    public void try_add_car_driver_but_quit() throws Throwable {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("cancel-save")));
        element.click();
    }

    @Then("close and quit")
    public void close_and_quit_chrome() throws Throwable {
       Actions.endDriver(driver);
    }
}
