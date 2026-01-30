const {expect} = require('@playwright/test')

class Orderdetails{

    constructor(page){

        this.page = page
        this.OrdersList =  this.page.getByText("Your Orders");
        this.desiredOrder =  this.page.locator("tr.ng-star-inserted");
       
    }

    async ListOfOrdersAvailable(){

        const ListofOrderedRecords = await this.OrdersList.allTextContents();
        console.log(ListofOrderedRecords);
        const countofOrdersplaced = ListofOrderedRecords.length;
        console.log("No of orders placed: "+countofOrdersplaced);

    }

    async getTheDersiredOrderRowandViewDetails(orderId){
      
        const orderRow =  this.desiredOrder.filter({ hasText: orderId });
        await expect(orderRow).toHaveCount(1); //to verify only one record is present No duplicates
        await orderRow.getByRole("button",{name:"View"}).click();
    }
}
module.exports = {Orderdetails}