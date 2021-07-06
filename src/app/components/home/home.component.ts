import { CartService } from '../../services/cart.service';
import { ServerAllProductsResponse } from './../../models/product.model';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products:Product[] = [];
  totalProducts: number;
  currentPage:number;
  limit:number;
  pagination: {
    next: {
      page: number,
      limit: number
    },
    prev: {
      page: number,
      limit: number
    }
  };


  constructor(private productService: ProductService, private router:Router, private route:ActivatedRoute, private cartService:CartService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.productService.getAllProducts().subscribe((prods: ServerAllProductsResponse) =>{
      this.pagination = prods.pagination;
      this.totalProducts = prods.count;
      this.products = prods.data;
      this.currentPage = this.pagination.next ? this.pagination.next.page - 1: this.pagination.prev.page -1;
      this.limit =  this.pagination.next ? this.pagination.next.limit: this.pagination.prev.limit;

      this.spinner.hide();
    },(err)=>{
      console.log(err);
      this.spinner.hide();
    });
  }

  onAddToCart(id:number){
    this.cartService.addProductToCart(id);


  }
  onProductSelect(id:number){
    this.router.navigate(['product',id],{'relativeTo':this.route});

  }
  handlePageChange(event):void{
     this.currentPage = event;

    this.spinner.show();
    this.productService.getAllProducts(this.limit,this.currentPage).subscribe((prods: ServerAllProductsResponse) =>{
      this.pagination = prods.pagination;
      this.totalProducts = prods.count;
      this.products = prods.data;
      this.limit =  this.pagination.next ? this.pagination.next.limit: this.pagination.prev.limit;
      this.spinner.hide();
    },(err)=>{
      console.log(err);
      this.spinner.hide();
    });
    // this.retrieveTutorials();

  }

}
