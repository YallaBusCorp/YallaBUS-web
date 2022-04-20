import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'YallaBus';
 loginActive : boolean=   localStorage.getItem('token') != null ? true : false ;
  constructor(
    public router: Router)
  {}

  // navRemove(){
  //   let r = document.getElementById("html");
  //   r?.classList.remove("layout-menu-expanded");
  // }
}
