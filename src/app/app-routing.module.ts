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
import {FeesComponent} from "./pages/fees/fees.component";
import {FeeByBusComponent} from "./pages/fees/fee-by-bus/fee-by-bus.component";
import {AssignmentComponent} from "./pages/assignment/assignment.component";
import {SettingsComponent} from "./pages/settings/settings.component";
import {PaymentComponent} from "./pages/payment/payment.component";
import {TestComponent} from "./pages/test/test.component";
import {TestGuard} from "./guard/test.guard";
import {CompanyComponent} from "./pages/company/company.component";

const routes: Routes = [
  { path: '', redirectTo: "/login" , pathMatch: 'full' },
  { path: 'login', component: LoginComponent , pathMatch: 'full' ,  canActivate: [IsSignedInGuard]},
  { path: 'Dashboard', component: HomeComponent ,  canActivate: [IsSignedInGuard]},
  { path: 'home', component: HomeComponent ,  canActivate: [AuthGuard ]},
  { path: 'Students', component: StudentsComponent ,  canActivate: [AuthGuard ] },
  { path: 'Appointments', component: AppointmentsComponent ,  canActivate: [AuthGuard]},
  { path: 'Buses', component: BusesComponent,canActivate: [AuthGuard ]
  },
  { path: 'Complaints', component: ComplaintsComponent,  canActivate: [AuthGuard]},
  { path: 'Employees', component: EmployeesComponent,  canActivate: [AuthGuard]},
  { path: 'locations', component: LocationsComponent,  canActivate: [AuthGuard]},
  { path: 'reports', component: ReportsComponent,  canActivate: [AuthGuard]},
  { path: 'Supports', component: SupportsComponent,  canActivate: [AuthGuard]},
  { path: 'Payments', component: PaymentComponent,  canActivate: [AuthGuard]},
  { path: 'Test', component: TestComponent,  canActivate: [AuthGuard]},
  {
    path: 'Fees', component: FeesComponent, canActivate: [AuthGuard],
  },
  {
    path: 'Assignments', component: AssignmentComponent, canActivate: [AuthGuard],
  },
  {
    path: 'Settings', component: SettingsComponent, canActivate: [AuthGuard],
  },
  {
    path: 'Company', component: CompanyComponent, canActivate: [AuthGuard],
  },
  {path: 'Fees/bus/:id' , component: FeeByBusComponent ,  canActivate: [AuthGuard] },

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
