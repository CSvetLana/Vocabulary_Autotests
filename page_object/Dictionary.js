export class Dictionary {

    constructor(page) {
        this.page = page;
        this.getDictonaryLink = this.page.getByText('Dictionary');       
        this.parentDiv = this.page.locator('#trans-290');
        this.getButtonDelete = this.parentDiv.locator('#delete-entry');
        this.getCancelDelete = this.page.locator('#btn-no');
        this.getDeleteDelete = this.page.locator('#btn-yes');
        this.getEditButton = this.parentDiv.locator('#edit-entry');
        this.getSourceTextField = this.page.getByPlaceholder('Source text...', { exact:true });
        this.getButtonSave = this.page.getByRole('button', { name:'Save' });
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
    async sourceTextField(newtext){
        await this.getSourceTextField.fill(newtext);
    };
    async saveButton(){
        await this.getButtonSave.click();
    };
}