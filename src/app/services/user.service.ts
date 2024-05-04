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
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  login(user: User): Observable<User> {
    return this.http.post<User>(this.api, user, this.httpOptions)
  }

  // Add a method to get the user ID
  getUserId(): Observable<number> {
    // Assuming you have an API endpoint to get the user ID
    const userIdApi = 'http://localhost:8080/api/v1/user/logins';
    return this.http.get<number>(userIdApi);
}
}
