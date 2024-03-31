// файл для авторизованных пользователей
import { getRandomUser } from "./common.js";
import { promises as fs } from "fs";

const USER_FILE_PATH = "user.txt";

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

export async function useUser() {
  let userData = null;

  const data = await fs.readFile(USER_FILE_PATH);
  userData = JSON.parse(Buffer.from(data));

  return userData;
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
