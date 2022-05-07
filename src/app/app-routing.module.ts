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
import {SupportsComponent} from "./pages/Supports/supports.component";
import {LoginComponent} from "./pages/login/login.component";
import {IsSignedInGuard} from "./guard/is-signed-in.guard";
import {AuthGuard} from "./guard/auth.guard";
import {ErrorComponent} from "./component/error/error.component";

const routes: Routes = [
  { path: '', redirectTo: "/login" , pathMatch: 'full' },
  // { path: '', component: LoginComponent , pathMatch: 'full' ,  canActivate: [IsSignedInGuard]},
  { path: 'login', component: LoginComponent , pathMatch: 'full' ,  canActivate: [IsSignedInGuard]},
  { path: 'Dashboard', component: HomeComponent ,  canActivate: [IsSignedInGuard]},
  { path: 'home', component: HomeComponent ,  canActivate: [AuthGuard]},
  { path: 'Students', component: StudentsComponent ,  canActivate: [AuthGuard] },
  { path: 'Appointments', component: AppointmentsComponent ,  canActivate: [AuthGuard]},
  { path: 'Buses', component: BusesComponent,  canActivate: [AuthGuard]},
  { path: 'Complaints', component: ComplaintsComponent,  canActivate: [AuthGuard]},
  { path: 'Employees', component: EmployeesComponent,  canActivate: [AuthGuard]},
  { path: 'locations', component: LocationsComponent,  canActivate: [AuthGuard]},
  { path: 'reports', component: ReportsComponent,  canActivate: [AuthGuard]},
  { path: 'Supports', component: SupportsComponent,  canActivate: [AuthGuard]},
  {
    path: '**',
   component: ErrorComponent
    ,canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
