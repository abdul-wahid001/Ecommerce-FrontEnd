import { Cart } from '../../models/Cart.model';
import { NavigationExtras, Router } from '@angular/router';
import {  OrderService } from '../../services/order.service';
import { CartService } from '../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SingleOrderResponse } from 'src/app/models/Order.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartData:Cart;

  constructor(private cartService: CartService, private orderService: OrderService,private router:Router, private spinner:NgxSpinnerService) { }


  ngOnInit(): void {

    this.cartService.cartDataObservable.subscribe(data => this.cartData = data);

  }
  onCheckout(){
    this.spinner.show();
    this.cartService.checkoutFromCart('5f99369f607eb608e4657cf5').subscribe((result:{order:SingleOrderResponse,total:number})=>{
      const navigationExtras:NavigationExtras ={
      state:{
              message:"Order Placed Successfully",
              order:result.order,
              total:result.total

            }
      };
      this.router.navigate(['/thankyou'],navigationExtras).then((p)=>{
        this.spinner.hide();
        });




    });

  }

}
