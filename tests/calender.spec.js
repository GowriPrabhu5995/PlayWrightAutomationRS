const {test,expect} =require('playwright/test');

test("calender functionality logic", async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    const currentDate= new Date().toLocaleDateString('en-GB',{day: '2-digit',month: 'long', year: 'numeric'});
    const desiredyear = "2034";
    const desiredmonth = "May";
    const desireddate = "1"; 
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/");
   // await page.getByText("Top Deals").click();
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
         page.getByText("Top Deals").click()
    ]);
    await newPage.waitForLoadState('networkidle');
   // const DefaultdeliveryDateText = await newPage.locator("//div[@class='react-date-picker__inputGroup']").textContent();
    //console.log("Default deliveryDateText from the application : "+DefaultdeliveryDateText);
    await newPage.locator(".react-date-picker__inputGroup").click(); 

    await newPage.locator(".react-calendar__tile--active").waitFor();
    const selectedDateText = await newPage.locator(".react-calendar__tile--active").textContent();
    const currentMonthYear = await newPage.locator(".react-calendar__navigation__label__labelText").textContent();
    const deliverydate = selectedDateText + " "  + currentMonthYear;
    console.log("current deliverydate selected from the application : "+deliverydate);
    await expect(deliverydate).toBe(currentDate);
    let yearMatched = false;
const monthlabel= newPage.locator(".react-calendar__year-view__months__month");
const dateLocator = newPage.locator(".react-calendar__month-view__days__day");
while (!yearMatched) {

    const label = newPage.locator(".react-calendar__navigation__label__labelText");
    const yearlable= newPage.locator(".react-calendar__decade-view__years__year");
   
    await label.waitFor();
    await label.click();
     // open year / decade view
    const YearText = await label.textContent();
    // Example: "2026"
    if (YearText.includes(desiredyear)) {
        await yearlable.waitFor({ state: "visible" });
        yearMatched = true;
        break;        
    }
    // Extract only the year number safely
    const currentYear = YearText.match(/\d{4}/)[0];
    if (parseInt(currentYear) < parseInt(desiredyear)) {
        await newPage
          .locator(".react-calendar__navigation__next-button")
          .click();
    } else {
        await newPage
          .locator(".react-calendar__navigation__prev-button")
          .click();
    }
    // Click desired year once visible
    const desiredYearLocator = yearlable.filter({ hasText: desiredyear });
    if (await desiredYearLocator.isVisible()) {
        await desiredYearLocator.click();
        yearMatched = true;
    }
}
await monthlabel.filter({hasText:desiredmonth}).click();
await dateLocator.filter({hasText:new RegExp(`^${desireddate}$`)}).first().click();
    await page.pause();
    //react-calendar__navigation__label  current month and year calender header 
    //react-calendar__navigation__label__labelText react-calendar__navigation__label__labelText--from
    //react-calendar__navigation__label
    //react-calendar__navigation__label__labelText react-calendar__navigation__label__labelText--from 
 const selectedDateText_1 = await newPage.locator(".react-calendar__tile--active").textContent();
    const currentMonthYear_1 = await newPage.locator(".react-calendar__navigation__label__labelText").textContent();
    const deliverydate_1 = selectedDateText_1 + " "  + currentMonthYear_1;
    const expectedDate = desireddate + " " + desiredmonth + " " + desiredyear;
    console.log("Updated deliverydate selected from the application : "+deliverydate_1);
    await expect(deliverydate_1).toBe(expectedDate);
})