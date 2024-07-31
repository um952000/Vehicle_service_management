import { Injectable } from '@angular/core';
import { BillOfMaterial } from '../model/billof-material';
import { Vehicle } from '../model/vehicle';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillofmaterialService {
  private apiUrl = 'http://localhost:5149/api/BillOfMaterialAPI'; // Update this URL to match your API endpoint

  constructor(private http: HttpClient) { }

  // Get all BillOfMaterials
  getAllBillOfMaterials(): Observable<BillOfMaterial[]> {
    return this.http.get<BillOfMaterial[]>(this.apiUrl);
  }

  // Get BillOfMaterial by ID
  getBillOfMaterialById(id: number): Observable<BillOfMaterial> {
    return this.http.get<BillOfMaterial>(`${this.apiUrl}/${id}`);
  }

  // Get BillOfMaterials by Service Record ID
  getBillOfMaterialsByServiceRecordId(id: number): Observable<BillOfMaterial> {
    return this.http.get<BillOfMaterial>(`${this.apiUrl}/GetByServiceRecordId/${id}`);
  }

  // Create a new BillOfMaterial
  createBillOfMaterial(billOfMaterial: BillOfMaterial): Observable<BillOfMaterial> {
    billOfMaterial.billOfMaterialID=this.gtRandomTaskId();
    return this.http.post<BillOfMaterial>(this.apiUrl, billOfMaterial);
  }

  // Update an existing BillOfMaterial
  updateBillOfMaterial(billOfMaterial: BillOfMaterial): Observable<BillOfMaterial> {
   
    return this.http.put<BillOfMaterial>(this.apiUrl, billOfMaterial);
  }

  // Delete a BillOfMaterial by ID
  deleteBillOfMaterial(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  gtRandomTaskId():number {
    const characterSet="0123456789";
    let result="";
    for(let i=0;i<3;i++){
      result+=characterSet.charAt(Math.floor(Math.random()*characterSet.length));
    }
    return parseInt(result,10);
  }
/*
  allBill:BillOfMaterial[]=[
    {
      billOfMaterialID: 1,
      serviceRecordID: 1,
     // workItemID: 1,
      amount:0
    },
    {
      billOfMaterialID: 2,
      serviceRecordID: 2,
      //workItemID: 2,
      amount: 1
    }
  ];

  constructor() { }
  getAllBillOfMaterials():BillOfMaterial[]{
    return this.allBill;
  }
  getBillOfMaterialById(id:number):BillOfMaterial{
   let bill:BillOfMaterial;
    for(let i=0;i<this.allBill.length;i++){
      if(this.allBill[i].billOfMaterialID==id)
       {
        bill=this.allBill[i];break;
       }
    }
    return bill;
  }
  getBillOfMaterialBySRId(id:number):BillOfMaterial{
    let bill:BillOfMaterial;
     for(let i=0;i<this.allBill.length;i++){
       if(this.allBill[i].serviceRecordID==id)
        {
         bill=this.allBill[i];break;
        }
     }
     return bill;
   }
 /* createVehicle(vehicle:Vehicle){
    vehicle.vehicleID=this.gtRandomTaskId();
    this.allVehicles.push(vehicle);
  }
    */
 /* deleteBillOfMaterialById(id:number){
    for(let i=0;i<this.allBill.length;i++){
      if(this.allBill[i].billOfMaterialID==id)
       { this.allBill.splice(i,1);
        break;
       }
    }
  }
 /* updateVehicle(vehicle:Vehicle){
    for(let i=0;i<this.allVehicles.length;i++){
      if(this.allVehicles[i].vehicleID==vehicle.vehicleID){
        this.allVehicles[i]=vehicle;break;
      }
  }
      
  }
  *//*
  gtRandomTaskId():number {
    const characterSet="0123456789";
    let result="";
    for(let i=0;i<3;i++){
      result+=characterSet.charAt(Math.floor(Math.random()*characterSet.length));
    }
    return parseInt(result,10);
  }
  create(bill:BillOfMaterial){
    this.allBill.push(bill);
  }
  update(bill:BillOfMaterial){
    for(let i=0;i<this.allBill.length;i++){
      if(this.allBill[i].serviceRecordID==bill.serviceRecordID){
        this.allBill[i].amount=bill.amount;break;
      }
    }
    console.log(this.allBill);
  }
  */
}
