import { test, expect } from '@playwright/test';
import { Login } from '../page_object/Login';
import { EMAIL_VALID, PASSWORD_VALID } from '../helpers/testData';
import { Dictionary } from '../page_object/Dictionary';

test.describe ('dictionary', async () => {

    test.beforeEach('Login', async ({page}) => {
        let loginPage = new Login(page);
        await loginPage.goto();
        await loginPage.login(EMAIL_VALID, PASSWORD_VALID);
    });

    test ('Delete Text To Translate And Cancel', async ({page}) => {
        let dictionary = new Dictionary(page);
        await dictionary.dictionaryClick();
            let dictionaryLine = page.locator('.flex-col .basis-auto');
            let dictionaryLineArray = await dictionaryLine.all();
            let sumDictionaryLine1 = 0;
            for(let i=0; i < dictionaryLineArray.length; i++){
                sumDictionaryLine1 ++;
            };
        await dictionary.buttonDeleteClick();
        await dictionary.deleteCancel();
            let sumDictionaryLine2 = 0;
            for(let i=0; i < dictionaryLineArray.length; i++){
                sumDictionaryLine2 ++;
            };
        function comparisonNumberLines(sumDictionaryLine1, sumDictionaryLine2){
            if(sumDictionaryLine1===sumDictionaryLine2){
                return true;
            };
            return false;
        };
        console.log(comparisonNumberLines());
    });

   /*  test ('Delete Text To Translate', async ({page}) => {
        let dictionary = new Dictionary(page);
        await dictionary.dictionaryClick();       
        await dictionary.buttonDeleteClick();
        await dictionary.deleteClick();
    }); */
})