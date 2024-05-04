import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private router: Router ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      fullName: [''],
      userName: [''],
      password: [''],
      email: [''],
      address: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        zip: [''],
        country: ['']
      })
    })
  }

  signUp() : void {
    const customer = this.signUpForm.value;

    this.customerService.signUp(customer).subscribe((result: string) =>{
      if(result === 'Customer created successfully') {
        alert('success')
        this.router.navigate(['']); //Redirecting to login page
      } else {
        alert('Unable to register user!')
      }
    })
  }





}
