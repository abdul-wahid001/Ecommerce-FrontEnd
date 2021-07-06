import { CartService } from '../../services/cart.service';

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SingleOrderResponse } from 'src/app/models/Order.model';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent implements OnInit {
  message:string;
  order: SingleOrderResponse
  cartTotal:number;


  constructor(private router:Router, private cartService:CartService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {
      message: string,
      order: SingleOrderResponse
      total:number
    };
    console.log(state);
    this.message = state.message;
    this.order = state.order;
    this.cartTotal = state.total;


   }

  ngOnInit(): void {

  }

}
