const BaseTest = require('@playwright/test')

 exports.customtest = BaseTest.test.extend (
    {

    TestDataForOrderCreation : {
                         emailId : "gowriprabhu.sp@gmail.com",
                         password: "Gpk@5995",
                         Item    : "ADIDAS ORIGINAL",
                         CountryName  : "India",
                         CVV     : "123",
                         cardHolderName : "GPK",
                         coupon : "rahulshettyacademy"

    }

}
    )
