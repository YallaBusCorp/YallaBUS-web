import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {StudentInterface, StudentModule, SubscriptionRenew} from "../../models/student/student.module";
import {map} from "rxjs/operators";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }
  getStudents() {
    return this.http.get<StudentModule>(`${environment.UrlWebsite}/student/company/active?id=`
      +environment.Token
    ).pipe(
      map((res:any)=>{
      return res;
    }
    ));
  }
  PostStudents(data:any) {
    return this.http.post<StudentModule>(`${environment.UrlWebsite}/student/save-student`,
         data
    )
      .pipe(map((res:any)=>{
        return res;
      }));
  }

  UpdateStudents(data:any) {
    return this.http.put<StudentModule>(`${environment.UrlWebsite}/student/update-student`,
      data
    )
      .pipe(map((res:any)=>{
        return res;
      }));
  }

  RenewStudents(data:any) {
    return this.http.post<SubscriptionRenew>(`${environment.UrlWebsite}/payment/save-payment`,
      data
    )
      .pipe(map((res:any)=>{
        return res;
      }));
  }

  DeleteStudent(id:number) {
    return this.http.put(`${environment.UrlWebsite}/student/delete-student?id=`+id,true)
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
