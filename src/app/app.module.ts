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
import {environment} from "../environments/environment";
import * as firebase from "firebase";
import { Loader } from "@googlemaps/js-api-loader";
import { DatePipe } from '@angular/common';
import {MapPointService} from "./servies/mapPoint/map-point.service";
import { ErrorComponent } from './component/error/error.component';
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
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added


],
  providers: [DatePipe],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
