import { expect } from "@playwright/test";
import {ERROR_EMAIL_REG, NEW_USER_NAME, NEW_USER_PASSWORD} from '../helpers/testData'

export class Registration {
    constructor(page) {
        this.page = page;
    };
    
    locators = {
        getNewAccount: ()=> this.page.getByRole('link', { name:"Don't have an account yet?" }),
        getNameField: ()=> this.page.locator('#name'),
        getEmailField: ()=> this.page.locator('#email'),
        getPasswordField: ()=> this.page.locator('#password'),
        getPasswordConfirmationField: ()=> this.page.locator('#password_confirmation'),
        getCheckBox: ()=> this.page.locator('#terms'),
        getRegisterButton: ()=> this.page.getByRole('button', {name:'Register'}),
        getErrorEmailMessage: ()=> this.page.locator('.mb-4 .font-medium'),        
        getIconUser: ()=> this.page.getByRole('button', { name: NEW_USER_NAME }),
        getProfileUser: ()=> this.page.getByRole('link', { name: 'Profile' }),
        getDeleteButton: ()=> this.page.getByRole('button', { name: 'Delete Account'}).first(),
        getPasswordForDelete: ()=> this.page.getByPlaceholder('Password', { exact:true }).nth(2),
        getCancelButton: ()=> this.page.getByRole('button', { name: 'Cancel'}),
        getDeleteAccountButton: ()=> this.page.getByRole('button', { name: 'Delete Account'}).nth(1),
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

    async deleteUser(){
        await this.locators.getIconUser().click();
        await this.locators.getProfileUser().click();
        await this.locators.getDeleteButton().click();
        await this.locators.getPasswordForDelete().fill(NEW_USER_PASSWORD);
    };

    async cancelButtonClick(){
        await this.locators.getCancelButton().click();
    };

    async deleteAccountClick(){
        await this.locators.getDeleteAccountButton().click();
    }
}