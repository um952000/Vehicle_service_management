import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navlog',
  templateUrl: './navlog.component.html',
  styleUrl: './navlog.component.css'
})
export class NavlogComponent implements OnInit {
  isLoggedIn = false;
  constructor(private router:Router){}
  ngOnInit(): void {
    this.isLoggedIn=JSON.parse(localStorage.getItem("isLogin"));
  }
  toggleLogin() {
    this.isLoggedIn = !this.isLoggedIn;
    localStorage.setItem("isLogin",JSON.stringify(this.isLoggedIn));
    if(this.isLoggedIn){
      this.router.navigate(["/login"]);
      
    }
    else{
      //de allocated the token
      localStorage.clear();
      this.router.navigate(["/"]);
    }
  }
}
