import { By, until } from "selenium-webdriver";
import parseUrl from "parse-url";

export const getRandomUser = () => {
  const name = "testqwerty";
  const userEmail = "user_qwerty" + Math.round(Math.random() * 8999) + 1000;
  const password = "Xyzxyz123";
  const telephone = "89183344555";

  return {
    name: name,
    login: userEmail + "@gmail.com",
    password: password,
    telephone: telephone,
  };
};

export const dropdownButtons = {
  "/personal/index.php":
    "/html/body/div[3]/div[2]/div[1]/header/div/div[2]/div/div/div[4]/div/div[1]/div/div/div/div[1]/a",
  "/personal/private/":
    "/html/body/div[3]/div[2]/div[1]/header/div/div[2]/div/div/div[4]/div/div[1]/div/div/div/div[2]/a",
  "/personal/change-password/":
    "/html/body/div[3]/div[2]/div[1]/header/div/div[2]/div/div/div[4]/div/div[1]/div/div/div/div[3]/a",
  "/personal/orders/":
    "/html/body/div[3]/div[2]/div[1]/header/div/div[2]/div/div/div[4]/div/div[1]/div/div/div/div[4]/a",
  "/personal/favorite/":
    "/html/body/div[3]/div[2]/div[1]/header/div/div[2]/div/div/div[4]/div/div[1]/div/div/div/div[5]/a",
  "": "/html/body/div[3]/div[2]/div[1]/header/div/div[2]/div/div/div[4]/div/div[1]/div/div/div/div[6]/a",
};

export async function hoverOverElement(
  driver,
  dropdownLocator,
  dropdownMenuLocator
) {
  const dropdown = await driver.findElement(dropdownLocator);
  const actions = await driver.actions({ async: true });
  await actions.move({ origin: dropdown }).perform();
  await driver.wait(until.elementLocated(dropdownMenuLocator), 5000);
}

/**
 * The function `getPathName` extracts the pathname from the current URL using a driver in JavaScript.
 * @param driver - The `driver` parameter is typically an instance of a web driver, such as Selenium
 * WebDriver, used for automating web browsers. It allows you to interact with the browser, navigate to
 * different pages, retrieve information, and perform various actions on web elements. In this case,
 * the `getPathName`
 * @returns The function `getPathName` is returning the pathname part of the current URL obtained from
 * the driver.
 */
export async function getPathName(driver) {
  const rawUrl = await driver.getCurrentUrl();

  const urlParsed = parseUrl(rawUrl);

  return urlParsed.pathname;
}

/**
 * The function `getQueryParams` retrieves and returns the query parameters from the current URL using
 * a WebDriver instance.
 * @param driver - The `driver` parameter is typically an object or instance that represents a web
 * driver in a testing or automation framework. It is used to interact with a web browser, navigate to
 * different pages, retrieve information from the page, and perform various actions on the web
 * elements.
 * @returns The function `getQueryParams` returns the query parameters from the current URL of the
 * driver after parsing the URL.
 */
export async function getQueryParams(driver) {
  const rawUrl = await driver.getCurrentUrl();

  const urlParsed = parseUrl(rawUrl);

  return urlParsed.query;
}

/**
 * The function `isMatchedPathName` compares the actual path name obtained from a driver with a
 * provided path name and returns a boolean indicating whether they match.
 * @param driver - The `driver` parameter is typically used in web automation testing to interact with
 * a web browser. It allows you to control the browser, navigate to different pages, interact with
 * elements on the page, and retrieve information from the page.
 * @param pathName - The `pathName` parameter is a string representing the expected path name that you
 * want to compare with the actual path name obtained from the driver.
 * @returns The function `isMatchedPathName` is returning a boolean value indicating whether the
 * `factPathName` obtained from the driver is equal to the provided `pathName`.
 */
export async function isMatchedPathName(driver, pathName) {
  const factPathName = await getPathName(driver);
  console.log("factPathName", factPathName);
  console.log("pathName", pathName);
  return factPathName === pathName;
}

/**
 * The function `hasQueryParam` checks if a specific query parameter exists in the query parameters of
 * a given driver.
 * @param driver - The `driver` parameter is typically used in web development to refer to the object
 * or module that allows a program to interact with a web browser. It can be used to control the
 * browser, navigate to different pages, execute JavaScript code, and retrieve information from the web
 * page.
 * @param queryParam - The `queryParam` is the parameter that you want to check for in the query
 * parameters of the URL. It is the specific query parameter that you are looking to see if it exists
 * in the URL.
 * @returns a boolean value indicating whether the specified `queryParam` is present in the query
 * parameters obtained from the `driver`.
 */
export async function hasQueryParam(driver, queryParam) {
  const factQueryParams = await getQueryParams(driver);
  console.log("factQueryParams", factQueryParams);
  console.log("queryParam", queryParam);
  return Object.keys(factQueryParams).includes(queryParam);
}
