import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/Cart.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy{
  cartData:Cart;
  cartTotal:number;
  subTotal: number;
  cartDataSubject:Subject<Cart>;
  cartTotalSubject: Subject<number>;




  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.cartDataSubject = this.cartService.cartDataObservable;
    this.cartDataSubject.subscribe((data:Cart)=>{
      this.cartData = data;
    });
    this.cartTotalSubject = this.cartService.cartTotalObservable;
    this.cartTotalSubject.subscribe((total:number)=>{
      this.cartTotal = total;
    });
  }

  onDeleteProductFromCart(index:number){
    this.cartService.deleteProductFromCart(index);
  }
  getSubtotal(index:number){
    return this.cartService.calculateSubTotal(index);
  }
  changeQuantity(index:number, increment:boolean ){
    this.cartService.updateCartItem(index,increment);

  }
  ngOnDestroy(){
    // this.cartDataSubject.unsubscribe();
    // this.cartTotalSubject.unsubscribe();

  }


}
