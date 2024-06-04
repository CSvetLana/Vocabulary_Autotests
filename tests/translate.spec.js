import {test, expect} from '@playwright/test';

test.describe ('translate', async()=>{

    test.beforeEach ('Login', async({page})=>{
        await page.goto('/');
        await page.getByLabel('Email').fill('user@gmail.com');
        await page.getByLabel('Password').fill('123456789');
        await page.getByRole('button', {name:'Log in'}).click();
    });

    test('Translate from English into Russian in automatic mode', async({page})=>{
        await page.locator('#sourceLang').selectOption('en');
        await page.locator('#targetLang').selectOption('ru');
        await page.getByPlaceholder('Text...', {exact:true}).fill('User');
        await page.locator('#service').selectOption('auto');
        await page.locator('#translate-button').click();

        const textResult1 = page.locator('#t-0');
        const textResult2 = page.locator('#t-1');
       
        await expect(textResult1).toHaveValue('пользователь (м)'); 
        await expect(textResult2).toHaveValue('потребитель (м)');
        
        await textResult1.check();
        await textResult2.check();
        
        const textTranslationEn = 'пользователь (м); потребитель (м)'

        await expect(page.getByPlaceholder('Translated text...', {exact:true})).toHaveValue(textTranslationEn);

        await page.getByRole('button', {name:'Save'}).click();

        await expect(page.getByRole('alert')).toHaveText('Entry saved!');
    });        

    test('Translate from German to Russian using Deepl translator', async({page})=>{
        await page.locator('#sourceLang').selectOption('de');
        await page.locator('#targetLang').selectOption('ru');
        await page.getByPlaceholder('Text...', {exact:true}).fill('Brot');
        await page.locator('#service').selectOption('deepl');
        await page.locator('#translate-button').click();

        const textResult1 = page.locator('#t-0');
        
        await expect(textResult1).toHaveValue('хлеб'); 
        
        await textResult1.check();
        
        const textTranslationDe = 'хлеб'

        await expect(page.getByPlaceholder('Translated text...', {exact:true})).toHaveValue(textTranslationDe);

        await page.getByRole('button', {name:'Save'}).click();

        await expect(page.getByRole('alert')).toHaveText('Entry saved!');
    });

    test('Translate from English to German using Yandex translator', async({page})=>{
        await page.locator('#sourceLang').selectOption('en');
        await page.locator('#targetLang').selectOption('de');
        await page.getByPlaceholder('Text...', {exact:true}).fill('User');
        await page.locator('#service').selectOption('yandex');
        await page.locator('#translate-button').click();

        const textResult1 = page.locator('#t-0');
              
        await expect(textResult1).toHaveValue('der Benutzer (m)'); 
        
        await textResult1.check();
                
        const textTranslationEnDe  = 'der Benutzer (m)'

        await expect(page.getByPlaceholder('Translated text...', {exact:true})).toHaveValue(textTranslationEnDe);

        await page.getByRole('button', {name:'Save'}).click();

        await expect(page.getByRole('alert')).toHaveText('Entry saved!');
    });        

    test('Translate from Turkish to English using Deepl translator', async({page})=>{
        await page.locator('#sourceLang').selectOption('tr');
        await page.locator('#targetLang').selectOption('en');
        await page.getByPlaceholder('Text...', {exact:true}).fill('Ekmek');
        await page.locator('#service').selectOption('deepl');
        await page.locator('#translate-button').click();

        const textResult1 = page.locator('#t-0');
              
        await expect(textResult1).toHaveValue('bread'); 
        
        await textResult1.check();
                
        const textTranslationTrEn  = 'bread'

        await expect(page.getByPlaceholder('Translated text...', {exact:true})).toHaveValue(textTranslationTrEn);

        await page.getByRole('button', {name:'Save'}).click();

        await expect(page.getByRole('alert')).toHaveText('Entry saved!');
    });        
})