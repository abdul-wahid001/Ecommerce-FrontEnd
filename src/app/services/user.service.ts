import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) { }
  addUser(user:User){
    console.log("user service");
    console.log(user);
    return this.http.post(`${this.SERVER_URL}/users/new`,{
      User:user
    });
  }
}

