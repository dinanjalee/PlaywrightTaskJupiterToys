import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/HomePage';
import { ContactPage } from '../Pages/ContactPage';
import { ContactDetails } from '../test-data/ContactDetails';

test('Test Case 1 Validate mandory fields in Contact form', async ({page})=>{
    const home = new HomePage(page);
    const contact = new ContactPage(page);

    //Navigate from the home page go to contact page
    await home.loadingWeb();
    await home.navigateToContact();

    //Click submit button
    await contact.clickSubmit();
    
    //Verify error messages
    await contact.verifyMandatoryFieldErrorsVisible();

    //Populate mandatory fields
    await contact.enterValuesForMandatoryFields(ContactDetails.name,ContactDetails.email,ContactDetails.message);

    //Validate errors are gone
    await contact.verifyErrorMessagesNotVisible();

})

test('Test Case 2 Submit the Contact form and validate', async ({page})=>{
    const home = new HomePage(page);
    const contact = new ContactPage(page);

    //Navigate from the home page go to contact page
    await home.loadingWeb();
    await home.navigateToContact();

    //Populate mandatory fields
    await contact.enterValuesForMandatoryFields(ContactDetails.name,ContactDetails.email,ContactDetails.message);

    //Click submit button
    await contact.clickSubmit();

    //Validate successful submission message
    await contact.verifySuccessMessage();

})