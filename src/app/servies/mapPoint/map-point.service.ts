import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {MapPointModule} from "../../models/map-point/map-point.module";
import {AppointmentModule} from "../../models/appointment/appointment.module";

@Injectable({
  providedIn: 'root'
})
export class MapPointService {

  constructor(private http: HttpClient) { }
  getMapPoints() {
    return this.http.get<MapPointModule>(`${environment.UrlWebsite}/mapPoint/company/active?id=`
      +environment.Token
    ).pipe(
      map((res:any)=>{
          return res;
        }
      ));
  }

  PostMapPoint(data:any) {
    return this.http.post<AppointmentModule>(`${environment.UrlWebsite}/mapPoint/save-mapPoint`,
      data
    )
      .pipe(map((res:any)=>{
        return res;
      }));
  }

  UpdateMapPoint(data:any) {
    return this.http.put<AppointmentModule>(`${environment.UrlWebsite}/mapPoint/update-mapPoint`,
      data
    )
      .pipe(map((res:any)=>{
        return res;
      }));
  }

  DeleteMapPoint(id:number) {
    return this.http.put(`${environment.UrlWebsite}/mapPoint/delete-mapPoint?id=`+id,true)
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
