import { Page, Locator, expect} from '@playwright/test';
import { ProductItem } from '../test-data/Item';

export class CartPage{
    readonly page: Page;
    
    constructor(page:Page){
        this.page = page;
    }

    //Verify total price and sub total of the added items in the cart
    async verifyCartTotalandSubTotal(products: ProductItem[]) {
        let calculatedTotal = 0;

        for (const item of products) {
            const row = this.page.locator('tbody tr', { hasText: item.name });

            const priceText = await row.locator('td').nth(1).innerText();
            const quantityText = await row.locator('input').inputValue();
            const subtotalText = await row.locator('td').nth(3).innerText();

            const price = parseFloat(priceText.replace('$', ''));
            const quantity = Number(quantityText);
            const subtotal = parseFloat(subtotalText.replace('$', ''));

            // Verify the quantity matches
            expect(quantity).toBe(item.quantity);

            // Verify subtotal
            expect(subtotal).toBe(price * quantity);

            // Add totalprice together
            calculatedTotal += subtotal;
        }

            // Verify total
            const totalDisplayedText = await this.page.locator('.total.ng-binding').innerText();
            const totalDisplayed = parseFloat(totalDisplayedText.replace('Total: ', ''));
            //console.log(totalDisplayed);
            //console.log(calculatedTotal);
            expect(totalDisplayed).toBe(calculatedTotal);
    }
}