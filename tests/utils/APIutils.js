class APIutils{


    constructor(apicontext, loginPayLoad){
        this.apicontext=apicontext;
        this.loginPayLoad = loginPayLoad;
    }
    async getToken(){
        const loginresponse= await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
  data: this.loginPayLoad
     })

      
      const loginresponseJson = await loginresponse.json();
     let  logintoken = loginresponseJson.token;
      console.log(logintoken);
      return logintoken;
    }

    async createOrder(createOrderPayload){

        let response =  {};
        response.token = await this.getToken();

        const orderresponse =    await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
                {
                    data: createOrderPayload,
                    headers:{
                        'Authorization':  response.token,
                        'content-Type' : 'application/json'
        
                           }  
                })
        
             const orderresponseJson = await orderresponse.json();
                console.log(orderresponseJson);
           let orderId = orderresponseJson.orders[0];
                console.log("Order id is: "+orderId);
              response.orderId = orderId;
                return response;
    }



}
module.exports = {APIutils};
