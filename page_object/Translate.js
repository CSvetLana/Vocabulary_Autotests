import { expect} from "@playwright/test";

export class Translate {
    constructor(page, expectedResultsVar){
        this.page = page;
        this.inputLanguage = page.locator('#sourceLang');
        this.resutLanguage = page.locator('#targetLang');
        this.entryField = page.getByPlaceholder('Text...', {exact:true});
        this.dictionarySelection = page.locator('#service');
        this.translateButton = page.locator('#translate-button');
        this.expectedResults = expectedResultsVar;
        this.resultLocators = [];
            for (let index = 0; index < this.expectedResults.length; index++) {
                this.resultLocators[index] = page.locator('#t-' + index);            
            }   
        
        this.textTranslationField = page.getByPlaceholder('Translated text...', {exact:true});
        this.textTranslation = this.expectedResults.join('; ');
        this.saveButton = page.getByRole('button', {name:'Save'});
        this.savedEntryField = page.getByRole('alert');
    };

    async translateFunction(languageImput, languageResult, textEntry, dictionary){
        await this.inputLanguage.selectOption(languageImput);
        await this.resutLanguage.selectOption(languageResult);
        await this.entryField.fill(textEntry);
        await this.dictionarySelection.selectOption(dictionary);
        await this.translateButton.click();
    };
    async textCheckFunction(){
        for (let index = 0; index < this.expectedResults.length; index++) {
            await this.resultLocators[index].check();            
        }        
    };
    async saveButtonClick(){
        await this.saveButton.click();
    };    

    async textResult(){
        for (let index = 0; index < this.expectedResults.length; index++) {
            await expect(this.resultLocators[index]).toHaveValue(this.expectedResults[index]);            
        }        
    };
    async textTranslationFunction(){
        await expect(this.textTranslationField).toHaveValue(this.textTranslation);
    };
    async savedEntry(){
        await expect(this.savedEntryField).toHaveText('Entry saved!');
    }
    
    
}