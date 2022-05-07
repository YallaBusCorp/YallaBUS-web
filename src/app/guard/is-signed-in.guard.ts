import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../servies/Auth/auth.service";
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class IsSignedInGuard implements CanActivate {
  constructor(
    private authService : AuthService,
    private location : Location,
    private router : Router
  ) {}
  canActivate():boolean{
    if(this.authService.loggedIn()){
      this.router.navigate(['/home']);
     // this.location.back();
      return false;
    }else{
      return true;
    }
  }

}
