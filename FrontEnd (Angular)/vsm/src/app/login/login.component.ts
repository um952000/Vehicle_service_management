import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../model/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  msg:string="";
  constructor (private authServices:AuthService,private router:Router){}
  onLoginFormSubmit(userForm:NgForm){
    let user:Login={
      userid: userForm.value.userid,
      //userEmail: userForm.value.email,
      password: userForm.value.password
    };
    if(this.authServices.loginTheUser(user))
      {//this.router.navigate(["/dashboard"]);
        this.msg="";
        console.log("Good");}
    else
    {this.msg="Please Check Your Credential";}
  
  }
}
