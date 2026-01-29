class DashBoardPage{

    constructor(page){

        this.page = page;
        this.productnames = page.locator(".card-body b");
        this.productcarddetails = page.locator(".card-body");
        this.DashBoardCartButton = page.getByRole("listitem").getByRole("button", {name: "  Cart "});
        this.countofCartItemsfromDashboardLable = page.locator("//button[@routerlink='/dashboard/cart']/label");
        this.DashBoardOrderButton=page.getByRole("listitem").getByRole("button",{name:"  ORDERS"})
    }

    async getProductDetails()
    {
       await this.productnames.first().waitFor();
  const allProductNames = await this.productnames.allTextContents();
  console.log(allProductNames);
  const count = await this.productcarddetails.count();

    }

    async clickonAddToCard(Item)
    {
        await this.productcarddetails.filter({hasText:Item})
   .getByRole("button",{name:"Add to Cart"}).click();
    }
    
async gettheCountOfCartItemsfromthelable(){
     await this.countofCartItemsfromDashboardLable.waitFor();
const cartitemscount =await this.countofCartItemsfromDashboardLable.textContent();
console.log("No of items in the cart: "+cartitemscount);
return cartitemscount;
}

    async navigateToCartdetailsPage(){
         this.DashBoardCartButton.click();

    }

    async navigateToOrderdetails(){
         this.DashBoardOrderButton.click();

    }

}
module.exports = {DashBoardPage}