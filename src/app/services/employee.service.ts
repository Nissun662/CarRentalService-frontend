import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  api: string = 'http://localhost:8080/api/v1/employees';

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  login(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.api}/employee/login`, employee, this.httpOptions);
  }



}
