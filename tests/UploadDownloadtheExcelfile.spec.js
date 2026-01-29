const { test, expect } = require('@playwright/test');
const ExcelJS = require("exceljs");

async function WriteExcel(searchText,replaceText, shift,filePath){

    const workbook  = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet =   workbook.getWorksheet("Sheet1");
    const output = await readExcel(worksheet,searchText);

    const cell = worksheet.getCell(output.row, output.column + shift.colShift);
    cell.value = replaceText;
    await  workbook.xlsx.writeFile(filePath);

}


async function readExcel(worksheet,searchText){
    let output = {row:-1, column :-1}
    worksheet.eachRow((row, rowNumber) =>{
        row.eachCell((cell,columnNumber) => {
            if(cell.value === searchText){
                output.row = rowNumber;
                output.col = columnNumber;

            }
        })
    })
    return output;
}

test("Download the excel and modify and upload it again and validate", async ({ page }) =>{
    const filepath = "C:/Users/admin/Downloads/download.xlsx";
    const searchText ="Mango";
    const updatedPriceTag = "370";
   await  page.goto("https://rahulshettyacademy.com/upload-download-test/");
   const downloadPromise= page.waitForEvent('download');
   await page.getByRole('button', {name : 'Download'}).click();
   await downloadPromise;
   await WriteExcel(searchText,updatedPriceTag,{rowshift :0,colShift:5},filepath);
   await page.locator("#fileinput").click();
   await page.locator("#fileinput").setInputFiles(filepath);
  const row = page.locator(".sc-hIPBNq");
   const searchTextPrice=await row.filter({hasText: searchText}).locator("div").nth(8).innerText();
  expect(searchTextPrice).toContain(updatedPriceTag);

   await page.pause();

})