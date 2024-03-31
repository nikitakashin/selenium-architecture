import { Builder, By, until } from "selenium-webdriver";

describe("Registration Form Test", () => {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  it("Registration", async () => {
    await driver.get("https://www.selenium.dev/selenium/web/web-form.html");

    await driver.findElement(By.id("my-text-id")).sendKeys("test");
    const pass = await driver.findElement(By.name("my-password"));
    pass.sendKeys("qwe");
  });
});
