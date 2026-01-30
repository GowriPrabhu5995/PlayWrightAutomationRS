const {LoginPage} = require('./LoginPage');
const {DashBoardPage} = require('./DashBoardPage');
const {CartPage} = require('./CartPage');
const {PlaceOrder} = require('./PlaceOrder');
const {Orderdetails} = require('./Orderdetails')

class PageObjectManager{

    constructor(page){

        this.page = page;

        this.loginpage = new LoginPage(this.page);
        this.DashboardPage = new DashBoardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.PlaceOrder = new PlaceOrder(this.page);
        this.orderDetails = new Orderdetails(this.page);

    }

    getLoginPage(){
        return this.loginpage;
    }

    getDashBoardPage(){
        return this.DashboardPage;
    }

    getCartPage(){
        return this.cartPage;
    }

    getPlaceOrderPage(){
        return this.PlaceOrder;
    }

    getOrderfullDetails(){
        return this.orderDetails;
    }
}

module.exports = {PageObjectManager};