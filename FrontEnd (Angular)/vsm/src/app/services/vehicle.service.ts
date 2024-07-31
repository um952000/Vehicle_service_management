import { Injectable } from '@angular/core';
import { Vehicle } from '../model/vehicle';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private httpClient: HttpClient) { }

  getAllVehicles(): Observable<Vehicle[]> {
    let url = "http://localhost:5149/api/VehicleAPI";
    return this.httpClient.get<Vehicle[]>(url);
  }

  createVehicle(vehicle: Vehicle): Observable<Vehicle> {
    vehicle.vehicleID = this.getRandomTaskId();
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    let url = "http://localhost:5149/api/VehicleAPI";
    return this.httpClient.post<Vehicle>(url, vehicle, {headers});
  }

  deleteVehicleById(id: number): Observable<any> {
    let url = `http://localhost:5149/api/VehicleAPI/${id}`;
    return this.httpClient.delete<any>(url);
  }

  getVehicleById(id: number): Observable<Vehicle> {
    let url = `http://localhost:5149/api/VehicleAPI/${id}`;
    return this.httpClient.get<Vehicle>(url);
  }

  updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    let url = "http://localhost:5149/api/VehicleAPI";
    return this.httpClient.put<Vehicle>(url, vehicle, {headers});
  }

  private getRandomTaskId(): number {
    const characterSet = "0123456789";
    let result = "";
    for (let i = 0; i < 4; i++) {
      result += characterSet.charAt(Math.floor(Math.random() * characterSet.length));
    }
    return parseInt(result, 10);
  }
 
}
