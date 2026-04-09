import { Page, Locator, expect } from '@playwright/test';
export class ContactPage{
    readonly page: Page;
    readonly txtForename: Locator;
    readonly txtSurename: Locator;
    readonly txtEmail: Locator;
    readonly txtTelephone: Locator;
    readonly txtMessage: Locator;
    readonly btnSubmit: Locator;
    readonly errForename: Locator;
    readonly errEmail: Locator;
    readonly errMessage: Locator;
    readonly msgSuccess: Locator;

    constructor(page:Page){
       this.page = page;
       this.txtForename = page.locator('#forename');
       this.txtSurename = page.locator('#surname');
       this.txtEmail = page.locator('#email');
       this.txtTelephone = page.locator('#telephone');
       this.txtMessage = page.locator('#message');
       this.btnSubmit = page.locator('.btn-contact.btn.btn-primary');
       this.errForename = page.locator('#forename-err');
       this.errEmail = page.locator('#email-err');
       this.errMessage = page.locator('#message-err');
       this.msgSuccess = page.locator('.alert.alert-success');
    }

    //Click on Submit button of the contact form
    async clickSubmit() {
        await this.btnSubmit.click();
    }

    //Enter values for the mandatory fields
    async enterValuesForMandatoryFields(name: string, email: string, message: string) {
        await this.txtForename.fill(name);
        await this.txtEmail.fill(email);
        await this.txtMessage.fill(message);
    }

    //Verify mandatory field validation message are appearing in the form
    async verifyMandatoryFieldErrorsVisible() {
        await expect(this.errForename).toBeVisible();
        await expect(this.errEmail).toBeVisible();
        await expect(this.errMessage).toBeVisible();
    }

    //Verify mandatory field validation messages disappearing once enter the values to the text fields
    async verifyErrorMessagesNotVisible() {
        await expect(this.errForename).toBeHidden();
        await expect(this.errEmail).toBeHidden();
        await expect(this.errMessage).toBeHidden();
    }

    //Verify the Success Messae after submitting the form
    async verifySuccessMessage() {
        await expect(this.msgSuccess).toBeVisible();
    }
}