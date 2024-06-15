import { expect} from "@playwright/test";
import { ENTRY_SAVED } from "../helpers/testData";

export class Translate {
    constructor(page, expectedResultsVar){
        this.page = page;        
        this.expectedResults = expectedResultsVar;
        this.resultLocators = [];
            for (let index = 0; index < this.expectedResults.length; index++) {
                this.resultLocators[index] = page.locator('#t-' + index);            
            }        
    };

    locators = {
        getInputLanguage: ()=> this.page.locator('#sourceLang'),
        getResutLanguage: ()=> this.page.locator('#targetLang'),
        getEntryField:()=> this.page.getByPlaceholder('Text...', { exact:true }),
        getDictionarySelection:()=> this.page.locator('#service'),
        getTranslateButton:()=> this.page.locator('#translate-button'),
        getTextTranslationField:()=> this.page.getByPlaceholder('Translated text...', { exact:true }),
        getSaveButton:()=> this.page.getByRole('button', { name:'Save' }),
        getSavedEntryField:()=> this.page.getByRole('alert'),
    };

    async translateFunction(languageImput, languageResult, textEntry, dictionary){
        await this.locators.getInputLanguage().selectOption(languageImput);
        await this.locators.getResutLanguage().selectOption(languageResult);
        await this.locators.getEntryField().fill(textEntry);
        await this.locators.getDictionarySelection().selectOption(dictionary);
        await this.locators.getTranslateButton().click();
    };
    async textCheckFunction(){
        for (let index = 0; index < this.expectedResults.length; index++) {
            await this.resultLocators[index].check();            
        }        
    };
    async saveButtonClick(){
        await this.locators.getSaveButton().click();
    };    

    async textResult(){
        for (let index = 0; index < this.expectedResults.length; index++) {
            await expect(this.resultLocators[index]).toHaveValue(this.expectedResults[index]);            
        }        
    };
    async textTranslationFunction(){
        await expect(this.locators.getTextTranslationField()).toHaveValue(this.expectedResults.join('; '));
    };
    async savedEntry(){
        await expect(this.locators.getSavedEntryField()).toHaveText(ENTRY_SAVED);
    };    
    
}