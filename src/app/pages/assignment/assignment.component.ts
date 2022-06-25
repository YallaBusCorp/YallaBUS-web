import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {DatePipe} from "@angular/common";
import {BusService} from "../../servies/Bus/bus.service";
import {HelperService} from "../../Helper/helper.service";
import {BookingService} from "../../servies/Booking/booking.service";
import {EmployeeService} from "../../servies/Employee/employee.service";
import {AppointmentService} from "../../servies/Appointments/appointment.service";
import {BusModule} from "../../models/bus/bus.module";
import {isEmpty} from "rxjs";

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
  AllNotAssignedAppointments : any = [];
  Buses : any;
  Drivers : any;
  appointmentIndex : any  = [];
  Appointments : any = [];
  students : any = [];
  busInformation : boolean = false;
  Assignments : any = [];
  constructor(
    private api: BookingService,
    private apiBuses: BusService,
    private ApiAppointment: AppointmentService,
    private apiDrivers: EmployeeService,
    private toastr: ToastrService,
    private helper : HelperService
  ) {
  }

  ngOnInit(): void {
    this.getAppointmentInProcess();
    this.getBuses();
    this.getDrivers();
  }
  getAppointmentInProcess(){
    this.api.getAppointmentInProcess()
      .subscribe( (res : any ) => {
          this.AllNotAssignedAppointments = res;
          if(this.AllNotAssignedAppointments?.length != 0)
            this.getAllStudentCountInAppointment(res);

        },
        (err : any) => {
          this.toastr.warning("Internal Server Error");

        }
      )


  }
  getAllStudentCountInAppointment(data : any) {
    data.forEach((obj: any, key: any) =>{
        this.api.getAllStudentNotAssign(obj.appointment['id'])
          .subscribe((res: any) => {
                if(res.length != 0){
                  this.students[obj.appointment['id']]= res.length;
                }else{
                   this.canceledRide(obj.id);
                  data[key] = null;
                  }
            },
            (err: any) => {
              this.toastr.warning("Internal Server Error");

            }
          )
    });
  }

  canceledRide(id : number) {
    this.api.canceledRide(id)
      .subscribe( (res : any) => {
         return  res;
        },
        (err : any) => {
          this.toastr.warning("Internal Server Error");

        }
      )
  }
  getBuses() {
    this.apiBuses.AvailableBuses()
      .subscribe( (res : any) => {
          this.Buses = res;
        },
        (err : any) => {
          this.toastr.warning("Internal Server Error");

        }
      )
  }
  getDrivers() {
    this.apiDrivers.getAvailableDrivers()
      .subscribe( (res : any) => {
          this.Drivers = res;
        },
        (err : any) => {
          this.toastr.warning("Internal Server Error");

        }
      )
  }
  BusData : BusModule;
  showDataBus(Bus: any) {
    this.busInformation = true;
    this.BusData = Bus;
  }
  RemoveDataBus() {
    this.busInformation = false;
  }
  Assignment : any = [];
  Appointmentstatus : any;
  Busstatus : any;
  Driverstatus : any;
  AssignmentCount : number =0;
  AddTOAssignment(type : any, Data : any) {
      if(!this.Assignment[type])
        this.AssignmentCount++;

      if(type == "Appointment"){
        this.Assignment['rideId'] = Data.id;
        this.Appointmentstatus = Data.appointment.id;
        this.Assignment['AppointmentTime'] = Data.appointment.appointmentStartTime + Data.appointment.appointmentType;

      }
      else  if(type == "Bus"){
        this.Assignment[type] = Data.id;

        this.Busstatus = Data.id;
        this.Assignment['model'] = Data.model;
        this.Assignment['capacity'] = Data.capacity;

      }
      else  if(type == "Driver"){
        this.Assignment[type] = Data.id;
        this.Driverstatus = Data.id;
        this.Assignment['DriverName'] = Data.empName;

      }
  }
  ClearAssignment() {
    this.Assignment= [];
    this.Appointmentstatus =0;
    this.Busstatus =0;
    this.Driverstatus =0;
    this.AssignmentCount =0;
  }

  AddAssignment() {
    this.Assignments.push(this.Assignment);
    console.log(this.students[this.Appointmentstatus] , this.Assignment['capacity'])
    if(Number(this.students[this.Appointmentstatus]) <= Number( this.Assignment['capacity']))
      this.AllNotAssignedAppointments.splice(this.helper.findIndex(this.AllNotAssignedAppointments ,this.Assignments.rideId),1);
    else{
      this.students[this.Appointmentstatus] =
        this.students[this.Appointmentstatus] - Number( this.Assignment['capacity']);
    }
    this.Buses.splice(this.helper.findIndex(this.Buses ,this.Busstatus),1);
    this.Drivers.splice(this.helper.findIndex(this.Drivers ,this.Driverstatus),1);

    this.ClearAssignment();

    console.log(this.Assignments)

  }

  ReturnAllAssignment() {
    this.Assignments = [];
    this.getAppointmentInProcess();
    this.getBuses();
    this.getDrivers();
  }
}
