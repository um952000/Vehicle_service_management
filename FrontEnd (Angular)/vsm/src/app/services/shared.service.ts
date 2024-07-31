import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private apiUrl = 'http://localhost:5149/api/LoginAPI'; // Update this URL to match your API endpoint
  constructor(private http:HttpClient) { }
   // Get all logins
   getAllLogins(): Observable<Login[]> {
    return this.http.get<Login[]>(this.apiUrl);
  }

  /*// Get login by ID
  getLoginById(id: number): Observable<Login> {
    return this.http.get<Login>(`${this.apiUrl}/${id}`);
  }*/

  // Create a new login
  createLogin(login: Login): Observable<Login> {
    return this.http.post<Login>(this.apiUrl, login);
  }

  // Update an existing login
  updateLogin(login: Login): Observable<Login> {
    return this.http.put<Login>(this.apiUrl, login);
  }

  // Delete a login by ID
  deleteLogin(id: string): Observable<any> {
    return this.http.delete<Login>(`${this.apiUrl}/${id}`);
  }

}
