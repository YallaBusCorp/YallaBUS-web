import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {AppointmentModule} from "../../models/appointment/appointment.module";

@Injectable({
  providedIn: 'root'
})
export class UniversityService {


  constructor(private http: HttpClient) { }
  getUniversities(id : number) {
    return this.http.get(`${environment.UrlWebsite}/lkUniversity/company/active?id=`+environment.Token).pipe(
      map((res:any)=>{
          return res;
        }
      ));
  }
  getAllUniversities(id : number) {
    return this.http.get(`${environment.UrlWebsite}/lkUniversity/company/get-all?id=`+environment.Token).pipe(
      map((res:any)=>{
          return res;
        }
      ));
  }
  PostUniversity(data:any) {
    return this.http.post<AppointmentModule>(`${environment.UrlWebsite}/lkUniversity/save-lk-university`,
      data
    )
      .pipe(map((res:any)=>{
        return res;
      }));
  }

  DeleteUniversity(id:number) {
    return this.http.put(`${environment.UrlWebsite}/lkUniversity/delete-lk-university?id=`+id,true)
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
