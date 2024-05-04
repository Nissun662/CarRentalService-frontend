import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  api: string = 'http://localhost:8080/api/v1/vehicles'

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : {
      'Content-type': 'application/json'
    }
  }

  saveVehicle(vehicle: Vehicle): Observable<string> {
    return this.http.post<string>(this.api, vehicle, {responseType: 'text' as 'json'});
  }

  getVehicleList(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.api, this.httpOptions);
  }

  deleteVehicle(id: number): Observable<string> {
    return this.http.delete<string>(this.api.concat('/').concat(id+''), {responseType: 'text' as 'json'});
  }

  getVehicleById(vehicleId: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(this.api.concat('/').concat(vehicleId+''));
  }

  updateVehicle(vehicleId: number, vehicle: Vehicle): Observable<string> {
    return this.http.patch<string>(this.api.concat('/').concat(vehicleId+''), vehicle, {responseType: 'text' as 'json'});
  }

  
}
