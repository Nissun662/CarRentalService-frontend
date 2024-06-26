import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { EmpVehicleListComponent } from './pages/emp-vehicle-list/emp-vehicle-list.component';
import { NewVehicleComponent } from './pages/new-vehicle/new-vehicle.component';
import { CustVehicleListComponent } from './pages/cust-vehicle-list/cust-vehicle-list.component';
import { EditCustomerDetailsComponent } from './pages/edit-customer-details/edit-customer-details.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { EditReservationComponent } from './pages/edit-reservation/edit-reservation.component';
import { EmpEditReservationComponent } from './pages/emp-edit-reservation/emp-edit-reservation.component';
//import { ReservationComponent } from './pages/reservation/reservation.component';
//import { UpdateUserDetailsComponent } from './pages/update-user-details/update-user-details.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'signup', component:SignupComponent},
    {path: 'vehicle-list', component: EmpVehicleListComponent},
    {path: 'new', component: NewVehicleComponent},
    {path: 'list', component: CustVehicleListComponent},
    {path: 'update/:id', component: NewVehicleComponent}, // : indicates dynamic value-> anything can come
    {path: 'edit-customer/:id', component: EditCustomerDetailsComponent},
    {path: 'reservation', component:ReservationComponent},
    {path: 'edit-reservation', component: EditReservationComponent},
    {path: 'emp-edit-reservation', component: EmpEditReservationComponent},
    {path: 'edit-reservation/:id', component: EditReservationComponent}


];
