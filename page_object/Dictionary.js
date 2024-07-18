import { expect } from "@playwright/test";
import { TEXT_FOR_DELETE } from '../helpers/testData';
export class Dictionary {

    constructor(page) {
        this.page = page;
        this.getDictonaryLink = this.page.getByText('Dictionary');  
        this.text = this.page.getByText(TEXT_FOR_DELETE);
        this.parentDiv = this.page.locator('.flex-col .basis-auto').filter({ has: this.text });
        this.getButtonDelete = this.parentDiv.locator('#delete-entry');
        this.getCancelDelete = this.page.getByRole('button', { name:'No' });
        //this.getDeleteDelete = this.page.getByRole('button', { name:'Yes' });
    };

    async dictionaryClick(){
        await this.getDictonaryLink.first().click();
    };
    async buttonDeleteClick(){
        await this.getButtonDelete.click();        
    };
    async deleteCancel(){
        await this.getCancelDelete.click();
    };

    /* async deleteClick(){
        await this.getDeleteDelete.click();
    } */
    /* async notDelete(){
        await expect(this.parentDiv).toHaveText('brot')
    }; */
}