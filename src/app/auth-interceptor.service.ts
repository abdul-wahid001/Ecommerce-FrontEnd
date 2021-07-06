
import { AuthSerivce } from './services/auth.service';
import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpParams} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';
@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

    constructor(private authService: AuthSerivce){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler){
        return this.authService.user.pipe(take(1),exhaustMap( user =>{
            if(!user){
                return next.handle(req);
            }
            let modifiedReq = req.clone({ setHeaders: { Authorization: `Bearer ${user.token}` } });
             return next.handle(modifiedReq);
        }));
    }
}
