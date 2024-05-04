import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-customer-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-customer-details.component.html',
  styleUrls: ['./edit-customer-details.component.scss']
})
export class EditCustomerDetailsComponent implements OnInit {

  customerId: number;
  customer: Customer | null = null;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    // Retrieve the user ID from the route parameters
    this.route.params.subscribe(params => {
      this.customerId = +params['id'];
      // Use the user ID to fetch the customer details
      this.customerService.getCustomerById(this.customerId).subscribe((customer: Customer) => {
        this.customer = customer;
      });
    });
  }

  saveCustomer(): void {
    this.customerService.updateCustomer(this.customerId, this.customer).subscribe(() => {
      // Assuming you want to navigate back to the customer vehicle list
      alert("Details updated successfully.")
      this.router.navigate(['/list']);
    });
  }
}
