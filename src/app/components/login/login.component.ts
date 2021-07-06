import { AuthSerivce } from '../../services/auth.service';

import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor( private router: Router,private spinner:NgxSpinnerService,private toast:ToastrService, private authService:AuthSerivce){}
  ngOnInit(): void {
  }
  onSubmit(form: NgForm){
    if (!form.valid){

        return;
    }
    this.spinner.show();

    const email = form.value.email;
    const password = form.value.password;
    const name  = form.value.name;
    this.authService.login(email, password).subscribe(result=>{
      console.log(result);
      this.spinner.hide();
      this.router.navigate(['/']);
    }, errorResp=>{
      console.log(errorResp);
      this.spinner.hide();
      this.toast.error(errorResp,'Error',{
        timeOut:1500,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-top-right'
      });

    });

  }
  onSwithMode(){

    this.router.navigate(['/register-user']);
  }
  signInWithGoogle(){
   // this.authService.GoogleAuth();
  }
}
