import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {StudentsComponent} from "./pages/students/students.component";
import {AppointmentsComponent} from "./pages/appointments/appointments.component";
import {BusesComponent} from "./pages/buses/buses.component";
import {ComplaintsComponent} from "./pages/complaints/complaints.component";
import {EmployeesComponent} from "./pages/employees/employees.component";
import {LocationsComponent} from "./pages/locations/locations.component";
import {ReportsComponent} from "./pages/reports/reports.component";
import {UniversitiesComponent} from "./pages/universities/universities.component";
import {LoginComponent} from "./pages/login/login.component";

const routes: Routes = [
  // { path: '', redirectTo: "login" , pathMatch: 'full'},
  // { path: 'login', component: LoginComponent},
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'Students', component: StudentsComponent},
  { path: 'Appointments', component: AppointmentsComponent},
  { path: 'Buses', component: BusesComponent},
  { path: 'Complaints', component: ComplaintsComponent},
  { path: 'Employees', component: EmployeesComponent},
  { path: 'locations', component: LocationsComponent},
  { path: 'reports', component: ReportsComponent},
  { path: 'Universities', component: UniversitiesComponent},
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
