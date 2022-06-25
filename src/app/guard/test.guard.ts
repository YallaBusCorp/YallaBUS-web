import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../servies/Auth/auth.service";
import {LoginComponent} from "../pages/login/login.component";

@Injectable({
  providedIn: 'root'
})
export class TestGuard implements CanActivate {
    constructor(
    ) {}
    canActivate() : any{
          window.onbeforeunload = function () {
            localStorage.removeItem('token');
            history : LoginComponent;
            history.go(0);
          }
    }

}
