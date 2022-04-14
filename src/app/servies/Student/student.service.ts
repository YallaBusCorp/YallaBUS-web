import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {StudentModule} from "../../models/student/student.module";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }
  getStudents(id : number) {
    // fetch(`${environment.UrlWebsite}/student/get-by-company-id?id=`+id, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' }
    // }).then(function (res) {
    //   if (res.ok)  return res;;
    // });
    return this.http.get<StudentModule>(`${environment.UrlWebsite}/student/get-by-company-id?id=`+environment.Token
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

  get windowRef(){
    return window;
  }

}
