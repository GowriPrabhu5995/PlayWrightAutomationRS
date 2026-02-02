const {test,expect} =require('@playwright/test');
const {customtest} = require('../utils/BaseTest');
const {PageObjectManager} = require('../PageObjects/PageObjectManager');
//Json --> String --> JS
const dataset = JSON.parse(JSON.stringify(require("../utils/OrderplacementTestData.json")));

for(const data of dataset){
test(`Lets shop assesmenty ${data.Item}`, async ({browser}) =>{
const context = await browser.newContext();
const page = await context.newPage();
const pageObjectManager =new PageObjectManager(page);

  const loginPage = pageObjectManager.getLoginPage();
   await loginPage.launchTheapplication();
   await loginPage.Login(data.emailId,data.password);

  const DashboardPage = pageObjectManager.getDashBoardPage();
  await DashboardPage.getProductDetails();
  await DashboardPage.clickonAddToCard(data.Item);
  const cartitemscount =  await DashboardPage.gettheCountOfCartItemsfromthelable();
   if(cartitemscount>0){
  await DashboardPage.navigateToCartdetailsPage();
  const cartPage = pageObjectManager.getCartPage();
  await cartPage.confirmItemAndBuy(data.Item);
  const placeOrder = pageObjectManager.getPlaceOrderPage();
  await  placeOrder.fillThePaymentDetailsandPlaceTheOrder(data.CVV,data.cardHolderName,data.coupon,data.CountryName);
  const OrderId = await  placeOrder.OrderConfirmatation();
  await DashboardPage.navigateToOrderdetails();
  await page.pause();
  const orderDetails = pageObjectManager.getOrderfullDetails();
  await orderDetails.ListOfOrdersAvailable();
  await orderDetails.getTheDersiredOrderRowandViewDetails(OrderId);


}

else{
  console.log("No items in the cart");
}


});
}

 customtest.only("Lets shop assesmenty", async ({browser,TestDataForOrderCreation}) =>{
const context = await browser.newContext();
const page = await context.newPage();
const pageObjectManager =new PageObjectManager(page);

  const loginPage = pageObjectManager.getLoginPage();
   await loginPage.launchTheapplication();
   await loginPage.Login(TestDataForOrderCreation.emailId,TestDataForOrderCreation.password);

  const DashboardPage = pageObjectManager.getDashBoardPage();
  await DashboardPage.getProductDetails();
  await DashboardPage.clickonAddToCard(TestDataForOrderCreation.Item);
  const cartitemscount =  await DashboardPage.gettheCountOfCartItemsfromthelable();
   if(cartitemscount>0){
  await DashboardPage.navigateToCartdetailsPage();
  const cartPage = pageObjectManager.getCartPage();
  await cartPage.confirmItemAndBuy(TestDataForOrderCreation.Item);

   }

   else{
  console.log("No items in the cart");
}


});


