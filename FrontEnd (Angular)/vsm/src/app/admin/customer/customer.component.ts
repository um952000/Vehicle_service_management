import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from '../../model/customer';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  allCustomers: Customer[] = [];
  upCustomer: Customer | undefined;
  isEdit: boolean = false;
  Create: boolean = false;
  Search_id: number;
  search: number = 2;

  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
    //this.allCustomers=this.customerService.getAllCustomers();
    this.customerService.getAllCustomers().subscribe(
      {
        next:response => {this.allCustomers=response;}
        ,
      
        error:err=>{alert("Failed To Access Data "+JSON.stringify(err));}
      }
    );
   
   
  }

  create() {
    this.search = 2;
    this.Search_id = null;
    this.Create = true;
  }

  submit(form: NgForm) {
    let customer: Customer = {
      customerID: form.value.customerId,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      phone: form.value.phone,
      email: form.value.email,
      address: form.value.address
    };
    //this.customerService.createCustomer(customer);
    this.customerService.createCustomer(customer).subscribe(
      {
        next:response=>{alert("Customer is created Successfully");},
        error:err=>{alert("Failed To Create Data "+JSON.stringify(err));}
      }
    )
    this.Create = false;
  }

  delete(id: number) {
    this.search = 2;
    this.Search_id = null;
    //this.customerService.deleteCustomerById(id);
    this.customerService.deleteCustomerById(id).subscribe(
      {
        next:response=>{alert("deleted Successfully");}
        ,
        error:err=>{alert("Failed To Delete Data "+JSON.stringify(err));}
      }
    )
  }

  update(id: number) {
    this.search = 2;
    this.Search_id = null;
    this.isEdit = !this.isEdit;
    if (this.isEdit) {
      this.upCustomer = this.getCustomerById(id);
    } else {
      
      //this.customerService.updateCustomer(this.upCustomer);
      this.customerService.updateCustomer(this.upCustomer).subscribe(
        {
          next:response=>{alert("Updated Successfully");}
          ,
          error:err=>{alert("Failed To Update Data "+JSON.stringify(err));}
        }
      );
    }
  }

  getCustomerById(id: number): Customer {
    return this.allCustomers.find(customer => customer.customerID === id);
  }

  Search() {
    //this.upCustomer = this.customerService.getCustomerById(this.Search_id);
    this.customerService.getCustomerById(this.Search_id).subscribe({
      next:response=>{this.upCustomer=response;}
      ,
      error:err=>{alert("Failed To Access Data "+JSON.stringify(err));}
    });
    this.search = this.upCustomer ? 0 : 1;
  }

  close() {
    this.search = 2;
    this.Search_id = null;
  }
}
