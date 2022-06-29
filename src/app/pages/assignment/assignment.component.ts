import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {DatePipe} from "@angular/common";
import {BusService} from "../../servies/Bus/bus.service";
import {HelperService} from "../../Helper/helper.service";
import {BookingService} from "../../servies/Booking/booking.service";
import {EmployeeService} from "../../servies/Employee/employee.service";
import {AppointmentService} from "../../servies/Appointments/appointment.service";
import {BusModule} from "../../models/bus/bus.module";
import {AssignmentService} from "../../servies/Assignment/assignment.service";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
  AllNotAssignedAppointments : any = [];
  Buses : any;
  Drivers : any;
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
    private helper : HelperService,
    private  AssignmentService : AssignmentService,
    private datePipe: DatePipe
  ) {
  }
  myDate: any = new Date();
  ngOnInit(): void {
    this.getAppointmentInProcess();
    this.getBuses();
    this.getDrivers();
  }
  getAppointmentInProcess(){
    this.api.getAppointmentInProcess()
      .subscribe( (res : any ) => {
          this.AllNotAssignedAppointments = res;
          this.getAllStudentCountInAppointment(res);
        },
        (err : any) => {
          this.toastr.warning("Internal Server Error");

        }
      )


  }
  countNotAssign =0;
  arrayToDeleteAppointments : any = [];
  getAllStudentCountInAppointment(data : any) {
    data.forEach((obj: any, key: any) =>{
        this.api.getAllStudentNotAssign(obj.appointment['id'])
          .subscribe((res: any) => {
                if(res.length != 0){
                  this.students[obj.appointment['id']]= res.length;
                }else{
                  this.students[obj.appointment['id']]= 0;
                  this.countNotAssign++;
                  }

            },
            (err: any) => {
              this.toastr.warning("Internal Server Error");

            }
          )
    });
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
        this.Assignment['AppointmentID'] = Data.appointment.id;
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
    this.AllNotAssignedAppointments.slice(this.Assignment['rideId'],1);
    this.Assignment = [];
    this.Assignments = [];
    this.Appointmentstatus =0;
    this.Busstatus =0;
    this.Driverstatus =0;
    this.AssignmentCount =0;
    this.booking = [];
  }
  ReturnAllAssignment() {
    this.ClearAssignment();
    this.getAppointmentInProcess();
    this.getBuses();
    this.getDrivers();
  }
  AddAssignment() {
    this.Assignments.push(this.Assignment);
    Swal.fire({
      title: 'Are you sure?',
      html: "" +
        "<p>Appointment : "+ this.Assignments[0].AppointmentTime +  "</p> " +
        " <p>Driver : " + this.Assignments[0].DriverName + " </p>" +
        " <p>Bus : " + this.Assignments[0].model + " -- capacity  :  " + this.Assignments[0].capacity+ " </p>" +
        " <p>Booking : "  + this.students[this.Appointmentstatus] +  "</p> " ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Assign it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Assign!',
          'Your file has been Assigned.',
          'success'
        )
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    if(Number(this.students[this.Appointmentstatus]) <= Number( this.Assignment['capacity'])){
            this.students[this.Appointmentstatus] = 0;
            this.countNotAssign++;
    }
    else{
      this.students[this.Appointmentstatus] =
        Number(this.students[this.Appointmentstatus]) - Number( this.Assignment['capacity']);
    }
    this.getAllStudentNotAssign(this.Assignment.AppointmentID);
          this.AssignmentService.getRideById(this.Assignment.rideId)
            .subscribe((resRideById: any) => {
                if(resRideById.bus == null && resRideById.emp == null) {
                    this.dataAssign = {
                      "id":  this.Assignments[0].rideId,
                      "emp": {
                        'id': this.Assignments[0].Driver
                      },
                      "bus": {
                        "id": this.Assignments[0].Bus
                      }
                    }
                  this.ArrayDataAssign.push( this.dataAssign);
                  this.AssignmentService.AssignRide(this.ArrayDataAssign)
                    .subscribe((dataAssign: any) => {
                      for (let i=0;i<this.booking[0].length;i++){
                          this.dataBooking  = {
                            "id": this.booking[0][i].id,
                            "emp": {
                              'id': this.Assignments[0].Driver
                            },
                            "bus": {
                              "id": this.Assignments[0].Bus
                            },
                            "txRide": {
                              "id":  this.Assignments[0].rideId
                            }
                          }
                          this.BookingToAssign.push(this.dataBooking);
                          if(this.Assignments[0].capacity == i+1) {
                            break;
                          }
                      }
                        this.AssignBooking(this.BookingToAssign);
                        this.toastr.success('Added Successfully');
                        if(this.countNotAssign  != this.AllNotAssignedAppointments.length)
                          this.ClearAssignment();
                        else
                          this.ReturnAllAssignment();
                      },
                      (err: any) => {
                        this.toastr.warning("Internal Server Error");

                      }
                    )
                }else{
                  this.dataAssign  = {
                    "rideData": this.myDate,
                    "rideStatus": "process",
                    "appointment": {
                      "id":  this.Assignments[0].AppointmentID
                    },
                    "emp": {
                      'id': this.Assignments[0].Driver
                    },
                    "bus": {
                      "id": this.Assignments[0].Bus
                    }
                  }
                  this.AssignmentService.CreateRide(this.dataAssign)
                    .subscribe((resCreateRide: any) => {
                        for (let i=0;i<this.booking[0].length;i++){
                              this.dataBooking  = {
                            "id": this.booking[0][i].id,
                            "emp": {
                              'id': this.Assignments[0].Driver
                            },
                            "bus": {
                              "id": this.Assignments[0].Bus
                            },
                            "txRide" :{'id' : resCreateRide}

                          }
                          this.BookingToAssign.push(this.dataBooking);
                        }
                        this.AssignBooking(this.BookingToAssign);
                        this.toastr.success('Added Successfully');
                        if(this.countNotAssign  != this.AllNotAssignedAppointments.length)
                          this.ClearAssignment();
                        else
                          this.ReturnAllAssignment();
                      },
                      (err: any) => {
                        this.toastr.warning("Internal Server Error");
                      }
                    )
                }
            })
   this.Buses.splice(this.helper.findIndex(this.Buses ,this.Busstatus),1);
   this.Drivers.splice(this.helper.findIndex(this.Drivers ,this.Driverstatus),1);
      }else{
        this.ReturnAllAssignment();
      }
    })
  }
  AssignBooking(Id : any){
    this.api.AssignBooking(Id)
      .subscribe((res: any) => {
        return res;
      })

  }
  BookingToAssign : any = [];
  ArrayDataAssign : any = [];
  dataBooking : any ;
  dataAssign : any ;
 public booking : any = [];
  getAllStudentNotAssign(Id : any){
    this.api.getAllStudentNotAssign(Id)
      .subscribe((res: any) => {
        this.booking.push(res);
        })
  }

}
