import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../models/reservation';
import { ReservationService } from '../../services/reservation.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-emp-edit-reservation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './emp-edit-reservation.component.html',
  styleUrls: ['./emp-edit-reservation.component.scss']
})
export class EmpEditReservationComponent implements OnInit {

  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.getAllReservations();
  }

  getAllReservations(): void {
    this.reservationService.getAllReservations().subscribe((reservations: Reservation[]) => {
      this.reservations = reservations;
      //console.log(this.reservations);
    });
  }

  deleteReservation(reservationId: number): void {
    this.reservationService.deleteReservation(reservationId).subscribe((result: string) => {
      if(result === 'Reservation deleted successfully.') {
        alert('Reservation deleted successfully.');
        this.getAllReservations();
      }
    });
  }

  editReservation(reservationId: number): void {
    this.router.navigate(['/edit-reservation'], { queryParams: {reservationId} });
  }
}
