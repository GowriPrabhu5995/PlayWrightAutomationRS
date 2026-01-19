const {test, expect} =require('@playwright/test');

test.only('BrowserContext playwright test', async ({browser}) => {

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

test('General playwright test', async ({page}) => {
await page.goto("https://rahulshettyacademy.com/");
console.log("The extracted title is: "+await page.title());
await expect(page).toHaveTitle("Rahul Shetty Academy | QA Automation, Playwright, AI Testing & QA Online Training");
//expect(await page.title()).toBe("rahulshettyacademy.com");
});