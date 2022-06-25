import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppointmentModule} from "../../models/appointment/appointment.module";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  getNotAssignedWhenDead() {
    return this.http.get(`${environment.UrlWebsite}/txBooking/company/get-all-not-assigned-WithinDeadLine?id=`
      +environment.Token
    ).pipe(
      map((res:any)=>{
          return res;
        }
      ));
  }

  getAppointmentInProcess() {
    return this.http.get(`${environment.UrlWebsite}/txRide/company/status/get-all?id=`
      +environment.Token +`&status=process`
    ).pipe(
      map((res:any)=>{
          return res;
        }
      ));
  }

  getAllStudentNotAssign(appointmentId : any) {
    return this.http.get(
      `${environment.UrlWebsite}/txBooking/company/appointment/get-all-not-assigned?companyId=`
      +environment.Token +`&appointmentId=`
      +appointmentId
    ).pipe(
      map((res:any)=>{
          return res;
        }
      ));

  }

  canceledRide(RideId : any) {
    return this.http.put(
      `${environment.UrlWebsite}/txRide/canceled?id=`
      +RideId , true
    ).pipe(
      map((res:any)=>{
          return res;
        }
      ));

  }
}

