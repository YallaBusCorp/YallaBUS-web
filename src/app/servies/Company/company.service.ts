import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {CompanyModule} from "../../models/company/company.module";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }
  getcompanyById(id : any) {
    return this.http.get(`${environment.UrlWebsite}/company/get-by-id?id=`
      +id
    ).pipe(
      map((res:any)=>{
          return res;
        }
      ));
  }
  getAll() {
    return this.http.get<CompanyModule>(`${environment.UrlWebsite}/company`).pipe(
      map((res:any)=>{
          return res;
        }
      ));
  }
  PostCompany(data: any) {
    return this.http.post<CompanyModule>(`${environment.UrlWebsite}/company/save-company`,
      data
    )
      .pipe(map((res:any)=>{
        return res;
      }));
  }
}
