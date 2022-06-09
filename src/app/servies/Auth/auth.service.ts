import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AppointmentModule} from "../../models/appointment/appointment.module";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router : Router,
    private http: HttpClient,
  ) { }


  loggedIn(){
    return !!localStorage.getItem('token'); //true or false
  }

  getToken(){
    return localStorage.getItem('token');
  }
  loggedOutUser(){
    localStorage.removeItem('token');
    this.router.navigate(["/login"]);

  }

  Login(username : string , password : string) {
    return this.http.get(`${environment.UrlWebsite}/admin/login?username=${username}&password=${password}`).pipe(
      map((res:any)=>{
          return res;
        }
      ));
  }
}
