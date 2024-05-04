import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Vehicle } from '../../models/vehicle';
import { VehicleService } from '../../services/vehicle.service';
import { Router, RouterLink } from '@angular/router';
import { Customer } from '../../models/customer';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cust-vehicle-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cust-vehicle-list.component.html',
  styleUrl: './cust-vehicle-list.component.scss'
})
export class CustVehicleListComponent {

  vehicleList: Vehicle[] = [];
  //customer: any = {}; // Initialize customer object


  constructor(private vehicleService: VehicleService,
    private router: Router ) {}

  ngOnInit(): void {
    
    this.vehicleService.getVehicleList().subscribe((vehicleList: Vehicle[]) => {
      //console.log(vehicleList);
      this.vehicleList = vehicleList;
    });
    
  }

  editCustomerDetails(): void {
    const userId = localStorage.getItem('userId');
    this.router.navigate(['/edit-customer', userId]);

  }

}
