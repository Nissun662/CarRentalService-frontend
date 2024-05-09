import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../models/vehicle';
import { VehicleService } from '../../services/vehicle.service';
import { Router, RouterLink } from '@angular/router';
import { Customer } from '../../models/customer';
import { FormGroup, FormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Reservation } from '../../models/reservation';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-cust-vehicle-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cust-vehicle-list.component.html',
  styleUrl: './cust-vehicle-list.component.scss'
})
export class CustVehicleListComponent implements OnInit{

  reservationForm: FormGroup;

  vehicleList: Vehicle[] = [];
  customerFullName: string;
  customerEmail: string;
  cusId: number;
  reservation: Reservation;
  reservationId: number;

  

  constructor(private vehicleService: VehicleService,
    private router: Router,
    private customerService: CustomerService,
    private reservationService: ReservationService) {}

  ngOnInit(): void {
    // Fetch vehicle list
    this.vehicleService.getVehicleList().subscribe((vehicleList: Vehicle[]) => {
      this.vehicleList = vehicleList;
    });
  
 // Fetch customer details only if localStorage is available
 if (typeof localStorage !== 'undefined') {
  const userId = localStorage.getItem('userId');
  if (userId) {
    this.customerService.getCustomerById(parseInt(userId)).subscribe((customer) => {
      this.customerFullName = customer.fullName;
      this.customerEmail = customer.email;

      // Fetch the current reservation of the customer
      this.reservationService.getReservation(parseInt(userId)).subscribe((reservations) => {
        // Assuming there's only one reservation per customer
        this.reservation = reservations;
        localStorage.setItem('reservationId', this.reservation.reservationId.toString());
      }, (error) => {
        console.error(error);
        //alert('Failed to fetch reservation.');
      });

    });
  }
}
}
  

  editCustomerDetails(): void {
    const userId = localStorage.getItem('userId');
    this.router.navigate(['/edit-customer', userId]);
  }

  reserve(vehicleId: number): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('User ID not found');
        return;
    }

    const userIdNumber = parseInt(userId, 10); // Convert userId to number

    this.customerService.getCustomerById(userIdNumber).subscribe((customer: Customer) => {
        this.customerFullName = customer.fullName;
        this.customerEmail = customer.email;
        this.cusId = customer.cusId;

        const vehicle = this.vehicleList.find(v => v.vehicleId === vehicleId);

        if (!vehicle) {
            alert('Vehicle not found');
            return;
        }

        if (vehicle.status.toString() !== 'AVAILABLE') {
            alert('Vehicle not available for reservation!');
            return;
        }

        this.router.navigate(['/reservation'],
         { queryParams: { 
          vehicleId: vehicle.vehicleId, 
          fullName: this.customerFullName,
          email: this.customerEmail,
          cusId: this.cusId,
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          vehicleType: vehicle.vehicleType,
          mileage: vehicle.mileage,
          pricePerDay: vehicle.pricePerDay 
        } 
      });
    });

}

editReservation(reservationId: number): void {
  this.router.navigate(['/edit-reservation'], {queryParams: {reservationId: reservationId}});
 }

 deleteReservation(): void {
  if (!this.reservation || !this.reservation.reservationId) {
    alert('No reservation to delete');
    return;
  }

  const reservationId = this.reservation.reservationId; // Get the reservation ID

  this.reservationService.deleteReservation(reservationId).subscribe(() => {
    alert('Reservation deleted successfully!');
    // Reload the page or fetch the updated reservation list
  }, (error) => {
    console.error(error);
    alert('Failed to delete reservation.');
  });
}

}
