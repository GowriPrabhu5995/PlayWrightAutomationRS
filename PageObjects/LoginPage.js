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

   async Login(username,pwd)
   {
    await this.email.fill(username);
    await this.password.fill(pwd);
    await this.loginBtn.click();
    await this.page.waitForLoadState('networkidle');
    }

}

module.exports = {LoginPage}