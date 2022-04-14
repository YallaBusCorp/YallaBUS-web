import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TownService {

  constructor(private http: HttpClient) { }
  getTowns(id : number) {
    return this.http.get(`${environment.UrlWebsite}/lkTown/get-by-company-id?id=`+id).pipe(
      map((res:any)=>{
          return res;
        }
      ));
  }
}
