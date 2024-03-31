// файл для авторизованных пользователей
import { getRandomUser } from "./common.js";
const fs = require("node:fs");

const USER_FILE_PATH = "../user.txt";

export function saveUser(user) {
  const content = JSON.stringify(user);

  fs.writeFile(USER_FILE_PATH, content, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("file written successfully");
    }
  });
}

export function useUser() {
  fs.readFile(USER_FILE_PATH, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    return JSON.parse(data);
  });
}

export async function useLogin(driver, _user = null) {
  let user;

  if (_user) {
    user = _user;
  } else {
    user = await useUser();
  }
}

export async function useLogout(driver) {}
