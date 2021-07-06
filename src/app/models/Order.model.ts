
export interface Order{
  id:string;
  user:string;
  productsOrdered:[{
    product:string,
    quantity:number
  }];

}
export interface NewOrderResponse{
  success:boolean;
  data: Order;

}
export interface SingleOrderResponse {
  success: boolean;
  data:{
    id:string,
    user:{
      id:string,
      name:string,
      email:string

    },
    productsOrdered:[{
      product:{
        image:string,
        id:string,
        title:string,
        price:number,
        description:string,
      },
      quantity:number
    }]
  }

}
