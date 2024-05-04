import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { EmpVehicleListComponent } from './pages/emp-vehicle-list/emp-vehicle-list.component';
import { NewVehicleComponent } from './pages/new-vehicle/new-vehicle.component';
import { CustVehicleListComponent } from './pages/cust-vehicle-list/cust-vehicle-list.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'signup', component:SignupComponent},
    {path: 'vechile-list', component: EmpVehicleListComponent},
    {path: 'new', component: NewVehicleComponent},
    {path: 'list', component: CustVehicleListComponent},
    {path: 'update/:id', component: NewVehicleComponent} // : indicates dynamic value-> anything can come

];
