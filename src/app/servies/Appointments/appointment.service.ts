import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {AppointmentModule} from "../../models/appointment/appointment.module";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }
  getAppointments(id : number) {
    return this.http.get<AppointmentModule>(`${environment.UrlWebsite}/appointment/company/get-all?id=`
      +environment.Token
    ).pipe(
      map((res:any)=>{
          return res;
        }
      ));
  }
  PostAppointments(data:any) {
    return this.http.post<AppointmentModule>(`${environment.UrlWebsite}/appointment/save-appointment`,
      data
    )
      .pipe(map((res:any)=>{
        return res;
      }));
  }

  UpdateAppointments(data:any) {
    return this.http.put<AppointmentModule>(`${environment.UrlWebsite}/appointment/update-appointment`,
      data
    )
      .pipe(map((res:any)=>{
        return res;
      }));
  }

  DeleteAppointment(id:number) {
    return this.http.put(`${environment.UrlWebsite}/appointment/delete-appointment?id=`+id,true)
      .pipe(map((res:any)=>{
            return res;
          },
          (err : any)=>{
            return err;
          }
        )
      );
  }
}
