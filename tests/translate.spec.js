import { test, expect } from "@playwright/test";
import { Login } from "../page_object/Login";
import { Translate } from "../page_object/Translate";
import { EMAIL_VALID, PASSWORD_VALID, SOURCE_TEXT_EN_RU, RESULT_TEXT_EN_RU, SOURCE_TEXT_DE_RU, RESULT_TEXT_DE_RU, 
  SOURCE_TEXT_EN_DE, RESULT_TEXT_EN_DE, SOURCE_TEXT_TR_EN, RESULT_TEXT_TR_EN } from "../helpers/testData"; 

test.describe("translate", async () => {
  let translatePage = Translate;

  test.beforeEach("Login", async ({page}) => {
    let loginPage = new Login(page);
    await loginPage.goto();
    await loginPage.login(EMAIL_VALID, PASSWORD_VALID);
  });

  test("Translate from English into Russian in automatic mode", async ({page}) => {   
    translatePage = new Translate(page, RESULT_TEXT_EN_RU);

    await translatePage.translateFunction("en", "ru", SOURCE_TEXT_EN_RU, "auto");
    await translatePage.textResult();
    await translatePage.textCheckFunction();
    await translatePage.textTranslationFunction();
    await translatePage.saveButtonClick();
    await translatePage.savedEntry();
  });

  test("Translate from German to Russian using Deepl translator", async ({page}) => {    
    translatePage = new Translate(page, RESULT_TEXT_DE_RU);

    await translatePage.translateFunction("de", "ru", SOURCE_TEXT_DE_RU, "deepl");
    await translatePage.textResult();
    await translatePage.textCheckFunction();
    await translatePage.textTranslationFunction();
    await translatePage.saveButtonClick();
    await translatePage.savedEntry();
  });

  test("Translate from English to German using Yandex translator", async ({page}) => {
    translatePage = new Translate(page, RESULT_TEXT_EN_DE);

    await translatePage.translateFunction("en", "de", SOURCE_TEXT_EN_DE, "yandex");
    await translatePage.textResult();
    await translatePage.textCheckFunction();
    await translatePage.textTranslationFunction();
    await translatePage.saveButtonClick();
    await translatePage.savedEntry();
  });

  test("Translate from Turkish to English using Deepl translator", async ({page}) => { 
    translatePage = new Translate(page, RESULT_TEXT_TR_EN);

    await translatePage.translateFunction("tr", "en", SOURCE_TEXT_TR_EN, "deepl");
    await translatePage.textResult();
    await translatePage.textCheckFunction();
    await translatePage.textTranslationFunction();
    await translatePage.saveButtonClick();
    await translatePage.savedEntry();
  });
});
