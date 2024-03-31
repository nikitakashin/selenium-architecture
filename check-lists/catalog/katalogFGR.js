import { Builder, By, until } from "selenium-webdriver";
import { asert } from "chai";

describe("katalog", () => {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  it("");
});
