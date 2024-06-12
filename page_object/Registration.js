import { expect } from "@playwright/test";
import {ERROR_EMAIL_REG, NEW_USER_NAME} from '../helpers/testData'

export class Registration {
    constructor(page) {
        this.page = page;
    };
    
    locators = {
        getNewAccount: ()=> this.page.getByRole('link', {name:"Don't have an account yet?"}),
        getNameField: ()=> this.page.locator('#name'),
        getEmailField: ()=> this.page.locator('#email'),
        getPasswordField: ()=> this.page.locator('#password'),
        getPasswordConfirmationField: ()=> this.page.locator('#password_confirmation'),
        getCheckBox: ()=> this.page.locator('#terms'),
        getRegisterButton: ()=> this.page.getByRole('button', {name:'Register'}),
        getErrorEmailMessage: ()=> this.page.locator('.mt-3'), //!заменить локатор!
        /* getIconUser: ()=> this.page.getByAltText(NEW_USER_NAME),
        getProfileUser: ()=> this.page.getByRole('link', {name:'Profile'}), */
    };

    async newAccountClick(){
        await this.locators.getNewAccount().click();
    };

    async newUserRegistration(name, email, password, password_confirmation){
        await this.locators.getNameField().fill(name);
        await this.locators.getEmailField().fill(email);
        await this.locators.getPasswordField().fill(password);
        await this.locators.getPasswordConfirmationField().fill(password_confirmation);
        await this.locators.getCheckBox().check();
        await this.locators.getRegisterButton().click();
    };

    async errorEmailMessage(){
        await expect(this.locators.getErrorEmailMessage()).toContainText(ERROR_EMAIL_REG);
    };

    /* async deleteUser(){
        await this.locators.getIconUser().click();
        await this.locators.getProfileUser().click();
    }; */
}