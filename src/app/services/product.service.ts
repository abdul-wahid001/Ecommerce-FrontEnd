import { ServerAllProductsResponse,ServerSingleProductsResponse, Product } from './../models/product.model';
import { environment } from './../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private SERVER_URL = environment.SERVER_URL;
  constructor(private http: HttpClient) { }

  getAllProducts(numberOfResults:number = 10, page:number =1):Observable<ServerAllProductsResponse>{
    return this.http.get<ServerAllProductsResponse>(this.SERVER_URL+'/products',{
      params:{
       limit: numberOfResults.toString(),
       page:page.toString()
      }
    });

  }

  getSingleProduct(id:number):Observable<Product>{
    return this.http.get<ServerSingleProductsResponse>(this.SERVER_URL+'/products/'+id).pipe( map(
      response =>{
      return response.data;
    })
    );
  }
  getProcductsBycategory(category: string):Observable<ServerAllProductsResponse>{
    return this.http.get<ServerAllProductsResponse>(this.SERVER_URL+'products/category/'+category);
  }

}
