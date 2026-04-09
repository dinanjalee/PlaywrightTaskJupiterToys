import { Page, Locator, expect} from '@playwright/test';

export class CartPage{
    readonly page: Page;
    
    constructor(page:Page){
        this.page = page;
    }

async verifyCart(products: Record<string, number>) {
    let totalCalculated = 0;

    for (const [itemName, noOfItemsAdded] of Object.entries(products)) {
        const row = this.page.locator('tbody tr', { hasText: itemName });

        const priceText = await row.locator('td').nth(1).innerText();
        const quantityText = await row.locator('input').inputValue();
        const subtotalText = await row.locator('td').nth(3).innerText();

        const price = parseFloat(priceText.replace('$', ''));
        const quantity = Number(quantityText);
        const subtotal = parseFloat(subtotalText.replace('$', ''));
        //console.log(quantity);
        //console.log(subtotal);

        // Verify the quantity matches
        expect(quantity).toBe(noOfItemsAdded);

        // Verify subtotal
        expect(subtotal).toBe(price * quantity);

        // Add to total
        totalCalculated += subtotal;
    }

    // Verify total
    const totalDisplayedText = await this.page.locator('.total.ng-binding').innerText();
    const totalDisplayed = parseFloat(totalDisplayedText.replace('Total: ', ''));
    //console.log(totalDisplayed);
    //console.log(totalCalculated);
    expect(totalDisplayed).toBe(totalCalculated);

    }

}