import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {AppointmentModule} from "../../models/appointment/appointment.module";

@Injectable({
  providedIn: 'root'
})
export class TownService {

  constructor(private http: HttpClient) { }
  getTowns(id : number) {
    return this.http.get(`${environment.UrlWebsite}/lkTown/company/active?id=`+environment.Token).pipe(
      map((res:any)=>{
          return res;
        }
      ));
  }
  getAllTowns(id : number) {
    return this.http.get(`${environment.UrlWebsite}/lkTown/company/get-all?id=`+environment.Token).pipe(
      map((res:any)=>{
          return res;
        }
      ));
  }
  PostTown(data:any) {
    return this.http.post<AppointmentModule>(`${environment.UrlWebsite}/lkTown/save-lk-town`,
      data
    )
      .pipe(map((res:any)=>{
        return res;
      }));
  }

  DeleteTown(id:number) {
    return this.http.put(`${environment.UrlWebsite}/lkTown/delete-lk-town?id=`+id,true)
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
