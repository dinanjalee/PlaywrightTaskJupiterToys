import { Page, Locator, expect } from '@playwright/test';
export class HomePage{
    readonly page: Page;
    readonly lblLogo: Locator;
    readonly tabContact: Locator;
    readonly tabShop: Locator;

    constructor(page:Page){
       this.page = page;
       this.lblLogo = page.locator('.brand');
       this.tabContact = page.locator('a[href="#/contact"]');
       this.tabShop = page.locator('//*[@id="nav-shop"]/a');
    }

    // Accessing the web URL of Jupiter Toys
    async loadingWeb() {
        await this.page.goto('/');
        await expect(this.lblLogo).toBeVisible();
    }

    // Navigate to the Contact page from Home Page
    async navigateToContact() {
        await this.tabContact.click();
    }

    // Navigate to Shop page from Home page
    async navigateToShop() {
        await this.tabShop.click();
    }

}