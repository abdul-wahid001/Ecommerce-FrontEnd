import { Product } from '../../models/product.model';
import { map } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

declare let $:any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit {

  id:number;
  product:Product ;//=
  // {
  //   category:'',
  //   description:'',
  //   id:null,
  //   image:'',
  //   images:'',
  //   name:'',
  //   price:null,
  //   quantity:null

  // } ;
  thumbImages:string[]=[];

  @ViewChild('quantity') quantityInput:ElementRef;

  constructor(private productsService:ProductService,
     private cartService:CartService,
     private route:ActivatedRoute,
     private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe((params: Params) =>{
      this.id= params['id'];
      this.productsService.getSingleProduct(this.id).subscribe(prod=>{
        this.product = prod;
        this.spinner.hide();

        if (this.product.images!=null){
          this.thumbImages = this.product.images;

        }
      });

    });
  }

  ngAfterViewInit(){

    // Product Main img Slick
    // $('#product-main-img').slick({
    //   infinite: true,
    //   speed: 300,
    //   dots: false,
    //   arrows: true,
    //   fade: true,
    //   asNavFor: '#product-imgs',
    // });

    // // Product imgs Slick
    // $('#product-imgs').slick({
    //   slidesToShow: 3,
    //   slidesToScroll: 1,
    //   arrows: true,
    //   centerMode: true,
    //   focusOnSelect: true,
    //   centerPadding: 0,
    //   vertical: true,
    //   asNavFor: '#product-main-img',
    //   responsive: [{
    //       breakpoint: 991,
    //       settings: {
    //         vertical: false,
    //         arrows: false,
    //         dots: true,
    //       }
    //     },
    //   ]
    // });

    // // Product img zoom
    // var zoomMainProduct = document.getElementById('product-main-img');
    // if (zoomMainProduct) {
    //   $('#product-main-img .product-preview').zoom();
    // }
  }

  onIncrese(){
    let val = parseInt(this.quantityInput.nativeElement.value);
    if(this.product.quantity>=1){
      val++;
      if(val>this.product.quantity){
        val = this.product.quantity;

      }

    }
    else{
      return;
    }
    this.quantityInput.nativeElement.value = val.toString();

  }

  onDecrease(){
    let val = parseInt(this.quantityInput.nativeElement.value);
    if(this.product.quantity>0){
      val--;
      if(val<=1){
        val = 1;

      }

    }
    else{
      return;
    }
    this.quantityInput.nativeElement.value = val.toString();


  }
  onAddtoCart(id:number){
    this.cartService.addProductToCart(id, this.quantityInput.nativeElement.value);

  }

}
