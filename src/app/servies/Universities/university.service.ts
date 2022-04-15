import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";

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
}
