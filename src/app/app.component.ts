import { AuthSerivce } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { take, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuth:boolean =false;
  ngOnInit(): void {
    this.authService.autoLogin();
    this.authService.user.pipe(take(1),tap(user=>{
      this.isAuth= !!user;
    })).subscribe(_=>{});

  }
  onActivate(e, outlet){
    outlet.scrollTop = 0;
  }
  constructor(private authService:AuthSerivce){}
  title = 'Instant Shop';
}
