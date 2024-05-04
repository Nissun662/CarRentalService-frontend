import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api: string = 'http://localhost:8080/api/v1/user/logins';

  httpOptions = {
    headers: new HttpHeaders({
      'Contetn-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  login(user: User): Observable<User> {
    return this.http.post<User>(this.api, user, this.httpOptions)
  }
}
