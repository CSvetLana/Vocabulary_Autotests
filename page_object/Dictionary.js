export class Dictionary {

    constructor(page) {
        this.page = page;
        this.getDictonaryLink = this.page.getByText('Dictionary');       
        this.parentDiv = this.page.locator('#trans-292');
        this.getButtonDelete = this.parentDiv.locator('#delete-entry');
        this.getCancelDelete = this.page.locator('#btn-no');
        this.getDeleteDelete = this.page.locator('#btn-yes');
        this.getEditButton = this.parentDiv.locator('#edit-entry');
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
    async deleteClick(){
        await this.getDeleteDelete.click();
    };
    async editClick(){
        await this.getEditButton.click();
    };
}