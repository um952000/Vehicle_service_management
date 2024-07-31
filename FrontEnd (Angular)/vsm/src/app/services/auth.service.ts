import { Injectable, OnInit } from '@angular/core';
import { Login } from '../model/login';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthGuardService } from './auth-guard.service';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  private loginDB= new Map<string,string>();


  constructor(private router:Router,private http:HttpClient,private sharedServices:SharedService) { 
    this.sharedServices.getAllLogins().subscribe(
      {
        next:res=>{alert("Response of Login is fetched from DB");
          for(let i=0;i<res.length;i++){
            this.loginDB.set(res[i].userid,res[i].password);
            console.log(res[i].userid,' ',res[i].password);
          }

        },
        error:err=>{alert(JSON.stringify(err));}
      }
    )
  }
  ngOnInit(): void {
    
  }


  loginTheUser(user:Login):boolean{
    if(this.loginDB.has(user.userid)){
      if(user.userid==='2468admin'){
        if(user.password===this.loginDB.get(user.userid))//change here
        {localStorage.setItem(user.userid,JSON.stringify(user));
          console.log(user.userid+" "+user);
          this.router.navigate(["/admin/dashboard"]);
          return true;
        }
      }
      else {
        if(user.password===this.loginDB.get(user.userid)){//change here
          localStorage.setItem(user.userid,JSON.stringify(user));
          console.log(user.password+" "+`/service-advisor/${user.userid}/dashboard/${user.userid}`);
          this.router.navigate([`/service-advisor/${user.userid}/dashboard/${user.userid}`]);
          return true;
        }
      }
    }
    return false;
  }
  isAdminToken():boolean{
    let x=localStorage.getItem("2468admin");
    if(x?JSON.parse(x).userid==="2468admin":false)
      return true;
    else return false;
  }
  isServiceToken(id:string):boolean{
    if(localStorage.getItem(id))return true;
    else return false;
  }
  createSA(user:Login){
    if(this.loginDB.has(user.userid)){
      this.sharedServices.updateLogin(user).subscribe(
        {
          next:res=>{alert("Update SA Login Credentials also");}
            ,
            error:err=>{alert(JSON.stringify(err));}
        }
      );
    }
    else{
      this.sharedServices.createLogin(user).subscribe(
        {
          next:res=>{alert("Created SA Login Credentials also");}
            ,
            error:err=>{alert(JSON.stringify(err));}
        }
      );
    }
    this.loginDB.set(user.userid,user.password);//change here
    console.log("created" +this.loginDB);
  }
  deleteSA(id:string){
    this.sharedServices.deleteLogin(id).subscribe(
      {
        next:res=>{alert("Deleted SA Login Credentials also");}
            ,
            error:err=>{alert(JSON.stringify(err));}
      }
    );
    this.loginDB.delete(id);
    console.log("deleted "+this.loginDB);
  }
 /* private loginDB= new Map<string,string>();
  constructor(private router:Router) { 
    this.loginDB.set("2468admin","44668822");
    this.loginDB.set("1","2468");
    this.loginDB.set("2","8642");
    
  }
  loginTheUser(user:Login):boolean{
    if(this.loginDB.has(user.userid)){
      if(user.userid==='2468admin'){
        if(user.password===this.loginDB.get(user.userid))//change here
        {localStorage.setItem(user.userid,JSON.stringify(user));
          console.log(user.userid+" "+user);
          this.router.navigate(["/admin/dashboard"]);
          return true;
        }
      }
      else {
        if(user.password===this.loginDB.get(user.userid)){//change here
          localStorage.setItem(user.userid,JSON.stringify(user));
          console.log(user.password+" "+`/service-advisor/${user.userid}/dashboard/${user.userid}`);
          this.router.navigate([`/service-advisor/${user.userid}/dashboard/${user.userid}`]);
          return true;
        }
      }
    }
    return false;
  }
  isAdminToken():boolean{
    let x=localStorage.getItem("2468admin");
    if(x?JSON.parse(x).userid==="2468admin":false)
      return true;
    else return false;
  }
  isServiceToken(id:string):boolean{
    if(localStorage.getItem(id))return true;
    else return false;
  }
  createSA(user:Login){
    this.loginDB.set(user.userid,user.password);//change here
    console.log("created" +this.loginDB);
  }
  deleteSA(id:string){
    this.loginDB.delete(id);
    console.log("deleted "+this.loginDB);
  }
    */
}
