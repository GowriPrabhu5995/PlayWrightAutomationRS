const { create } = require('node:domain');
 const {APIutils} = require('./utils/APIutils');
const {test,expect,request} = require('playwright/test');
 const loginPayload = {userEmail: "gowriprabhu.sp@gmail.com", userPassword: "Gpk@5995"};
const createOrderPayload ={orders: [{country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};
 let response;
test.beforeAll( async()=>{

  const apicontext=  await request.newContext();
  const apiutils = new APIutils(apicontext,loginPayload);
  response =  await apiutils.createOrder(createOrderPayload);

  
});

test('Lets shop assesmenty', async ({browser}) =>{

  const context = await browser.newContext();
  const page = await context.newPage();
 
 await context.addInitScript(value => {window.localStorage.setItem('token',value)},response.token);
  await page.goto("https://rahulshettyacademy.com/client/");
//   const loginpageTitle =await page.title();
//   console.log("Login page title is: "+loginpageTitle);
//   await email.fill("gowriprabhu.sp@gmail.com");
//   await password.fill("Gpk@5995");
//   await loginBtn.click();
//   await page.waitForLoadState('networkidle');
//   await productnames.first().waitFor();
//   const allProductNames = await productnames.allTextContents();
//   console.log(allProductNames);
//   const count = await productcarddetails.count();
  // for(let i=0;i<count;i++){
  //   //await productcarddetails.nth(i).locator("b").textContent();
  //   if(await productcarddetails.nth(i).locator("b").textContent()===Item){
  //     await productcarddetails.nth(i).locator("text = Add To Cart").click();
  //     break;
  //   }
  //}
   

await page.getByRole("listitem").getByRole("button",{name:"  ORDERS"}).click();
//await page.getByText("Your Orders").waitFor();
const ListofOrderedRecords = await page.getByText("Your Orders").allTextContents();
console.log(ListofOrderedRecords);
const countofOrdersplaced = ListofOrderedRecords.length;
console.log("No of orders placed: "+countofOrdersplaced);
const orderRow = page.locator("tr.ng-star-inserted").filter({ hasText: response.orderId });
await expect(orderRow).toHaveCount(1); //to verify only one record is present No duplicates
await orderRow.getByRole("button",{name:"View"}).click();

});


