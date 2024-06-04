import {test, expect} from '@playwright/test';

test('Authorization with valid data', async({page})=>{
    await page.goto('/');
    await page.getByLabel('Email').fill('user@gmail.com');
    await page.getByLabel('Password').fill('123456789');
    await page.getByRole('button', {name:'Log in'}).click();

    await expect(page).toHaveURL('https://voc.fcqdaqp.online/translate');
});