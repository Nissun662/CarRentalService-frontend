import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../models/vehicle';
import { VehicleService } from '../../services/vehicle.service';
import { Router, RouterLink } from '@angular/router';
import { Customer } from '../../models/customer';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-cust-vehicle-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cust-vehicle-list.component.html',
  styleUrl: './cust-vehicle-list.component.scss'
})
export class CustVehicleListComponent implements OnInit{

  vehicleList: Vehicle[] = [];
  customerFullName: string;
  customerEmail: string;
  cusId: number;

  

  constructor(private vehicleService: VehicleService,
    private router: Router,
  private customerService: CustomerService,
private reservationService: ReservationService ) {}

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

editReservation(): void {

  

  this.router.navigate(['/edit-reservation']);
 }

}
