import {test, expect} from '@playwright/test';
import { Login } from '../page_object/Login';
import { Registration } from '../page_object/Registration';
import { NEW_USER_NAME, NEW_USER_EMAIL, NEW_USER_PASSWORD,NEW_USER_PASSWORD_TOO} from '../helpers/testData'

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
    });

    test('Registering An Existing User', async({page})=>{
        let newRegistration = new Registration(page);
        await newRegistration.newAccountClick();
        await newRegistration.newUserRegistration(NEW_USER_NAME, 
            NEW_USER_EMAIL, NEW_USER_PASSWORD, NEW_USER_PASSWORD_TOO);
        await newRegistration.errorEmailMessage();
    }); 

    test('Login New User', async({page})=>{
        let loginPage = new Login(page);
        await loginPage.login(NEW_USER_EMAIL, NEW_USER_PASSWORD);
    });

    /* test('Delete User', async({page})=>{
        let newRegistration = new Registration(page);
        await newRegistration.deleteUser();
        await expect(page).toHaveURL('https://voc.fcqdaqp.online/user/profile');
    }) */
})