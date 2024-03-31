import { Builder, By, until } from "selenium-webdriver";

//headless mode

// import { Options } from 'selenium-webdriver/chrome.js';

const lang = "ru";
const buttonAvatarXPath = "/html/body/app-root/app-layout/div/nav/div/div[2]";

const getRandomUser = () => {
  const username = "user_1" + Math.round(Math.random() * 8999) + 1000;
  const password = "Xyzxyz123";

  return {
    login: username + "@gmail.com",
    password: password,
  };
};

// принять
async function agreeTerms() {
  let agreeButton;

  try {
    agreeButton = await this.driver.wait(
      until.elementIsVisible(
        this.driver.findElement(By.css(`[data-cy="agree"]`))
      ),
      10000
    );

    await agreeButton.click();
  } catch (err) {}
}

describe("Registration Form Test", () => {
  let driver;
  const user = getRandomUser();

  before(async () => {
    driver = await new Builder()
      .forBrowser("chrome")
      // .setChromeOptions(new Options().addArguments('--headless'))
      .build();
  });

  it("Registration", async () => {
    await driver.get(`https://pornworks.ai/${lang}/`);

    await agreeTerms.call({ driver });

    await driver.navigate().to(`https://pornworks.ai/${lang}/generate`);

    await driver.findElement(By.css('[data-cy="login"]')).click();

    await driver.findElement(By.css('[data-cy="email"]')).sendKeys(user.login);

    await driver
      .findElement(By.css('[formcontrolname="sendPasswordToEmail"]'))
      .click();

    await driver
      .findElement(By.css('[data-cy="password"]'))
      .sendKeys(user.password);

    await driver.findElement(By.css('[data-cy="button-register"]')).click();

    const buttonAvatar = await driver.wait(
      until.elementLocated(By.xpath(buttonAvatarXPath)),
      5000
    );

    buttonAvatar.click();

    const userMenu = await driver.wait(
      until.elementLocated(By.className("user-menu")),
      5000
    );

    await userMenu.findElement(By.css('[data-cy="button-logout"]')).click();
  });

  it("Authorization + delete", async () => {
    await driver.navigate().to(`https://pornworks.ai/${lang}/generate`);

    // await agreeTerms.call({ driver });
    // await driver.navigate().to(`https://pornworks.ai/${lang}/generate`);

    await driver.findElement(By.css('[data-cy="login"]')).click();

    const authFormTabs = await driver.findElement(By.css("app-tabs"));

    await authFormTabs.findElement(By.css('[data-cy="login"]')).click();

    await driver
      .findElement(By.css('[data-cy="user-name"]'))
      .sendKeys(user.login);

    await driver
      .findElement(By.css('[data-cy="password"]'))
      .sendKeys(user.password);

    await driver.findElement(By.css('[data-cy="login-button"]')).click();
    //delet accaunt
    const buttonAvatar = await driver.wait(
      until.elementLocated(By.xpath(buttonAvatarXPath)),
      10000
    );

    buttonAvatar.click();
    // const headerMenu = await driver.findElement(By.css('[data-cy="top-menu"]'));
    // const LK = await headerMenu.findElement(By.css('[data-cy="me"]'));
    // await LK.click();
    // переход на стр для удаления аккаунта

    const buttonProfile = await driver.wait(
      until.elementLocated(By.partialLinkText("Мой профиль")),
      5000
    );

    buttonProfile.click();

    const buttonDelete = await driver.wait(
      until.elementLocated(By.partialLinkText("Удалить аккаунт")),
      5000
    );

    buttonDelete.click();

    const inputEmail = await driver.wait(
      until.elementLocated(By.css('[formcontrolname="email"]')),
      5000
    );

    inputEmail.sendKeys(user.login);

    const buttonSubmit = await driver.wait(
      until.elementLocated(By.css('[type="submit"]')),
      5000
    );

    buttonSubmit.click();
  });
});
