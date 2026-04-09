import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/HomePage';
import { ShopPage } from '../Pages/ShopPage';
import { productitems } from '../test-data/ProductDetails';
import { CartPage } from '../Pages/CartPage';

test('Test Case 3 Add items to the cart and validate the cart', async ({page})=>{
    const home = new HomePage(page);
    const shop = new ShopPage(page);
    const cart = new CartPage(page);

    //Navigate from the home page go to contact page
    await home.loadingWeb();
    await home.navigateToShop();

    await shop.buyProductitems(productitems);

    //
    await shop.navigateToCart();
    await cart.verifyCart(productitems);

})