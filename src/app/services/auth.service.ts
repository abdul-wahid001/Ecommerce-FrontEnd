import { environment } from './../../environments/environment';
import { User } from '../models/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';

export interface AuthResponseData{
    idToken: string,
    success: string,
    expires: string
}
@Injectable({providedIn:'root'})
export class AuthSerivce {
  serverUrl:string = environment.SERVER_URL;

  user = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any;
  constructor(private http: HttpClient, private router: Router) {

  }
  signUp(email:string, password:string, name:string){
      return this.http.post<AuthResponseData>(`${this.serverUrl}/auth/register`,
      {
          email,
          password,
          name

      }).pipe(catchError(this.handleError),tap(resData=>{
          this.handleAuthentication(resData.idToken,resData.expires);
      }));

  }
  login(email: string, password: string){

      return this.http.post<AuthResponseData>(`${this.serverUrl}/auth/login`,
      {
          email,
          password
      }).pipe(catchError(this.handleError),tap(resData=>{
          this.handleAuthentication(resData.idToken,resData.expires)
      }));
  }
  logout(){
    console.log('logout called');
      this.user.next(null);
      localStorage.removeItem('userData');
      this.router.navigate(['/login']);
      if(this.tokenExpirationTimer){
          clearTimeout(this.tokenExpirationTimer);
      }
      this.tokenExpirationTimer = null;
  }
  autoLogOut(expirationDuration:number){
      this.tokenExpirationTimer = setTimeout(()=>{

          this.logout();
      },expirationDuration);
  }
  autoLogin(){
      const userData:{
          _token: string,
          _tokenExpirationDate: string
      } = JSON.parse(localStorage.getItem('userData'));
      if(!userData){
          return;
      }
      const loadedUser = new User(userData._token,new Date(userData._tokenExpirationDate));


      if(loadedUser.token){

          this.user.next(loadedUser);
          const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
          this.autoLogOut(expirationDuration);

      }
  }
  private handleAuthentication ( token : string , expire: string){
      const expirationDate = new Date(expire );
      const user = new User(token,expirationDate);
      this.user.next(user);
      const expirationDuration = new Date(expirationDate).getTime() - new Date().getTime();
      this.autoLogOut(expirationDuration);
      localStorage.setItem('userData', JSON.stringify(user));



  }
  private handleError (errorRes: HttpErrorResponse){
    console.log(errorRes);
      let errorMessage = 'Something went wrong !';
      if(!errorRes.error || !errorRes.error.error){
          return throwError(errorMessage);
      }

      errorMessage = errorRes.error.error;
      // switch (errorRes.error.error.message) {
      //     case 'EMAIL_EXISTS':
      //         errorMessage = 'This email already exists';
      //         break;
      //     case 'EMAIL_NOT_FOUND':
      //         errorMessage = 'Email does not exists';
      //         break;
      //     case 'INVALID_PASSWORD':
      //         errorMessage = 'Incorrect Password';
      //         break;
      //     case 'USER_DISABLED':
      //         errorMessage = 'This user is disabled';
      //         break;
      //     default:
      //         break;
      // }
      return throwError(errorMessage);


  }
}
