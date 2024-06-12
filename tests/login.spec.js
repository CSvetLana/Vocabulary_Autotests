import { test, expect } from "@playwright/test";
import { Login } from "../page_object/Login";
import { BASE_URL, LOGIN_END_POINT, EMAIL_VALID, PASSWORD_VALID } from "../helpers/testData";

test.describe("Login Tests", async () => {
  let loginPage = Login;

  test.beforeEach('Visit Vocabulary', async ({ page }) => {
    loginPage = new Login(page);
    await loginPage.goto();
  });

  test('Authorization With Valid Data', async ({ page }) => {
    loginPage = new Login(page);
    await loginPage.login(EMAIL_VALID, PASSWORD_VALID);

    await expect(page).toHaveURL(BASE_URL+LOGIN_END_POINT);
  });
  
});
