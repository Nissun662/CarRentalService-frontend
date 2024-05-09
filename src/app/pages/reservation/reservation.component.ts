import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Reservation } from '../../models/reservation';
import { ReservationService } from '../../services/reservation.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router} from '@angular/router';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [DatePipe],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent implements OnInit {

  reservationForm: FormGroup;

  vehicleId: number;
  customerId: string;
  customerEmail: string;
  customerFullName: string;

  constructor(private datepipe: DatePipe,
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private router: Router
    
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.vehicleId = params['vehicleId'];
      const cusId = params['cusId'];
      const fullName = params['fullName'];
      const email = params['email'];
      const make = params['make'];
      const model = params['model'];
      const year = params['year'];
      const vehicleType = params['vehicleType'];
      const mileage = params['mileage'];
      const pricePerDay = params['pricePerDay'];
      if (fullName && email) {
          this.reservationForm = this.formBuilder.group({
              reservationStartDate: [''],
              noOfDays: [''],
              reservationEndDate: [''],
              customer: this.formBuilder.group({
                  cusId: [cusId],
                  fullName: [fullName],
                  email: [email]
              }),
              vehicle: this.formBuilder.group({
                  vehicleId: [this.vehicleId],
                  make: [make],      
                  model: [model],     
                  year: [year],      
                  vehicleType: [vehicleType], 
                  mileage: [mileage], 
                  pricePerDay: [pricePerDay] 
              }),
              payment: this.formBuilder.group({
                  creditCardNumber: [''],
                  expiration: [''],
                  cvv: ['']
              })
          });
      }
  });
  
  if (!this.reservationForm) {
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
      
    this.reservationForm.get('reservationStartDate').valueChanges.subscribe(() => {
        this.updateEndDate();
    });

    this.reservationForm.get('noOfDays').valueChanges.subscribe(() => {
        this.updateEndDate();
    });
}

private updateEndDate(): void {
  const startDate = this.reservationForm.get('reservationStartDate').value;
  const noOfDays = this.reservationForm.get('noOfDays').value;

  if (startDate && noOfDays) {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + noOfDays);
    const formattedEndDate = this.datepipe.transform(endDate, 'yyyy-MM-dd');
    this.reservationForm.get('reservationEndDate').patchValue(formattedEndDate);
  }
}

submitReservation(): void {
  if (this.reservationForm.valid) {
    const reservationData: Reservation = this.reservationForm.value;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.reservationService.saveReservation(reservationData, headers).subscribe((result: string) => {
        alert('Reservation saved successfully!');
        this.router.navigate(['list']); // Navigate to vehicle list page
      },
      (error: any) => {
        console.error(error);
        alert('Failed to save reservation.');
      }
    );
    console.log(reservationData);
  } else {
    alert('Please fill in all required fields.');
  }
 }
}



