import { Customer } from "./customer";
import { Payment } from "./payment";
import { Vehicle } from "./vehicle";
import { Data } from "@angular/router";

export interface Reservation {
  reservationId: number;
  reservationStartDate: Data; // Use a format like "yyyy-MM-dd"
  noOfDays: number;
  reservationEndDate: Date; // Use a format like "yyyy-MM-dd'T'HH:mm:ss.SSS"
  subTotal: number;
  tax: number;
  totalPrice: number;
  status: string; // Assuming ReservationStatus is a string enum
  customer: Customer; 
  vehicle: Vehicle; 
  payment: Payment;
}

  