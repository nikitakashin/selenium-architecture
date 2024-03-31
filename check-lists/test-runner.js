import { Builder, By, until } from "selenium-webdriver";

import authDescribe from "./my-cabinet/describe.js";

const describes = {
  ...authDescribe,
};

for (let describeName in describes) {
  describe(describeName, async () => {
    let driver;

    before(async () => {
      driver = await new Builder().forBrowser("chrome").build();
    });

    for (let itName in describes[describeName]) {
      it(itName, async () => {
        await describes[describeName][itName](driver);
      });
    }
  });
}

// describes[describeName]
