import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  // navShow(){
  //   let r = document.getElementById("html");
  //   r?.classList.add("layout-menu-expanded");
  // }
  navShow() {
       let r = document.getElementById("html");
       r?.classList.add("layout-menu-expanded");
  }
}
