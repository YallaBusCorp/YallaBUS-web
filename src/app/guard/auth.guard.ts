import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from "../servies/Auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService : AuthService  ,
    private router : Router,
  ) {}
  canActivate():boolean{
    if(this.authService.loggedIn()){
      return true;
    }else{
      localStorage.removeItem('token');
       this.router.navigate(['/login']);
      return false;
    }

  }


}
