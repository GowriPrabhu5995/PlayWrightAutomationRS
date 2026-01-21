const {test,expect}=require('playwright/test');

test("special locator practice", async({browser})=>{
    const context = browser.newContext();
    const page =await (await context).newPage();
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.locator("//div[@class='form-group']//input[@name='name']").pressSequentially("GowriPrabhu");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Male");
    await page.getByPlaceholder("Password").fill("Gpk@5995");
    await page.getByRole("button",{name:"Submit"}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").click();
    //await page.getByText("Success! The Form has been submitted successfully!.").shouldBeVisible();
    await page.getByRole("link", {name:"Shop"}).click();
    await page.locator("app-card").filter({hasText: "Samsung Note 8"}).getByText("Add ").click();


})