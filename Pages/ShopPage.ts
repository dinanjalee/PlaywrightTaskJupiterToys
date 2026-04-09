import { Page, Locator, expect } from '@playwright/test';
import { ProductItem } from '../test-data/Item';

export class ShopPage{
    readonly page: Page;
    readonly tabCart: Locator;

    constructor(page:Page){
       this.page = page;
       this.tabCart = page.locator('#nav-cart');
    }

    // Adding items to cart by giving a list of items with quantity of the items
    async buyItems(products: ProductItem[]) {
        for (const item of products) {
        const productItem = this.page.locator('li', { hasText: item.name });
        for (let i = 0; i < item.quantity; i++) {
            const buyButton = productItem.getByText('Buy');
                await buyButton.click();
        }
    }
        
    }

    // Navigating to the cart page after adding the items
    async navigateToCart() {
        await this.tabCart.click();
    }

}