import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SingleOrderResponse,NewOrderResponse} from '../models/Order.model'
@Injectable({
  providedIn:'root'
})
export class OrderService {
  private serverUrl = environment.SERVER_URL;
  constructor(private http: HttpClient){

  }
  getSingleOrder(orderId:string){
    return this.http.get<SingleOrderResponse>(this.serverUrl+'/orders/'+orderId);
  }
}
