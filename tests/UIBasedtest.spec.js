const {test, expect} =require('@playwright/test');

test('BrowserContext playwright test', async ({browser}) => {

const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
await page.locator("#username").fill("rahulshetty");
await page.locator("#password").fill("");
await page.locator("#signInBtn").click();

});

test('General playwright test', async ({page}) => {
await page.goto("https://rahulshettyacademy.com/");
console.log("The extracted title is: "+await page.title());
await expect(page).toHaveTitle("Rahul Shetty Academy | QA Automation, Playwright, AI Testing & QA Online Training");
//expect(await page.title()).toBe("rahulshettyacademy.com");
});