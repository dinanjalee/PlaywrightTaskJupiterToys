import { Page, Locator, expect } from '@playwright/test';
import { ProductItem } from '../test-data/Item';

export class ShopPage{
    readonly page: Page;
    readonly tabCart: Locator;

    constructor(page:Page){
       this.page = page;
       this.tabCart = page.locator('#nav-cart');
    }

    async buyProductitems(productitems: Record<string, number>) {
        for (const [itemName, quantity] of Object.entries(productitems)) {
            const item = this.page.locator('li', { hasText: itemName });

            for (let i = 0; i < quantity; i++) {
                //await item.getByRole('button', { name: 'Buy' }).click();
                const buyButton = item.getByText('Buy').first();
                await buyButton.click();
            }
        }
        
    }

    async buyItems(products: ProductItem[]) {
        for (const item of products) {
        const productItem = this.page.locator('li', { hasText: item.name });
        for (let i = 0; i < item.quantity; i++) {
            const buyButton = productItem.getByText('Buy');
                await buyButton.click();
        }
    }
        
    }

    

    async navigateToCart() {
        await this.tabCart.click();
    }

}