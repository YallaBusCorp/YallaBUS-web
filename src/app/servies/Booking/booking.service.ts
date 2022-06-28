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


  getAppointmentInProcess() {
    return this.http.get(`${environment.UrlWebsite}/txRide/company/get-rides-need-to-assign?id=`
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



  AssignBooking(Data : any){
    return this.http.put(
      `${environment.UrlWebsite}/txBooking/assign`, Data
    ).pipe(
      map((res:any)=>{
          return res;
        }
      ));
  }

}

