import { By, until } from "selenium-webdriver";

import { logoutXpath } from "../xpaths.js";

export default {
  logout: async (driver) => {
    await driver.get("https://preprod.artgor.ru/");

    await driver.findElement(By.className("header-cabinet")).click();

    const logout = await driver.wait(
      until.elementLocated(By.xpath(logoutXpath)),
      10000
    );
    logout.click();
  },
};
