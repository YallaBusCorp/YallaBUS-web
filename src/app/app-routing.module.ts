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
import {IsSignedInGuard} from "./guard/is-signed-in.guard";
import {AuthGuard} from "./guard/auth.guard";

const routes: Routes = [
   { path: '', redirectTo: "/login" , pathMatch: 'full' },
  { path: 'login', component: LoginComponent , pathMatch: 'full' ,  canActivate: [IsSignedInGuard]},
  { path: 'Dashboard', component: HomeComponent ,  canActivate: [IsSignedInGuard]},
  { path: 'home', component: HomeComponent ,  canActivate: [AuthGuard]},
  { path: 'Students', component: StudentsComponent ,  canActivate: [AuthGuard] },
  { path: 'Appointments', component: AppointmentsComponent ,  canActivate: [AuthGuard]},
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
