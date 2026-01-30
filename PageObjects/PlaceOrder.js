const {expect} = require("@playwright/test");
class PlaceOrder{

    constructor(page){
        this.page = page;
        this.EnterCVV = page.locator("(//input[@type='text'])[2]");
        this.CardName = page.locator("(//input[@type='text'])[3]");
        this.ApplyCoupon = page.locator("(//input[@type='text'])[4]");
        this.ClickOnApplyCoupon = page.getByRole("button",{name:"Apply Coupon"})
        this.CouoponAppliedText = page.getByText("* Coupon Applied");
        this.EnterCountry = page.getByPlaceholder("Select Country");
        //this.SelectCountry =  page.getByText("countryName");
        this.SubmitButton = page.locator(".btnn.action__submit.ng-star-inserted");
        this.orderConfirmationText = page.getByText(" Thankyou for the order. ");
        this.orderconfirmationMessage =page.locator("td[align='center']");

        
    }

    async fillThePaymentDetailsandPlaceTheOrder(CVV,CardHolderName,Coupon,countryName){
        await  this.EnterCVV.fill(CVV);
        await  this.CardName.fill(CardHolderName);
        await  this.ApplyCoupon.fill(Coupon);
        await  this.ClickOnApplyCoupon.last().click();
        const discountText = await this.CouoponAppliedText
        await expect(discountText).toBeVisible();
        console.log("Discount text is: "+await discountText.textContent());
        await  this.EnterCountry.pressSequentially(countryName);
        await this.page.getByText(countryName, { exact: true }).click();
        await  this.page.keyboard.press("End");
        await  this.SubmitButton.click();
    }


    async OrderConfirmatation(){
        const orderConfirmation = await this.orderConfirmationText.textContent();
        await expect(orderConfirmation).toBe(" Thankyou for the order. ");
        const confirmationMessage = await this.orderconfirmationMessage.first().textContent();
        console.log("Order confirmation message: "+confirmationMessage);
        const Arraytext = confirmationMessage.split("|");
        const orderId = Arraytext[1].trim();
        console.log("Order ID is: "+orderId);
        return orderId;
    }
}

module.exports = {PlaceOrder}