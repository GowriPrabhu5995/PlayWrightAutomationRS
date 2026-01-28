const {test,expect} =require("playwright/test")

test("Assertions and validations",async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();
    // await page.reload();
   const ElementDisplayed = page.getByPlaceholder("Hide/Show Example");
   await expect(ElementDisplayed).toBeVisible();
   await page.getByRole('button', {name: 'Hide'}).click();
   await expect(ElementDisplayed).toBeHidden();
   await page.pause();
   //alert Pop_up or dilouge box
   const confirmButton = page.getByRole('button',{name:'Confirm'});
   await confirmButton.click();
   page.on('dialog', dialog => dialog.accept());

   //Mouse hover
   const hoverElement = page.getByText("Mouse Hover");
   await hoverElement.nth(1).hover();

   //frames handelin

const framepage = page.frameLocator('iframe[name="iframe-name"]');
 const frameTexts = await framepage.locator("div[class='auto-container']").nth(0).textContent();
console.log(frameTexts);

await framepage.getByText("All Access plan").nth(0).click();
const frameText = await framepage.locator(".text h2").textContent();
const happysubscribers =frameText.split(" ")[1];
console.log(happysubscribers);


})


test("Screenshots & Visual comparisons",async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const ElementDisplayed =  page.getByPlaceholder("Hide/Show Example");
   await expect(ElementDisplayed).toBeVisible();
   await ElementDisplayed.screenshot({path : "locator_screenshot.png"
   });
   await page.getByRole('button', {name: 'Hide'}).click();
   await page.screenshot({path :  "Screenshot.png"});
   await expect(ElementDisplayed).toBeHidden();
})

test.only(" Visual test based on screenshot comparision", async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
     await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
     expect(await page.screenshot()).toMatchSnapshot("RS_clientlandingPage.png");
})

