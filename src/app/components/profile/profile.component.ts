import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  myUser: User;


  constructor(
              private router: Router) {
  }

  ngOnInit(): void {
    //this.authService.user.subscribe(user=>{
      // const userData: User = {
      //   uid: user.uid,
      //   email: user.email,
      //   displayName: user.displayName,
      //   photoURL: user.photoURL,
      //   emailVerified: user.emailVerified
      // };
      // this.myUser = userData;

    }
  // logout(){

  // }

}
