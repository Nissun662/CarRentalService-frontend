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
      'Content-Type': 'application/json'
    })
  }
 
  constructor(private http: HttpClient) { }

  login(customer: Customer): Observable<Customer>{
    return this.http.post<Customer>(this.api.concat('/customer/login'), customer, this.httpOptions )
  }

  signUp(customer: Customer): Observable<string>{
    return this.http.post<string>(this.api, customer, {responseType: 'text' as 'json'} )
  }

  updateCustomer(id: number, customer: Customer): Observable<string> {
    return this.http.patch<string>(this.api.concat('/').concat(id+ ''), customer, {responseType: 'text' as 'json'});
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(this.api + '/' + id);
  }

  // getCustomerById(id: string): Observable<Customer> {
  //   return this.http.get<Customer>(`${this.api}/${id}`);
  // }
  
}
