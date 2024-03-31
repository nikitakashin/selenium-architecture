import { By, until } from "selenium-webdriver";
import { assert } from "chai";

import { registerXpath } from "../xpaths.js";
import { getRandomUser } from "../../../utils/common.js";
import { saveUser } from "../../../utils/auth.js";

export default {
  Registration: async (driver) => {
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

    const user = getRandomUser();
    saveUser(user);

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
  },
};
