import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from '../../models/vehicle';

@Component({
  selector: 'app-new-vehicle',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './new-vehicle.component.html',
  styleUrl: './new-vehicle.component.scss'
})
export class NewVehicleComponent implements OnInit{

  newVehicleForm: FormGroup;
  vehicleId: number;

  constructor(private formBuilder: FormBuilder,
    private vehicleService: VehicleService,
  private route: ActivatedRoute,
private router: Router) {}

  ngOnInit(): void {
    this.newVehicleForm = this.formBuilder.group({
      make: [''],
      model: [''],
      year: [''],
      vehicleType: [''],
      mileage: [''],
      pricePerDay: ['']
    });

    this.vehicleId = parseInt(this.route.snapshot.paramMap.get('id'));
    if(this.vehicleId) {  // Only for vehicel Edit
      this.vehicleService.getVehicleById(this.vehicleId).subscribe((vehicleData: Vehicle) => {
        this.newVehicleForm.patchValue(vehicleData)
      })
    }
  }

  saveVehicle(): void{
    const vehicleData = this.newVehicleForm.value;

    if(this.vehicleId){    
      this.vehicleService.updateVehicle(this.vehicleId, vehicleData).subscribe((result: string) => {
        alert(result);
        this.router.navigate(['vechile-list']);
      })
    } else {
    this.vehicleService.saveVehicle(vehicleData).subscribe((result: string) => {
      alert(result);
    })
  }
  }

}
