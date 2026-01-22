const {test,expect} =require('@playwright/test');

test('Lets shop assesmenty', async ({browser}) =>{

  const Item = "ADIDAS ORIGINAL";
  const country =  ' India';
  const context = await browser.newContext();
  const page = await context.newPage();
  const email = page.getByPlaceholder("email@example.com");
  const password = page.getByPlaceholder("enter your passsword");
  const loginBtn = page.getByRole("button", { name: "Login" });
  const productnames = page.locator(".card-body b");
  const productcarddetails = page.locator(".card-body");

  await page.goto("https://rahulshettyacademy.com/client/");
  const loginpageTitle =await page.title();
  console.log("Login page title is: "+loginpageTitle);
  await email.fill("gowriprabhu.sp@gmail.com");
  await password.fill("Gpk@5995");
  await loginBtn.click();
  await page.waitForLoadState('networkidle');
  await productnames.first().waitFor();
  const allProductNames = await productnames.allTextContents();
  console.log(allProductNames);
  const count = await productcarddetails.count();
  // for(let i=0;i<count;i++){
  //   //await productcarddetails.nth(i).locator("b").textContent();
  //   if(await productcarddetails.nth(i).locator("b").textContent()===Item){
  //     await productcarddetails.nth(i).locator("text = Add To Cart").click();
  //     break;
  //   }
  //}
   await page.locator(".card-body").filter({hasText:Item})
   .getByRole("button",{name:"Add to Cart"}).click();
await page.waitForLoadState("networkidle");
  await page.locator("//button[@routerlink='/dashboard/cart']/label").waitFor();
const cartitemscount =await page.locator("//button[@routerlink='/dashboard/cart']/label").textContent();
console.log("No of items in the cart: "+cartitemscount);

if(cartitemscount>0){
  await page.getByRole("listitem").getByRole("button", {name: "  Cart "}).click();
  await page.locator(".infoWrap").first().waitFor();
  const cartitemslist = await page.locator(".infoWrap").allTextContents();
 //const isItemPresent = cartitemslist.some(item => item.includes(Item));
    await expect(cartitemslist.some(item => item.includes(Item))).toBeTruthy();
    await page.locator(".infoWrap").getByRole("button",{name: "Buy Now"}).click();
    await page.locator("(//input[@type='text'])[2]").fill("123");
    await page.locator("(//input[@type='text'])[3]").fill("GPK");
    await page.locator("(//input[@type='text'])[4]").fill("rahulshettyacademy");
    await page.getByRole("button",{name:"Apply Coupon"}).last().click();
    await page.getByText("* Coupon Applied").waitFor();
    const discountText = await page.getByText("* Coupon Applied");
    await expect(discountText).toBeVisible();
    console.log("Discount text is: "+await discountText.textContent());
    await page.getByPlaceholder("Select Country").pressSequentially("Ind");
    await page.getByText('India').first().waitFor();
    await page.getByText('India').nth(1).click();
    await page.keyboard.press("End");
//await page.locator(".btnn.action__submit.ng-star-inserted").waitFor();
await page.locator(".btnn.action__submit.ng-star-inserted").click();
await page.getByText(" Thankyou for the order. ").waitFor();
const orderConfirmationText = await page.getByText(" Thankyou for the order. ").textContent();
await expect(orderConfirmationText).toBe(" Thankyou for the order. ");
const confirmationMessage = await page.locator("td[align='center']").first().textContent();
console.log("Order confirmation message: "+confirmationMessage);
const Arraytext = confirmationMessage.split("|");
const orderId = Arraytext[1].trim();
console.log("Order ID is: "+orderId);

await page.getByRole("listitem").getByRole("button",{name:"  ORDERS"}).click();
await page.getByText("Your Orders").waitFor();
const ListofOrderedRecords = await page.getByText("Your Orders").allTextContents();
console.log(ListofOrderedRecords);
const countofOrdersplaced = ListofOrderedRecords.length;
console.log("No of orders placed: "+countofOrdersplaced);
const orderRow = page.locator("tr.ng-star-inserted").filter({ hasText: orderId });
await expect(orderRow).toHaveCount(1); //to verify only one record is present No duplicates
await orderRow.getByRole("button",{name:"View"}).click();
 
}

else{
  console.log("No items in the cart");
}


  

});