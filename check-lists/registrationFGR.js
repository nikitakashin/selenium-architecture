import { Builder, By, until } from "selenium-webdriver";
import { assert, expect } from "chai";
import {
  hoverOverElement,
  isMatchedPathName,
  hasQueryParam,
} from "@/utils/common.js";
import { getRandomUser, dropdownButtons } from "../utils/common.js";

// эл-ты dropdown

const dropdownBodyXPath =
  "/html/body/div[3]/div[2]/div[1]/header/div/div[2]/div/div/div[4]/div/div[1]/div/div/div";

// Иконки в ЛК
const iconOrderXpath =
  "/html/body/div[3]/div[4]/div[2]/div/div/div/div[1]/div/div/div[1]/div/a";
const iconPersonalDataXpath =
  "/html/body/div[3]/div[4]/div[2]/div/div/div/div[1]/div/div/div[2]/div/a";
const iconHistoryXpath =
  "/html/body/div[3]/div[4]/div[2]/div/div/div/div[1]/div/div/div[3]/div/a";

/////////////////////////////////////////////////////
const myCabinetXpath =
  "/html/body/div[3]/div[4]/div[2]/div/div/div/div[2]/div/aside/ul/li[1]/span/a";
const registerXpath =
  "/html/body/div[7]/div[2]/div/div/div/div/div/form/div[2]/div[2]/div[1]/div[2]/a";
const logoutXpath =
  "/html/body/div[3]/div[4]/div[2]/div/div/div/div[2]/div/aside/ul/li[6]/span/a";
const personalDataXpath =
  "/html/body/div[3]/div[4]/div[2]/div/div/div/div[2]/div/aside/ul/li[2]/span/a";
const changesPasswordXpath =
  "/html/body/div[3]/div[4]/div[2]/div/div/div/div[2]/div/aside/ul/li[3]/span/a";
const ordersXpath =
  "/html/body/div[3]/div[4]/div[2]/div/div/div/div[2]/div/aside/ul/li[4]/span/a";
const historyOrdersXpath =
  "/html/body/div[3]/div[4]/div[2]/div/div/div/div[1]/div/div/div[1]/a[1]";
const canselOrdersXpath =
  "/html/body/div[3]/div[4]/div[2]/div/div/div/div[1]/div/div/div[1]/a[2]";
const correntOrdersXpath =
  "/html/body/div[3]/div[4]/div[2]/div/div/div/div[1]/div/div/div[1]/a";
const favoriteProductsXpath =
  "/html/body/div[3]/div[4]/div[2]/div/div/div/div[2]/div/aside/ul/li[5]/span/a";

describe("Registration Form Test", () => {
  let driver;
  const user = getRandomUser();

  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  it("Registration", async () => {
    await driver.get("https://preprod.artgor.ru");

    await driver.findElement(By.className("header-cabinet")).click();

    const buttonUser = await driver.wait(
      until.elementLocated(By.xpath(registerXpath)),
      5000
    );
    await buttonUser.click();

    const currentRegisterUrl = await driver.getCurrentUrl();
    const currentRegisterUrlSplitted = currentRegisterUrl.split("/");
    assert.equal(
      "auth" === currentRegisterUrlSplitted[3] &&
        "registration" === currentRegisterUrlSplitted[4],
      true
    );

    const userName = await driver.wait(
      until.elementLocated(By.id("input_NAME"))
    );
    userName.sendKeys(user.name);

    await driver.findElement(By.id("input_EMAIL")).sendKeys(user.login);

    await driver
      .findElement(By.id("input_PERSONAL_PHONE"))
      .sendKeys(user.telephone);

    await driver.findElement(By.id("input_PASSWORD")).sendKeys(user.password);

    await driver
      .findElement(By.id("input_CONFIRM_PASSWORD"))
      .sendKeys(user.password);

    await driver.findElement(By.css("[type=submit]")).click();

    // Получить ожидаемый текст
    const expectedPopapText = "Вы успешно авторизовались";
    const popap = await driver.findElement(
      By.className("notice-surface__inner")
    );
    // expect(popapText).to.include(expectedText); - ожидаемый текст () включает (нужный текст)
    const actualPopapText = await popap.getText();
    assert.ok(await popap.isDisplayed());
    assert.ok(actualPopapText.includes(expectedPopapText), "wrong popap");
  });

  it("logout", async () => {
    await driver.get("https://preprod.artgor.ru/");

    await driver.findElement(By.className("header-cabinet")).click();

    const logout = await driver.wait(
      until.elementLocated(By.xpath(logoutXpath)),
      10000
    );
    logout.click();
  });

  it("auvtorization", async () => {
    await driver.get("https://preprod.artgor.ru");

    await driver.manage().deleteAllCookies();

    await driver.findElement(By.className("header-cabinet")).click();

    const newUserLogin = await driver.wait(
      until.elementLocated(By.id("USER_LOGIN_POPUP")),
      10000
    );
    newUserLogin.sendKeys(user.login);

    await driver
      .findElement(By.id("USER_PASSWORD_POPUP"))
      .sendKeys(user.password);

    await driver.findElement(By.css("[type=submit]")).click();

    const expectedPopapText = "Вы успешно авторизовались";
    const popap = await driver.wait(
      until.elementLocated(By.className("notice-surface__inner")),
      5000
    );
    const actualPopapText = await popap.getText();
    assert.ok(await popap.isDisplayed());
    assert.ok(actualPopapText.includes(expectedPopapText), "wrong popap");
  });

  it("change personal data", async () => {
    await driver.get("https://preprod.artgor.ru/");
    await driver.findElement(By.className("header-cabinet")).click();
    await driver.findElement(By.xpath(personalDataXpath)).click();

    assert.ok(await isMatchedPathName(driver, "/personal/private/"));

    const changesName = await driver.wait(
      until.elementLocated(By.id("NAME")),
      10000
    );
    changesName.sendKeys("zxc");

    const changesEmail = await driver.findElement(By.id("EMAIL"));
    changesEmail.clear();
    changesEmail.sendKeys(user.login);

    const changesTelephone = await driver.findElement(By.id("PERSONAL_PHONE"));
    changesTelephone.clear();
    changesTelephone.sendKeys("9155555555");

    await driver.findElement(By.name("save")).click();

    const expectedalertText = "Изменения сохранены";
    const alert = await driver.wait(
      until.elementLocated(By.className("alert alert-success")),
      5000
    );
    const actualAlertText = await alert.getText();
    assert.ok(await alert.isDisplayed());
    assert === (actualAlertText, expectedalertText, "wrong alert");
  });

  it("Changes password", async () => {
    await driver.findElement(By.xpath(changesPasswordXpath)).click();

    assert.ok(await isMatchedPathName(driver, "/personal/change-password/"));

    const changesPassword = await driver.wait(
      until.elementLocated(By.id("NEW_PASSWORD")),
      10000
    );
    changesPassword.sendKeys(user.password);
    await driver
      .findElement(By.id("NEW_PASSWORD_CONFIRM"))
      .sendKeys(user.password);
    await driver.sleep(1000);
    await driver.findElement(By.name("save")).click();

    const expectedalertText = "Изменения сохранены";
    const alert = await driver.wait(
      until.elementLocated(By.className("alert alert-success")),
      5000
    );
    const actualAlertText = await alert.getText();
    assert.ok(await alert.isDisplayed());
    assert === (actualAlertText, expectedalertText, "wrong alert");
  });

  it("History of orders", async () => {
    const orders = await driver.wait(
      until.elementLocated(By.xpath(ordersXpath)),
      10000
    );
    orders.click();
    const histiryOrders = await driver.wait(
      until.elementLocated(By.xpath(historyOrdersXpath)),
      5000
    );
    histiryOrders.click();

    await driver.sleep(500);

    const canselOrders = await driver.wait(
      until.elementLocated(By.xpath(canselOrdersXpath)),
      5000
    );
    canselOrders.click();
    assert.ok(await isMatchedPathName(driver, "/personal/orders/"));
    assert.ok(await hasQueryParam(driver, "filter_history"));
    const correntOrders = await driver.wait(
      until.elementLocated(By.xpath(correntOrdersXpath)),
      5000
    );
    correntOrders.click();
  });

  it("favorite products", async () => {
    const favoriteProduct = await driver.wait(
      until.elementLocated(By.xpath(favoriteProductsXpath))
    );
    favoriteProduct.click();

    await driver.sleep(500);
    assert.ok(await isMatchedPathName(driver, "/personal/favorite/"));
  });

  it("personal wrapper", async () => {
    await driver.get("https://preprod.artgor.ru/");
    await driver.findElement(By.className("header-cabinet")).click();

    const iconHistory = await driver.findElement(By.xpath(iconHistoryXpath));
    iconHistory.click();
    await driver.sleep(500);

    assert.ok(await isMatchedPathName(driver, "/personal/orders/"));
    assert.ok(await hasQueryParam(driver, "filter_history"));

    await driver.findElement(By.xpath(myCabinetXpath)).click();

    const iconOrder = await driver.findElement(By.xpath(iconOrderXpath));
    iconOrder.click();
    await driver.sleep(500);

    assert.ok(await isMatchedPathName(driver, "/personal/orders/"));
    await driver.findElement(By.xpath(myCabinetXpath)).click();

    const iconPersonalData = await driver.findElement(
      By.xpath(iconPersonalDataXpath)
    );
    iconPersonalData.click();
    await driver.sleep(500);
    assert.ok(await isMatchedPathName(driver, "/personal/private/"));
    await driver.findElement(By.xpath(myCabinetXpath)).click();
  });

  it("Dropdown menu LK", async () => {
    await driver.get("https://preprod.artgor.ru/");

    const dropdownButtonXPathList = Object.values(dropdownButtons);
    const urls = Object.keys(dropdownButtons);

    // for (let i = 0; i < array.length; i++) {
    //   const element = array[i];

    // }

    for (let i = 0; i < dropdownButtonXPathList.length; i++) {
      await hoverOverElement(
        driver,
        By.className("header-cabinet"),
        By.xpath(dropdownBodyXPath)
      );

      const buttonContainer = await driver.findElement(
        By.xpath(dropdownButtonXPathList[i])
      );

      await buttonContainer.click();

      await driver.sleep(200);

      const currentUrl = await driver.getCurrentUrl();

      assert.ok(currentUrl.includes(urls[i]));
    }
  });
});
