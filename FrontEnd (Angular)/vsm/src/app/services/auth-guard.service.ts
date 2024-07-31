import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
 
  constructor(private authService:AuthService,private router:Router,private ar:ActivatedRoute) { }
   
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any 
    {
      const fullUrl = state.url;
      let url:string[]=fullUrl.split('/');
      if(url[1]==="admin")
      {
        if(this.authService.isAdminToken())return true;
        else alert("Login with Admin I'd");
      }  
      else{
       if(this.authService.isServiceToken(url[2]))
     {
        console.log(url[4]);
        if(url[4]!=undefined && url[3]!='work-item')
        {
        console.log(url[4]);
        if(this.authService.isServiceToken(url[4]))return true;
        else alert("Login with Correct Service Advisor I'd to Access it's respective dashboard");
        this.router.navigate(["/login"]);
        return false;
        }
        return true;
        }
      
  }
    this.router.navigate(["/login"]);
      return false;
}}
/*
  constructor(private authService:AuthService,private router:Router,private ar:ActivatedRoute,private http:HttpClient) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any 
    {
      const fullUrl = state.url;
      let url:string[]=fullUrl.split('/');
      if(url[1]==="admin")
      {
        if(this.authService.isAdminToken())return true;
        else alert("Login with Admin I'd");
      }  
      else{
       if(this.authService.isServiceToken(url[2]))
     {
        console.log(url[4]);
        if(url[4]!=undefined && url[3]!='work-item')
        {
        console.log(url[4]);
        if(this.authService.isServiceToken(url[4]))return true;
        else alert("Login with Correct Service Advisor I'd to Access it's respective dashboard");
        this.router.navigate(["/login"]);
        return false;
        }
        return true;
        }
      
  }
    this.router.navigate(["/login"]);
      return false;
}*/

