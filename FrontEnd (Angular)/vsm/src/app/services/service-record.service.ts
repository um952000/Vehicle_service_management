import { Injectable } from '@angular/core';
import { ServiceRecord } from '../model/service-record';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceRecordService {
  private apiUrl = 'http://localhost:5149/api/ServiceRecordAPI';
  allServiceRecords: ServiceRecord[] = [];

  constructor(private http: HttpClient) {}

  getAllServiceRecords(): Observable<ServiceRecord[]> {
    return this.http.get<ServiceRecord[]>(this.apiUrl);
  }
  //for get allservice recor
  uallsr(allsr:ServiceRecord[]){
    this.allServiceRecords=allsr;
  }
  getServiceRecordById(id: number): Observable<ServiceRecord> {
    return this.http.get<ServiceRecord>(`${this.apiUrl}/${id}`);
  }

  createServiceRecord(serviceRecord: ServiceRecord): Observable<ServiceRecord> {
    serviceRecord.serviceRecordID=this.gtRandomTaskId();
    return this.http.post<ServiceRecord>(this.apiUrl, serviceRecord);
  }

  updateServiceRecord(serviceRecord: ServiceRecord): Observable<ServiceRecord> {
    return this.http.put<ServiceRecord>(this.apiUrl, serviceRecord);
  }

  deleteServiceRecord(id: number): Observable<any> {
    return this.http.delete<ServiceRecord>(`${this.apiUrl}/${id}`);
  }


  getAllServiceRecordsBySAId(said: string): ServiceRecord[] {
    return this.allServiceRecords.filter(record => record.serviceAdvisorID === said && record.status === "Under Servicing");
  }

  getServiceRecordByVId(id: number): ServiceRecord | undefined {
    return this.allServiceRecords.find(record => record.vehicleID === id);
  }

  gtRandomTaskId(): number {
    const characterSet = "0123456789";
    let result = "";
    for (let i = 0; i < 4; i++) {
      result += characterSet.charAt(Math.floor(Math.random() * characterSet.length));
    }
    return parseInt(result, 10);
  }
 /* allServiceRecords:ServiceRecord[]=[
    {
      serviceRecordID: 1,
      vehicleID: 1,
      serviceDate: new Date('2024-07-16'),
      serviceAdvisorID: "1",
      status: 'Serviced'
    },
    {
      serviceRecordID: 2,
      vehicleID: 2,
      serviceDate: new Date('2024-07-17'),
      serviceAdvisorID: "2",
      status: 'Under Servicing'
    }
  ];
  constructor() { }
  getAllServiceRecords(){
    return this.allServiceRecords;
  }
  createServiceRecord(sa:ServiceRecord){
    sa.serviceRecordID=this.gtRandomTaskId();
    this.allServiceRecords.push(sa);
    console.log(this.allServiceRecords);
  }
  deleteServiceRecordById(id:number){
    for(let i=0;i<this.allServiceRecords.length;i++){
      if(this.allServiceRecords[i].serviceRecordID==id)
       { this.allServiceRecords.splice(i,1);
        break;
       }
    }
  }
  getServiceRecordById(id:number):ServiceRecord{
    let sa:ServiceRecord;
    for(let i=0;i<this.allServiceRecords.length;i++){
      if(this.allServiceRecords[i].serviceRecordID==id)
       {
         sa=this.allServiceRecords[i];break;
       }  
    }
    return sa;
  }
  updateServiceRecord(sa:ServiceRecord){
    for(let i=0;i<this.allServiceRecords.length;i++){
      if(this.allServiceRecords[i].serviceRecordID==sa.serviceRecordID){
        this.allServiceRecords[i]=sa;
      }
    }
  }
  gtRandomTaskId():number {
    const characterSet="0123456789";
    let result="";
    for(let i=0;i<4;i++){
      result+=characterSet.charAt(Math.floor(Math.random()*characterSet.length));
    }
    return parseInt(result,10);
  }
  getAllServiceRecordsBySAId(said:string):ServiceRecord[]{
    let s:ServiceRecord[]=[];
    for(let i=0;i<this.allServiceRecords.length;i++){
      if(this.allServiceRecords[i].serviceAdvisorID==said && this.allServiceRecords[i].status==="Under Servicing"){
        s.push(this.allServiceRecords[i]);
      }
    }
    return s;
  }
  getServiceRecordByVId(id:number):ServiceRecord{
   let sr:ServiceRecord;
    for(let i=0;i<this.allServiceRecords.length;i++){
      if(this.allServiceRecords[i].vehicleID===id)
      {
        sr=this.allServiceRecords[i];break;
      }
    }
    
    return sr;
  }
 */
}
