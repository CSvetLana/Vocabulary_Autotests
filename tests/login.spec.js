import { test, expect } from "@playwright/test";
import { Login } from "../page_object/Login";
import { BASE_URL, TRANSLATE_END_POINT, EMAIL_VALID, PASSWORD_VALID, NEW_USER_EMAIL, 
  NEW_USER_PASSWORD,LOGIN_END_POINT, PASSWORD_INCORRECT, EMAIL_INCORRECT } from "../helpers/testData";

test.describe('Login Tests', async () => {
  let loginPage = Login;

  test.beforeEach('Visit Vocabulary', async ({ page }) => {
    loginPage = new Login(page);
    await loginPage.goto();
  });

  test('Authorization With Valid Data', async ({ page }) => {
    loginPage = new Login(page);
    await loginPage.login(EMAIL_VALID, PASSWORD_VALID);

    await expect(page).toHaveURL(BASE_URL+TRANSLATE_END_POINT);
  });

  test('Authorization Of An Inactive User', async ({ page }) => {
    loginPage = new Login(page);
    await loginPage.login(NEW_USER_EMAIL, NEW_USER_PASSWORD);
    await loginPage.errorLogin();

    await expect(page).toHaveURL(BASE_URL+LOGIN_END_POINT);
  });

  test('Authorization With Correct Email and Incorrect Password', async ({ page }) => {
    loginPage = new Login(page);
    await loginPage.login(EMAIL_VALID, PASSWORD_INCORRECT);
    await loginPage.errorLogin();

    await expect(page).toHaveURL(BASE_URL+LOGIN_END_POINT);
  });

  test('Authorization With Incorrect Email and Correct Password', async ({ page }) => {
    loginPage = new Login(page);
    await loginPage.login(EMAIL_INCORRECT, PASSWORD_VALID);
    await loginPage.errorLogin();

    await expect(page).toHaveURL(BASE_URL+LOGIN_END_POINT);
  });
  
});
