class LoginPage {

    constructor (page){

        this.page = page
        this.email = page.getByPlaceholder("email@example.com");
        this.password = page.getByPlaceholder("enter your passsword");
        this.loginBtn = page.getByRole("button", { name: "Login" });
    }

    async launchTheapplication(){
        await this.page.goto("https://rahulshettyacademy.com/client/");
        // const loginpageTitle =await page.title();
        // console.log("Login page title is: "+loginpageTitle);
    }

   async Login(emailid,password)
   {
    await this.email.fill(emailid);
    await this.password.fill(password);
    await this.loginBtn.click();
    await this.page.waitForLoadState('networkidle');
    }

}

module.exports = {LoginPage}