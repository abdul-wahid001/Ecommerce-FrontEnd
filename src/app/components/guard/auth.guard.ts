import { map, take } from 'rxjs/operators';
import { AuthSerivce } from '../../services/auth.service';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthSerivce, private router:Router){}
    canActivate(route:ActivatedRouteSnapshot, router: RouterStateSnapshot):boolean|Promise<boolean|UrlTree> | Observable<boolean |UrlTree>| UrlTree {

        return  this.authService.user.pipe(take(1),map(user=>{
            const isAuth= !!user;
            if(isAuth){
                return true;
            }
            return this.router.createUrlTree(['/login']);
        }));

    }


}
