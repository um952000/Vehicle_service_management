import { Injectable } from '@angular/core';
import { Customer } from '../model/customer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  allCustomers:Customer[]=[];
 /* allCustomers:Customer[]=[
    {
      customerID: 1,
      firstName: 'John',
      lastName: 'Doe',
      phone: '123-456-7890',
      email: 'john.doe@example.com',
      address: '123 Main St, Pune'
    },
    {
      customerID: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      phone: '098-765-4321',
      email: 'jane.doe@example.com',
      address: '456 Elm St, Pune'
    }
  ];*/
  constructor(private httpClient:HttpClient) { }
  getAllCustomers():Observable<Customer[]>{
   // return this.allCustomers;
   let url="http://localhost:5149/api/CustomerAPI";
   return this.httpClient.get<Customer[]>(url);
  }
  createCustomer(customer:Customer):Observable<Customer>{
   /* customer.customerID=this.getRandomTaskId();
    this.allCustomers.push(customer);
    */
   customer.customerID=this.getRandomTaskId();
    const headers=new HttpHeaders({'Content-Type':'application/json'});
    let url="http://localhost:5149/api/CustomerAPI";
    alert("Customer id created is :"+customer.customerID);
   return this.httpClient.post<Customer>(url,customer,{headers});

  }
  deleteCustomerById(id:number):Observable<any>{
    /*for(let i=0;i<this.allCustomers.length;i++){
      if(this.allCustomers[i].customerID==id)
       { this.allCustomers.splice(i,1);
        break;
       }
    }
       */
    let url="http://localhost:5149/api/CustomerAPI/"+id;
    return this.httpClient.delete<Customer>(url);
  }
  getCustomerById(id:number):Observable<Customer>{
    /*let customer:Customer;
    for(let i=0;i<this.allCustomers.length;i++){
      if(this.allCustomers[i].customerID==id)
       {
         customer=this.allCustomers[i];break;
       }  
    }
    return customer;
    */
    let url="http://localhost:5149/api/CustomerAPI/"+id;
    return this.httpClient.get<Customer>(url);
  }
  updateCustomer(customer:Customer):Observable<Customer>{
    /*for(let i=0;i<this.allCustomers.length;i++){
      if(this.allCustomers[i].customerID==customer.customerID){
        this.allCustomers[i]=customer;
      }
    }
      */
    const headers=new HttpHeaders({'Content-Type':'application/json'});
    let url="http://localhost:5149/api/CustomerAPI";
   return this.httpClient.put<Customer>(url,customer,{headers});
  }
  getRandomTaskId():number {
    const characterSet="0123456789";
    let result="";
    for(let i=0;i<4;i++){
      result+=characterSet.charAt(Math.floor(Math.random()*characterSet.length));
    }
    return parseInt(result,10);
  }
}
