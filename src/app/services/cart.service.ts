import { Product } from './../models/product.model';
import { NavigationExtras, Router } from '@angular/router';
import { Cart, CartPublic } from './../models/Cart.model';
import { environment } from './../../environments/environment';
import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderService } from './order.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, mergeMap, flatMap} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NewOrderResponse} from '../models/Order.model';
@Injectable({
  providedIn:'root'
})
export class CartService {
  private serverUrl = environment.SERVER_URL;
  private cartDataClient: CartPublic ={
    total:0,
    productData:[{
      incart:0,
      id:0
    }]
  };
  private cartDataServer: Cart={
    total:0,
    data:[
      {
        numInCart:0,
        product:undefined
      }
    ]
  };

  cartTotalObservable = new BehaviorSubject<number>(0);
  cartDataObservable = new BehaviorSubject<Cart>(this.cartDataServer);





  constructor(private http: HttpClient,
    private productService:ProductService,
     private orderService:OrderService,
     private router: Router,
     private toast:ToastrService){

    this.cartTotalObservable.next(this.cartDataServer.total);
    this.cartDataObservable.next({...this.cartDataServer});


    let info:CartPublic = JSON.parse(localStorage.getItem('cart'));

    if (info != null && info != undefined && info.productData[0].incart!=0){
      this.cartDataClient = info;
      for(let i =0 ; i < this.cartDataClient.productData.length;i++){
        this.productService.getSingleProduct(this.cartDataClient.productData[i].id).subscribe((actualProdInfo:Product)=>{
          if(this.cartDataServer.data[0].numInCart == 0){
            this.cartDataServer.data[0].numInCart = this.cartDataClient.productData[i].incart;
            this.cartDataServer.data[0].product = actualProdInfo;


          }else{
            this.cartDataServer.data.push({
              numInCart: this.cartDataClient.productData[i].incart,
              product:actualProdInfo
            });
          }
          this.calculateToatal();
          this.cartDataClient.total = this.cartDataServer.total;
          localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          this.cartDataObservable.next({...this.cartDataServer});
        });


      }
    }
    else{
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
    }



  }
  addProductToCart(id: number, quantity?:number){
    this.productService.getSingleProduct(id).subscribe(prod=>{
      if(this.cartDataServer.data[0].product == undefined){
        this.cartDataServer.data[0].product = prod;
        this.cartDataServer.data[0].numInCart = quantity !=undefined?quantity:1;

        this.calculateToatal();

        this.cartDataClient.productData[0].incart =this.cartDataServer.data[0].numInCart;
        this.cartDataClient.productData[0].id =prod.id;
        this.cartDataClient.total= this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartDataObservable.next({...this.cartDataServer});

        this.toast.success(`${prod.title} added to cart`,'Product Added',{
          timeOut:1500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        });

      }
      else{
        let index = this.cartDataServer.data.findIndex(p =>{
          return p.product.id == prod.id;
        });
        if(index!=-1){
          if(quantity!=undefined && quantity<=prod.quantity){
            this.cartDataServer.data[index].numInCart= this.cartDataServer.data[index].numInCart < prod.quantity? quantity:prod.quantity;
          }
          else{
            this.cartDataServer.data[index].numInCart < prod.quantity?this.cartDataServer.data[index].numInCart++ : prod.quantity;

          }
          this.cartDataClient.productData[index].incart = this.cartDataServer.data[index].numInCart;
          this.calculateToatal();
          this.cartDataClient.total= this.cartDataServer.total;
          localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          this.cartDataObservable.next({...this.cartDataServer});

          this.toast.info(`${prod.title} quantity updated in the cart`,'Product Updated',{
            timeOut:1500,
            progressBar:true,
            progressAnimation:'increasing',
            positionClass:'toast-top-right'
          });

        }
        else{
          this.cartDataServer.data.push({
            numInCart:1,
            product:prod
          });
          this.cartDataClient.productData.push({
            incart:1,
            id:prod.id
          });
          this.calculateToatal();
          this.cartDataClient.total= this.cartDataServer.total;
          localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          this.cartDataObservable.next({...this.cartDataServer});
          this.toast.success(`${prod.title} added to cart`,'Product Added',{
            timeOut:1500,
            progressBar:true,
            progressAnimation:'increasing',
            positionClass:'toast-top-right'
          });
        }

      }

    });

  }
  updateCartItem(index:number, increase:boolean){
    let data= this.cartDataServer.data[index];
    if(increase){
      data.numInCart< data.product.quantity ? data.numInCart++:data.product.quantity;
      this.cartDataClient.productData[index].incart = data.numInCart;
      this.calculateToatal();

      this.cartDataClient.total= this.cartDataServer.total;
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      this.cartDataObservable.next({...this.cartDataServer});

    }
    else{
      if(data.numInCart == 1){
        if(this.deleteProductFromCart(index)){
          data.numInCart--;
          this.cartDataObservable.next({...this.cartDataServer});
        }
      }
      else{
        data.numInCart--;
        this.cartDataClient.productData[index].incart = data.numInCart;
        this.calculateToatal();

        this.cartDataClient.total= this.cartDataServer.total;
        this.cartDataObservable.next({...this.cartDataServer});
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));

      }

    }

  }
  deleteProductFromCart(index: number){
    if(window.confirm('Are you sure you want to remove the item ?')){
      this.cartDataServer.data.splice(index,1);
      this.cartDataClient.productData.splice(index,1);
      this.calculateToatal();
      this.cartDataClient.total = this.cartDataServer.total;
      if(this.cartDataClient.total ==0){
        this.cartDataClient = {
          total:0,
          productData:[{
            incart:0,
            id:0
          }]
        };
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }
      else{
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }

      if (this.cartDataServer.total == 0){
        this.cartDataServer = {
          total:0,
          data:[
            {
              numInCart:0,
              product:undefined
            }
          ]
        };
        this.cartDataObservable.next({...this.cartDataServer});
      }
      else{
        this.cartDataObservable.next({...this.cartDataServer});
      }
      return true;
    }
    else{
      return false;
    }

  }

  private calculateToatal(){
    let total = 0;
    this.cartDataServer.data.forEach(prod=>{
      total+=prod.numInCart*prod.product.price;
    });
    this.cartDataServer.total = total;
    this.cartTotalObservable.next(this.cartDataServer.total);
  }
  checkoutFromCart(userId: string){
     return this.http.post(`${this.serverUrl}/orders/payment`,null).pipe(mergeMap((res:{success: boolean})=>{
      if(res.success){


        return this.http.post(`${this.serverUrl}/orders`,{
          user:userId,
          productsOrdered:this.cartDataClient.productData.map(item=> {return {product:item.id,quantity:item.incart}})
        }).pipe(mergeMap((innerval:NewOrderResponse)=>{
            return this.orderService.getSingleOrder(innerval.data.id).pipe(map(innermostval=>{


                this.cartDataClient = {
                  total:0,
                  productData:[{
                    incart:0,
                    id:0
                  }]
                };
                let total = this.cartDataServer.total;
                //this.cartTotalObservable.next(0);
                localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
                this.resetServerData();
                return {order : innermostval, total: total};

            }));


        }));

      }




    }));


  }
  private resetServerData(){
    this.cartDataServer = {
      total:0,
      data:[{
        numInCart:0,
        product:undefined
      }]
    };
    this.cartDataObservable.next({...this.cartDataServer});


  }
  calculateSubTotal(index:number){
    let subToatal = 0 ;
    const p = this.cartDataServer.data[index];
    subToatal = p.product.price*p.numInCart;
    return subToatal;
  }



}



