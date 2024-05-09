import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../models/reservation';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-reservation',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [DatePipe],
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.scss']
})
export class EditReservationComponent implements OnInit {

  reservationForm: FormGroup;
  reservationId: number;
  reservation: Reservation;
  totalPrice: number;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private router: Router,
    private datepipe: DatePipe
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const reservationId = +params['reservationId'];  // + added here 
      if (reservationId) {
        this.reservationService.getReservation(reservationId).subscribe((reservation) => {
          this.reservation = reservation;
          this.reservationForm.patchValue(reservation);
          this.updateEndDate();
        });
      }
    });

    this.reservationForm = this.formBuilder.group({
      reservationStartDate: [''],
      noOfDays: [''],
      reservationEndDate: [''],
      totalPrice: [''],
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

    this.reservationForm.get('reservationStartDate').valueChanges.subscribe(() => {
      this.updateEndDate();
    });

    this.reservationForm.get('noOfDays').valueChanges.subscribe(() => {
      this.updateEndDate();
    });

    this.reservationForm.get('vehicle.pricePerDay').valueChanges.subscribe(() => {
      this.updateEndDate();
    });
  }

  submitReservation(): void {
    if (this.reservationForm.valid && this.reservation && !isNaN(this.reservation.reservationId)) {
      const reservationData: Reservation = this.reservationForm.value;
      reservationData.totalPrice = this.totalPrice; // Add total price to the reservation data
      this.reservationService.updateReservation(this.reservation.reservationId, reservationData).subscribe(() => {
        alert('Reservation updated successfully!');
  
        const userRole = localStorage.getItem('role'); // Use 'role' as the key
        console.log(userRole);
        if (userRole === 'EMPLOYEE') {
          this.router.navigate(['/vehicle-list']);
        } else {
          this.router.navigate(['/list']); // Navigate to reservation list page
        }
      }, (error) => {
        console.error(error);
        alert('Failed to update reservation.');
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }
  
  
  
  

  updateEndDate(): void {
    //console.log('Updating end date...');
    const startDate = this.reservationForm.get('reservationStartDate').value;
    const noOfDays = this.reservationForm.get('noOfDays').value;
  
    //console.log('Start Date:', startDate);
    //console.log('No of Days:', noOfDays);
  
    if (startDate && noOfDays) {
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + noOfDays);
      const formattedEndDate = this.datepipe.transform(endDate, 'yyyy-MM-dd');
      //console.log('End Date:', formattedEndDate);
      this.reservationForm.get('reservationEndDate').patchValue(formattedEndDate);
  
      const pricePerDay = this.reservationForm.get('vehicle.pricePerDay').value;
      //console.log('Price Per Day:', pricePerDay);
      const totalPrice = noOfDays * pricePerDay;
      //console.log('Total Price:', totalPrice);
      this.reservationForm.get('totalPrice').patchValue(totalPrice);
    }
  }  
}

