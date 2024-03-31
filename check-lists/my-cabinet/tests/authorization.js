import { By, until } from "selenium-webdriver";
import { assert } from "chai";

import { useUser } from "../../../utils/auth.js";

export default {
  authorization: async (driver) => {
    await driver.get("https://preprod.artgor.ru");

    await driver.manage().deleteAllCookies();

    await driver.findElement(By.className("header-cabinet")).click();

    const newUserLogin = await driver.wait(
      until.elementLocated(By.id("USER_LOGIN_POPUP")),
      10000
    );

    const user = await useUser();

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
  },
};
