const {test, expect} =require('@playwright/test');

test('BrowserContext playwright test', async ({browser}) => {

const context = await browser.newContext();
const page = await context.newPage();
const username = await page.locator("#username");
const password = await page.locator("#password");
const signInBtn = await page.locator("#signInBtn");
const productdetailsCards = await page.locator(".card-body a");
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
await username.fill("rahulshettyacademy");
await password.fill("learning");
await signInBtn.click();
//console.log(await page.locator("[style*=block]").textContent());
//await expect(page.locator("[style*=block]")).toContainText("Incorrect");

const firstProduct = await productdetailsCards.first().textContent();
const secondProduct = await productdetailsCards.last().textContent();
const ItemTitles = await productdetailsCards.allTextContents();

console.log(firstProduct);
console.log(secondProduct);
console.log(ItemTitles);

});

test('UI controls', async ({page}) => {
// await page.goto("https://rahulshettyacademy.com/");
// console.log("The extracted title is: "+await page.title());
// await expect(page).toHaveTitle("Rahul Shetty Academy | QA Automation, Playwright, AI Testing & QA Online Training");
// //expect(await page.title()).toBe("rahulshettyacademy.com");
const username =  page.locator("#username");
const password =  page.locator("#password");
const usertypeRadioBtn =  page.locator("span.checkmark");
const dropdown =  page.locator("select.form-control");
const material = page.locator("a.blinkingText").first();
const signInBtn =  page.locator("#signInBtn");
const productdetailsCards =  page.locator(".card-body a");
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
await usertypeRadioBtn.nth(1).click();
await dropdown.selectOption("consult");
await page.locator("#okayBtn").click();
await expect(usertypeRadioBtn.nth(1)).toBeChecked();
console.log(await usertypeRadioBtn.nth(1).isChecked());
await page.locator("#terms").click();
await expect(page.locator("#terms")).toBeChecked();
await page.locator("#terms").uncheck();
await expect(page.locator("#terms")).not.toBeChecked();
//expect(await page.locator("#terms").isChecked()).toBeFalsy();
await expect(material).toHaveAttribute("class", "blinkingText");



});

test.only('@child windoe handeling', async({browser}) =>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const username =  page.locator("#username");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const material = page.locator("a.blinkingText").first();
    const [newPage] = await Promise.all([

        context.waitForEvent('page'),//listen for  any new page event pending, rejected, fullfilled
        material.click(),

          ]);

          const text = await newPage.locator("p.im-para").nth(1).textContent();
         const arraytext = text.split("@");
        const domain = arraytext[1].split(" ")[0];
        console.log(domain);
        await username.fill(domain);

       console.log(await page.locator("#username").inputValue());



        });