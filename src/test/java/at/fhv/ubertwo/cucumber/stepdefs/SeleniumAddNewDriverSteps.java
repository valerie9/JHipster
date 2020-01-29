package at.fhv.ubertwo.cucumber.stepdefs;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

public class SeleniumAddNewDriverSteps {
    private final WebDriver driver = new ChromeDriver();

    @Given("I launch and login chrome")
    public void I_launch_and_login_chrome() throws Throwable
    {
        driver.manage().window().maximize();
        Actions.loginAsAdmin(driver);
    }

    @Then("add car driver")
    public void add_car_driver() throws Throwable {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("cancel-save")));
        driver.findElement(By.xpath("//*[@id='field_name']")).sendKeys("Hans Müller");
        driver.findElement(By.xpath("//*[@id='field_age']")).sendKeys("50");
        driver.findElement(By.xpath("//*[@id='field_salary']")).sendKeys("2");
        Select selectTaxiOffice = new Select(driver.findElement(By.xpath("//*[@id='field_taxiOffice']")));
        selectTaxiOffice.selectByValue("1: Object");
        driver.findElement(By.xpath("//*[@id='save-entity']")).click();
    }

    @Then("close and quit chrome")
    public void close_and_quit_chrome() throws Throwable {
       Actions.endDriver(driver);
    }
}
