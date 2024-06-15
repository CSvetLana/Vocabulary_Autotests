import {expect} from "@playwright/test";

export class Login {
    
    constructor(page) {
        this.page = page;        
    };
    locators = {
        getEmailField: ()=> this.page.getByLabel('Email'),
        getPasswordField: ()=> this.page.getByLabel('Password'),
        getLoginButtons: ()=> this.page.getByRole('button', {name:'Log in'}),
        getErrorLoginMessage: ()=> this.page.locator('.mt-3'),
    };
    
    async goto(){
        await this.page.goto('/');
    };

    async login(email, password){
        await this.locators.getEmailField().fill(email);
        await this.locators.getPasswordField().fill(password);
        await this.locators.getLoginButtons().click();
    };

    async errorLogin(){
        await expect(this.locators.getErrorLoginMessage()).toContainText('These credentials do not match our records.');
    }
        
}