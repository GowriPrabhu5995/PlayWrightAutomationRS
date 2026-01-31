const {test,expect} =require('@playwright/test');
const {PageObjectManager} = require('../PageObjects/PageObjectManager');
//Json --> String --> JS
const dataset = JSON.parse(JSON.stringify(require("../utils/OrderplacementTestData.json")));


test('Lets shop assesmenty', async ({browser}) =>{
const context = await browser.newContext();
const page = await context.newPage();
const pageObjectManager =new PageObjectManager(page);

  
  //const Item = "ADIDAS ORIGINAL";
  //const country =  'India';
  //const emailid = "gowriprabhu.sp@gmail.com";
  //const pwd = "Gpk@5995"
 // const CVV = "123";
  //const cardHolderName = "GPK";
  //const coupon = "rahulshettyacademy";
  const loginPage = pageObjectManager.getLoginPage();
   await loginPage.launchTheapplication();
   await loginPage.Login(dataset.emailId,dataset.password);

  const DashboardPage = pageObjectManager.getDashBoardPage();
  await DashboardPage.getProductDetails();
  await DashboardPage.clickonAddToCard(dataset.Item);
  const cartitemscount =  await DashboardPage.gettheCountOfCartItemsfromthelable();
   if(cartitemscount>0){
  await DashboardPage.navigateToCartdetailsPage();
  const cartPage = pageObjectManager.getCartPage();
  await cartPage.confirmItemAndBuy(dataset.Item);
  const placeOrder = pageObjectManager.getPlaceOrderPage();
  await  placeOrder.fillThePaymentDetailsandPlaceTheOrder(dataset.CVV,dataset.cardHolderName,dataset.coupon,dataset.CountryName);
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