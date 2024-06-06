import {test, expect} from '@playwright/test';
import { LoginPage } from '../page_object/LoginPage';

test('Authorization with valid data', async({page})=>{   
    let loginPage = new LoginPage(page);
   
    await loginPage.goto();
    await loginPage.login('user@gmail.com', '123456789');
    
    await expect(page).toHaveURL('https://voc.fcqdaqp.online/translate');
});