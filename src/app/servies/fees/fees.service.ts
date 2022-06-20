import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {FeesModule} from "../../models/fees/fees.module";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FeesService {

  constructor(private http: HttpClient) { }

  getPendingfees() {
    return this.http.get<FeesModule>(`${environment.UrlWebsite}/fee/company/get-all-Pending?id=`
      +environment.Token
    ).pipe(
      map((res:any)=>{
          return res;

        }
      ));
  }
  getApprovedfees() {
    return this.http.get<FeesModule>(`${environment.UrlWebsite}/fee/company/get-all-Approved?id=`
      +environment.Token
    ).pipe(
      map((res:any)=>{
          return res;

        }
      ));
  }
  getNotApprovedfees(){
    return this.http.get<FeesModule>(`${environment.UrlWebsite}/fee/company/get-all-NotApproved?id=`
      +environment.Token
    ).pipe(
      map((res:any)=>{
          return res;

        }
      ));
  }
  getAllfees() {
    return this.http.get<FeesModule>(`${environment.UrlWebsite}/fee/company/get-all?id=`
      +environment.Token
    ).pipe(
      map((res:any)=>{
          return res;

        }
      ));
  }

  ApprovedFee(id:any,bool :boolean) {
    return this.http.put<FeesModule>(`${environment.UrlWebsite}/fee/approve-by-fee-id?feeId=`+id
      +'&isApproved='+bool,true)
      .pipe(map((res:any)=>{
        return res;
      }));
  }

  getAllfeesByBus(id :any) {
    return this.http.get<FeesModule>(`${environment.UrlWebsite}/fee/bus/get-all?id=`
      +id
    ).pipe(
      map((res:any)=>{
          return res;

        }
      ));
  }
}
