import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { StudentsComponent } from './pages/students/students.component';
import {SupportsComponent} from './pages/Supports/supports.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { ComplaintsComponent } from './pages/complaints/complaints.component';
import { BusesComponent } from './pages/buses/buses.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { LoginComponent } from './pages/login/login.component';
import { DatePipe } from '@angular/common';
import { ErrorComponent } from './component/error/error.component';
import { FeesComponent } from './pages/fees/fees.component';
import { FeeByBusComponent } from './pages/fees/fee-by-bus/fee-by-bus.component';
import { AssignmentComponent } from './pages/assignment/assignment.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SubscriptionPriceComponent } from './pages/settings/subscription-price/subscription-price.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { TestComponent } from './pages/test/test.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    StudentsComponent,
    SupportsComponent,
    ReportsComponent,
    LocationsComponent,
    EmployeesComponent,
    ComplaintsComponent,
    BusesComponent,
    AppointmentsComponent,
    LoginComponent,
    ErrorComponent,
    FeesComponent,
    FeeByBusComponent,
    AssignmentComponent,
    SettingsComponent,
    SubscriptionPriceComponent,
    PaymentComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
  ],
  exports :[
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [DatePipe],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
