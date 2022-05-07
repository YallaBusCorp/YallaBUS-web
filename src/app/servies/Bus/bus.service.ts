import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppointmentModule} from "../../models/appointment/appointment.module";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BusService {

  constructor(private http: HttpClient) { }

  getBuses() {
    return this.http.get<AppointmentModule>(`${environment.UrlWebsite}/bus/company/active?id=`
      +environment.Token
    ).pipe(
      map((res:any)=>{
          return res;

        }
      ));
  }
  PostBus(data:any) {
    return this.http.post<AppointmentModule>(`${environment.UrlWebsite}/bus/save-bus`,
      data
    )
      .pipe(map((res:any)=>{
        return res;
      }));
  }

  UpdateBus(data:any) {
    return this.http.put<AppointmentModule>(`${environment.UrlWebsite}/bus/update-bus`,
      data
    )
      .pipe(map((res:any)=>{
        return res;
      }));
  }

  DeleteBus(id:number) {
    return this.http.put(`${environment.UrlWebsite}/bus/delete-bus?id=`+id,true)
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
