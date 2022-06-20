import { Injectable } from '@angular/core';
import {EmployeeModule} from "../../models/employee/employee.module";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

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
}
