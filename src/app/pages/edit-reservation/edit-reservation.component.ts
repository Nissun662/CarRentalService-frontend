import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../models/reservation';

@Component({
  selector: 'app-edit-reservation',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.scss']
})
export class EditReservationComponent implements OnInit {

  reservationForm: FormGroup;
  reservationId: number;
  reservation: Reservation;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const reservationId = params['reservationId'];
      if (reservationId) {
        this.reservationService.getReservation(reservationId).subscribe((reservation) => {
          this.reservation = reservation;
          this.reservationForm.patchValue(reservation);
        });
      }
    });

    this.reservationForm = this.formBuilder.group({
      reservationStartDate: [''],
      noOfDays: [''],
      reservationEndDate: [''],
      customer: this.formBuilder.group({
        cusId: [''],
        fullName: [''],
        email: ['']
      }),
      vehicle: this.formBuilder.group({
        vehicleId: [''],
        make: [''],
        model: [''],
        year: [''],
        vehicleType: [''],
        mileage: [''],
        pricePerDay: ['']
      }),
      payment: this.formBuilder.group({
        creditCardNumber: [''],
        expiration: [''],
        cvv: ['']
      })
    });
  }

  submitReservation(): void {
    if (this.reservationForm.valid && this.reservation && !isNaN(this.reservation.reservationId)) {
      const reservationData: Reservation = this.reservationForm.value;
      this.reservationService.updateReservation(this.reservation.reservationId, reservationData).subscribe(() => {
        alert('Reservation updated successfully!');
        this.router.navigate(['/list']); // Navigate to reservation list page
      }, (error) => {
        console.error(error);
        alert('Failed to update reservation.');
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }
}  

