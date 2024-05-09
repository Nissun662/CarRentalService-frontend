import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { Observable, catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  api:string = 'http://localhost:8080/api/v1/reservations'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }


  saveReservation(reservation: Reservation, headers: HttpHeaders): Observable<string>{
    return this.http.post<string>(this.api, reservation, { headers, responseType: 'text' as 'json' });
  }

  getReservation(reservationId: number): Observable<Reservation>{
    return this.http.get<Reservation>(this.api.concat('/').concat(reservationId+''));
  }

  updateReservation(reservationId: number, reservation: Reservation): Observable<string> {
    return this.http.patch<string>(this.api.concat('/').concat(reservationId+ ''), reservation, {responseType: 'text' as 'json'});
  }

  deleteReservation(reservationId: number): Observable<string> {
    return this.http.delete<string>(`${this.api}/${reservationId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 200) {
          return of('Reservation deleted successfully.'); // Return the success message
        }
        return throwError('Failed to delete reservation.'); // Otherwise, throw an error
      })
    );
  }

  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.api)
  }
  


}