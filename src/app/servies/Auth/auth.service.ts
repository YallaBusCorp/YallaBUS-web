import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

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
}
