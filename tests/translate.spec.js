import {test, expect} from '@playwright/test';
import { LoginPage } from '../page_object/LoginPage';
import { Translate } from '../page_object/Translate';

test.describe ('translate', async()=>{
    let translatePage = Translate;
    
    test.beforeEach ('Login', async({page})=>{
        let loginPage = new LoginPage(page);        
        await loginPage.goto();
        await loginPage.login('user@gmail.com', '123456789');
    });

    test('Translate from English into Russian in automatic mode', async({page})=>{  
        let expectedResultsVar = ['пользователь (м)', 'потребитель (м)'];   
        translatePage = new Translate(page, expectedResultsVar);

        await translatePage.translateFunction('en', 'ru', 'User', 'auto');              
        await translatePage.textResult();        
        await translatePage.textCheckFunction();
        await translatePage.textTranslationFunction();
        await translatePage.saveButtonClick();           
        await translatePage.savedEntry();
    });        

    test('Translate from German to Russian using Deepl translator', async({page})=>{     
        let expectedResults = ['хлеб'];   
        translatePage = new Translate(page, expectedResults);
   
        await translatePage.translateFunction('de', 'ru', 'Brot', 'deepl');
        await translatePage.textResult();        
        await translatePage.textCheckFunction();
        await translatePage.textTranslationFunction();
        await translatePage.saveButtonClick();           
        await translatePage.savedEntry();
    });

    test('Translate from English to German using Yandex translator', async({page})=>{ 
        let expectedResults = ['der Benutzer (m)'];   
        translatePage = new Translate(page, expectedResults);   

        await translatePage.translateFunction('en', 'de', 'User', 'yandex');        
        await translatePage.textResult();        
        await translatePage.textCheckFunction();
        await translatePage.textTranslationFunction();
        await translatePage.saveButtonClick();           
        await translatePage.savedEntry();
    });        

    test('Translate from Turkish to English using Deepl translator', async({page})=>{  
        let expectedResults = ['bread'];   
        translatePage = new Translate(page, expectedResults);   

        await translatePage.translateFunction('tr', 'en', 'Ekmek', 'deepl');
        await translatePage.textResult();        
        await translatePage.textCheckFunction();
        await translatePage.textTranslationFunction();
        await translatePage.saveButtonClick();           
        await translatePage.savedEntry();
    });        
})