import { User } from './../../models/user.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(public userService:UserService,private router: Router, private spinner: NgxSpinnerService, private toast:ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    if (!form.valid){

      return;
  }
  this.spinner.show();

  const email = form.value.email;
  const password = form.value.password;

  // this.authService.SignUp(email, password).subscribe(user=>{
  //   const userData: User = {
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: user.displayName,
  //     photoURL: user.photoURL,
  //     emailVerified: user.emailVerified
  //   }
  //   this.userService.addUser(userData).subscribe(response=>{
  //     this.spinner.hide();
  //     this.authService.SendVerificationMail().then(sent=>{
  //       this.router.navigate(['/verify-email-address']);
  //     });
  //   }, errResp=>{
  //     console.log(errResp);
  //     this.spinner.hide();
  //     this.toast.error(errResp.message,'Error',{
  //       timeOut:1500,
  //       progressBar:true,
  //       progressAnimation:'increasing',
  //       positionClass:'toast-top-right'
  //     });

  //   });


  // },errorResp=>{
  //   console.log(errorResp);
  //   this.spinner.hide();
  //   this.toast.error(errorResp.message,'Error',{
  //     timeOut:1500,
  //     progressBar:true,
  //     progressAnimation:'increasing',
  //     positionClass:'toast-top-right'
  //   });


  }
  onSwithMode(){

    this.router.navigate(['/login']);
  }

  signInWithGoogle(){
    //this.authService.GoogleAuth();

  }

}
