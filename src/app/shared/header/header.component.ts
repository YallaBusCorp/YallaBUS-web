import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LoginComponent} from "../../pages/login/login.component";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public router : Router
  ) { }

  ngOnInit(): void {
  }
  logout(){
      // localStorage.removeItem('token');
      //  history : LoginComponent;
      //  history.go(0);
  }
}
