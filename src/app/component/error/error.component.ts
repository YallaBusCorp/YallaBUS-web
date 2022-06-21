import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit ,OnDestroy{

  constructor(private router : Router) { }
  id1 : any;
  id2 : any;
  ngOnInit(): void {
    this.id1 = document.getElementById("layout-menu");
    this.id1?.classList.add("layout-menu-remove");
    this.id2 = document.getElementById("layout-wrapper");
    this.id2?.classList.add("layout-without-menu");
  }
  //
  public ngOnDestroy() {
    this.id1?.classList.remove("layout-menu-remove");
    this.id2?.classList.remove("layout-without-menu");
  }
  goHome() {
    this.router.navigate(['home']);
  }
}
