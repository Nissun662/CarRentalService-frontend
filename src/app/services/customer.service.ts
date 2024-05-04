import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  api: string = 'http://localhost:8080/api/v1/customers';

  httpOptions = {
    headers: new HttpHeaders({
      'Contetn-Type': 'application/json'
    })
  }
 
  constructor(private http: HttpClient) { }

  login(customer: Customer): Observable<Customer>{
    return this.http.post<Customer>(this.api.concat('/customer/login'), customer, this.httpOptions )
  }

  signUp(customer: Customer): Observable<string>{
    return this.http.post<string>(this.api, customer, {responseType: 'text' as 'json'} )

  }
}
