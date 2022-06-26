import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private http: HttpClient) { }
  AssignRide(Data : any){
    return this.http.put(
      `${environment.UrlWebsite}/txRide/assign`, Data
    ).pipe(
      map((res:any)=>{
          return res;
        }
      ));
  }
  getAllRideByDateAndCompany(date : any){
    return this.http.get(
      `${environment.UrlWebsite}/txRide/company/date/get-all?id=`+ environment.Token+`&date=` + date
    ).pipe(
      map((res:any)=>{
          return res;
        }
      ));
  }
  CreateRide(Data : any){
    return this.http.post(
      `${environment.UrlWebsite}/txRide/save-txRide`, Data
    ).pipe(
      map((res:any)=>{
          return res.id;
        }
      ));
  }

  getRideById(ID : number){
    return this.http.get(
      `${environment.UrlWebsite}/txRide/get-by-id?id=`+ID
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
