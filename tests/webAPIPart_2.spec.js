const {test,expect} =require('playwright/test')
const Item = "ADIDAS ORIGINAL";
  const country =  ' India';
let webContext;

test.beforeAll(async ({browser} )=>{

const context = await browser.newContext();
  const page = await context.newPage();
  const email = page.locator("#userEmail");
  const password = page.locator("#userPassword");
  const loginBtn = page.locator("#login");
await page.goto("https://rahulshettyacademy.com/client/");
  const loginpageTitle =await page.title();
  console.log("Login page title is: "+loginpageTitle);
  await email.fill("gowriprabhu.sp@gmail.com");
  await password.fill("Gpk@5995");
  await loginBtn.click();
  await page.waitForLoadState('networkidle');
  await context.storageState({path: 'sessiondetails.json'});
webContext =await browser.newContext({storageState: "sessiondetails.json"});
})

test("Client App login", async()=>{

    const page = await webContext.newPage();
    const productnames = page.locator(".card-body b");
  const productcarddetails = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client/");
    await productnames.first().waitFor();
  const allProductNames = await productnames.allTextContents();
  console.log(allProductNames);
  const count = await productcarddetails.count();
  for(let i=0;i<count;i++){
    //await productcarddetails.nth(i).locator("b").textContent();
    if(await productcarddetails.nth(i).locator("b").textContent()===Item){
      await productcarddetails.nth(i).locator("text = Add To Cart").click();
      break;
    }
  }
  await page.locator("//button[@routerlink='/dashboard/cart']/label").waitFor();
const cartitemscount =await page.locator("//button[@routerlink='/dashboard/cart']/label").textContent();
console.log("No of items in the cart: "+cartitemscount);

if(cartitemscount>0){
  await page.locator("//button[@routerlink='/dashboard/cart']").click();
  await page.locator(".infoWrap").first().waitFor();
  const cartitemslist = await page.locator(".infoWrap").allTextContents();
 //const isItemPresent = cartitemslist.some(item => item.includes(Item));
    await expect(cartitemslist.some(item => item.includes(Item))).toBeTruthy();
    await page.locator(".infoWrap").locator("text ='Buy Now'").click();
    await page.locator("(//input[@type='text'])[2]").fill("123");
    await page.locator("(//input[@type='text'])[3]").fill("GPK");
    await page.locator("(//input[@type='text'])[4]").fill("rahulshettyacademy");
    await page.locator("text='Apply Coupon'").last().click();
    await page.locator("p.mt-1").waitFor();
    const discountText = await page.locator("p.mt-1");
    //const discountText = await page.locator("p.mt-1").textContent();
    await expect(discountText).toBeVisible();
    console.log("Discount text is: "+await discountText.textContent());
    await page.locator("input[placeholder='Select Country']").pressSequentially("Ind");
    await page.locator("button.ta-item").first().waitFor();
   const countryDropdown =  page.locator("button.ta-item");
  const countryCount = await countryDropdown.count();

  for(let j=0;j<countryCount;j++){
countryDropdown.nth(j).textContent();
if(await countryDropdown.nth(j).textContent()===country){
  await countryDropdown.nth(j).click();
  break;
}
  }

await page.locator(".btnn.action__submit.ng-star-inserted").waitFor();
await page.locator(".btnn.action__submit.ng-star-inserted").click();
await page.locator(".hero-primary").waitFor();
const orderConfirmationText = await page.locator(".hero-primary").textContent();
await expect(orderConfirmationText).toBe(" Thankyou for the order. ");
const confirmationMessage = await page.locator("td[align='center']").first().textContent();
console.log("Order confirmation message: "+confirmationMessage);
const Arraytext = confirmationMessage.split("|");
const orderId = Arraytext[1].trim();
console.log("Order ID is: "+orderId);

await page.locator("button[routerlink='/dashboard/myorders']").click();
await page.locator("h1.ng-star-inserted").waitFor();
const ListofOrderedRecords = await page.locator("tr.ng-star-inserted").allTextContents();
console.log(ListofOrderedRecords);
const countofOrdersplaced = ListofOrderedRecords.length;
console.log("No of orders placed: "+countofOrdersplaced);
const orderRow = page.locator("tr.ng-star-inserted").filter({ hasText: orderId });
await expect(orderRow).toHaveCount(1); //to verify only one record is present No duplicates
await orderRow.locator("button[class='btn btn-primary']").click();
 
}

else{
  console.log("No items in the cart");
}
await page.pause();

  

});