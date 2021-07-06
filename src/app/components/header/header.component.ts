import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/Cart.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartData: Cart;
  cartTotal: number;
  authState: boolean


  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.cartService.cartTotalObservable.subscribe(total=>{
      this.cartTotal = total;
    });
    this.cartService.cartDataObservable.subscribe(cart=>{
      this.cartData = cart;
    });
  }
  onProductDeletefromCart(index:number){
    this.cartService.deleteProductFromCart(index);
  }

}
