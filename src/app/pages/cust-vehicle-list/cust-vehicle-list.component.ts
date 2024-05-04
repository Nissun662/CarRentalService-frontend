import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Vehicle } from '../../models/vehicle';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-cust-vehicle-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cust-vehicle-list.component.html',
  styleUrl: './cust-vehicle-list.component.scss'
})
export class CustVehicleListComponent {

  vehicleList: Vehicle[] = [];

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    
    this.vehicleService.getVehicleList().subscribe((vehicleList: Vehicle[]) => {
      //console.log(vehicleList);
      this.vehicleList = vehicleList;
    });
    
  }



}
