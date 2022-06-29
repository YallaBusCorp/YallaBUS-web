import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LoginComponent} from "../../pages/login/login.component";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public router : Router
  ) { }
  token : any = environment.Token
  ngOnInit(): void {
  }
  logout(){
       localStorage.removeItem('token');
      this.router.navigate(['/login']);
  }

  removeNav() {
    let r = document.getElementById("html");
    r?.classList.remove("layout-menu-expanded");
  }
}
