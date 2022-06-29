import { Component, OnInit } from '@angular/core';
import {AssignmentService} from "../../servies/Assignment/assignment.service";
import {ToastrService} from "ngx-toastr";
import {DatePipe} from "@angular/common";
import {StudentService} from "../../servies/Student/student.service";
import {BusService} from "../../servies/Bus/bus.service";
import {EmployeeService} from "../../servies/Employee/employee.service";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Rides : any;
  constructor(
    private ApiRide : AssignmentService,
    private StudentService : StudentService,
    private BusService : BusService,
    private EmployeeService : EmployeeService,
    private toastr: ToastrService,
    private  datePipe:DatePipe,
    private router : Router,
  ) { }

  ngOnInit(): void {
      this.getRides();
    this.getCountBuses();
    this.getCountStudents();
    this.getCountEmployees();
    if(environment.Token == '0')
      this.router.navigate(['/Company']);
  }

  getRides() {
    let Now =  this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    this.ApiRide.getAllRideByDateAndCompany(Now)
      .subscribe( (res : any) => {
          this.Rides = res;
          console.log(this.Rides);
        },
        (err : any) => {
          this.toastr.warning((err.statusText ?err.statusText : (err.error ? err.error : "Internal Server Error")));

        }
      )
  }
  CountStudents : any;
  getCountStudents() {
    this.StudentService.getCountStudents()
      .subscribe( (res : any) => {
          this.CountStudents = res;
        },
        (err : any) => {
          this.toastr.warning((err.statusText ?err.statusText : (err.error ? err.error : "Internal Server Error")));

        }
      )
  }
  CountEmployees : any;
  getCountEmployees() {
    this.EmployeeService.getCountEmployees()
      .subscribe( (res : any) => {
          this.CountEmployees = res;
        },
        (err : any) => {
          this.toastr.warning((err.statusText ?err.statusText : (err.error ? err.error : "Internal Server Error")));

        }
      )
  }
  CountBuses : any;

  getCountBuses() {
    this.BusService.getCountBuses()
      .subscribe( (res : any) => {
          this.CountBuses = res;
        },
        (err : any) => {
          this.toastr.warning((err.statusText ?err.statusText : (err.error ? err.error : "Internal Server Error")));

        }
      )
  }

}
