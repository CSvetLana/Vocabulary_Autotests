import { expect} from "@playwright/test";

export class LoginPage {
    
    constructor(page) {
        this.page = page;
        this.emailField = page.getByLabel('Email');
        this.passwordField = page.getByLabel('Password');
        this.loginButton = page.getByRole('button', {name:'Log in'});
    };

    async goto(){
        await this.page.goto('/');
    };

    async login(email, password){
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    };
}