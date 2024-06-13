import {test, expect} from '@playwright/test';
import { Login } from '../page_object/Login';
import { Registration } from '../page_object/Registration';
import { BASE_URL, LOGIN_END_POINT, NEW_USER_NAME, NEW_USER_EMAIL, 
    NEW_USER_PASSWORD,NEW_USER_PASSWORD_TOO, REGISTER_END_POINT, USER_PROFILE_END_POINT} from '../helpers/testData'
import { loadEnvFile } from 'process';

test.describe('User Registration', async()=>{

    test.beforeEach('Visit', async({page})=>{
        let loginPage = new Login(page);
        await loginPage.goto();
    })

    test('User Registration Whit Valid Data', async({page})=>{
        let newRegistration = new Registration(page);
        await newRegistration.newAccountClick();
        await newRegistration.newUserRegistration(NEW_USER_NAME, 
            NEW_USER_EMAIL, NEW_USER_PASSWORD, NEW_USER_PASSWORD_TOO);

        await expect(page).toHaveURL(BASE_URL+LOGIN_END_POINT);
        await expect(page.locator('.flex .h-8')).toBeVisible(NEW_USER_NAME);
    });

    test('Registering An Existing User', async({page})=>{
        let newRegistration = new Registration(page);
        await newRegistration.newAccountClick();
        await newRegistration.newUserRegistration(NEW_USER_NAME, 
            NEW_USER_EMAIL, NEW_USER_PASSWORD, NEW_USER_PASSWORD_TOO);
        await newRegistration.errorEmailMessage();

        await expect(page).toHaveURL(BASE_URL+REGISTER_END_POINT);
    }); 
   
    test('Delete User', async({page})=>{
        let newRegistration = new Registration(page);
        let loginPage = new Login(page);
        await loginPage.login(NEW_USER_EMAIL, NEW_USER_PASSWORD);
        await newRegistration.deleteUser();
        await expect(page).toHaveURL(BASE_URL+USER_PROFILE_END_POINT);
    });
})