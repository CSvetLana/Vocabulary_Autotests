import { test, expect } from '@playwright/test';
import { Login } from '../page_object/Login';
import { EMAIL_VALID, PASSWORD_VALID } from '../helpers/testData';
import { Dictionary } from '../page_object/Dictionary';

test.describe('dictionary', async () => {
  test.beforeEach('Login', async ({ page }) => {
    let loginPage = new Login(page);
    await loginPage.goto();
    await loginPage.login(EMAIL_VALID, PASSWORD_VALID);
  });

  test('Delete Text To Translate And Cancel', async ({ page }) => {
    let dictionary = new Dictionary(page);
    await dictionary.dictionaryClick();

    let dictionaryLine = page.locator('.flex-col .basis-auto');
    let dictionaryLineArray = await dictionaryLine.all();
    let sumDictionaryLine1 = dictionaryLineArray.length;
    
    await dictionary.buttonDeleteClick();
    await dictionary.deleteCancel();    

    let sumDictionaryLine2 = 0;
    for (let i = 0; i < dictionaryLineArray.length; i++) {
      sumDictionaryLine2++;
    };
    let compar = false;
    if (sumDictionaryLine1 === sumDictionaryLine2) {
      compar = true;
    };
    console.log(compar);
  });

  test('Delete Text To Translate', async ({ page }) => {
    let dictionary = new Dictionary(page);
    await dictionary.dictionaryClick();

    let dictionaryLine = page.locator('.flex-col .basis-auto');
    let dictionaryLineArray = await dictionaryLine.all();
    let sumDictionaryLine1 = dictionaryLineArray.length;
    await dictionary.buttonDeleteClick();
    await dictionary.deleteClick();
    await page.waitForFunction((initialLength) => {
      let newDictionaryLineArray = document.querySelectorAll('.flex-col .basis-auto');
      return newDictionaryLineArray.length < initialLength;
    }, sumDictionaryLine1);

    let newDictionaryLineArray = await dictionaryLine.all();
    let sumDictionaryLine2 = 0;
    for (let i = 0; i < newDictionaryLineArray.length; i++) {
      sumDictionaryLine2++;
    };
    let compar = false;
    if (sumDictionaryLine1 - 1 === sumDictionaryLine2) {
      compar = true;
    };
    console.log(compar);
  });
  

  test('Eddit Text To Translate', async ({ page }) => {
    let dictionary = new Dictionary(page);
    await dictionary.dictionaryClick();
    let dictionaryLine = page.locator('.flex-col .basis-auto');
    let dictionaryLineArray = await dictionaryLine.all();
    let sumDictionaryLine1 = dictionaryLineArray.length;
    console.log(sumDictionaryLine1);
    await dictionary.editClick();
    await dictionary.sourceTextField('brot123');
    await dictionary.saveButton();
    await page.reload();
    let newDictionaryLineArray = await dictionaryLine.all();
    let sumDictionaryLine2 = 0;
    for (let i = 0; i < newDictionaryLineArray.length; i++) {
      sumDictionaryLine2++;
    };
    console.log(sumDictionaryLine2);
    let compar = false;
    if (sumDictionaryLine1 + 1 === sumDictionaryLine2) {
      compar = true;
    };
    console.log(compar);
  });
});
