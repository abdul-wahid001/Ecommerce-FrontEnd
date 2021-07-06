import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthGuard } from './components/guard/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'', component:HomeComponent
  },
  {
    path:'product/:id', component:ProductComponent
  }
  ,
  {
    path:'cart', component:CartComponent,canActivate: [AuthGuard]
  },
  {
    path:'checkout', component:CheckoutComponent,canActivate: [AuthGuard]
  },
  {
    path:'thankyou', component:ThankyouComponent,canActivate: [AuthGuard]
  },
  {
    path:'login', component:LoginComponent
  },
  {
    path:'profile', component:ProfileComponent,canActivate: [AuthGuard]
  },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'register-user', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
