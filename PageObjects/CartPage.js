const { expect } = require("@playwright/test");
class CartPage{
    
    constructor(page){

        this.page = page;
        this.cartItems = page.locator(".infoWrap");
        this.BuyNowButton = page.locator(".infoWrap").getByRole("button",{name: "Buy Now"});


    }

    async confirmItemAndBuy(Item){

         await this.cartItems.first().waitFor();
         const cartitemslist = await this.cartItems.allTextContents();
         await expect(cartitemslist.some(item => item.includes(Item))).toBeTruthy();
         await this.BuyNowButton.click();

    }

   
}
module.exports = {CartPage}