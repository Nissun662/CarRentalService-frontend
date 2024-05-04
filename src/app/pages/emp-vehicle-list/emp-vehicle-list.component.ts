import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../../models/vehicle';
import { VehicleService } from '../../services/vehicle.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-emp-vehicle-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './emp-vehicle-list.component.html',
  styleUrl: './emp-vehicle-list.component.scss'
})
export class EmpVehicleListComponent implements OnInit{

  vehicleList: Vehicle[] = [];

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.getAllVehicles();
  }

  getAllVehicles(): void{
    this.vehicleService.getVehicleList().subscribe((vehicleList: Vehicle[]) => {
      console.log(vehicleList); //coment later
      this.vehicleList = vehicleList;
    });
  }
  
  deleteVehicle(vehicleId: number): void {
    this.vehicleService.deleteVehicle(vehicleId).subscribe((result: string) => {
      if(result === 'Vehicle deleted successfully') {
        alert('Vehicle deleted successfully');
        this.getAllVehicles();
      }
    })
  }
}
