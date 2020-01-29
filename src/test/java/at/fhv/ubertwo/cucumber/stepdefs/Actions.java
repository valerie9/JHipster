package at.fhv.ubertwo.cucumber.stepdefs;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class Actions {

    public static void loginAsAdmin(WebDriver driver) {
        driver.get("http://localhost:9000/");
        driver.findElement(By.xpath("/html/body/jhi-main/div[2]/div/jhi-home/div/div[2]/ul/li/a")).click();
        driver.findElement(By.xpath("//*[@id='username']")).sendKeys("admin");
        driver.findElement(By.xpath("//*[@id='password']")).sendKeys("admin");
        driver.findElement(By.xpath("/html/body/ngb-modal-window/div/div/jhi-login-modal/div[2]/div/div[2]/form/button")).click();
    }

    public static void endDriver(WebDriver driver) {
        driver.close();
        driver.quit();
    }
}
