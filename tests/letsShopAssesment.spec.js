const {test,expect} =require('@playwright/test');

test('Lets shop assesmenty', async ({browser}) =>{
  const context = await browser.newContext();
  const page = await context.newPage();
  const email = page.locator("#userEmail");
  const password = page.locator("#userPassword");
  const loginBtn = page.locator("#login");
   const productCards = page.locator(".card-body b");
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  const loginpageTitle =await page.title();
  console.log("Login page title is: "+loginpageTitle);
  await email.fill("gowriprabhu.sp@gmail.com");
  await password.fill("Gpk@5995");
  await loginBtn.click();
  //await  page.waitForLoadState('networkidle');
  await productCards.first().waitFor();
  //await productCards.first().textContent();
 // await productCards.last().textContent();
  const allProductNames = await productCards.allTextContents();
  console.log(allProductNames);







})