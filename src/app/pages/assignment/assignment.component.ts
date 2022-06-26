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
import {AssignmentService} from "../../servies/Assignment/assignment.service";
import {RideModule} from "../../models/ride/ride.module";
import {HomeComponent} from "../home/home.component";

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
  arrayToDeleteAppointments : any = [];
  getAllStudentCountInAppointment(data : any) {
    data.forEach((obj: any, key: any) =>{
        this.api.getAllStudentNotAssign(obj.appointment['id'])
          .subscribe((res: any) => {
            console.log(res);
                if(res.length != 0){
                  this.students[obj.appointment['id']]= res.length;
                }else{
                  //this.canceledRide(obj.id);
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
    this.AssignmentService.canceledRide(id)
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
  Assignment2 : any = [];
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
    this.Assignment= [];
    this.Appointmentstatus =0;
    this.Busstatus =0;
    this.Driverstatus =0;
    this.AssignmentCount =0;
  }

  AddAssignment() {
    this.Assignment2 = this.Assignment;
    this.Assignments.push(this.Assignment);
    // console.log(this.AllNotAssignedAppointments)
    // console.log( this.Assignment)
    // console.log( this.Assignments)
    if(Number(this.students[this.Appointmentstatus]) <= Number( this.Assignment['capacity'])){
      this.AllNotAssignedAppointments.splice(this.helper.findIndex(
        this.AllNotAssignedAppointments ,this.Assignments.rideId),1);
    }
    else{
      this.students[this.Appointmentstatus] =
        Number(this.students[this.Appointmentstatus]) - Number( this.Assignment['capacity']);
    }
   this.Buses.splice(this.helper.findIndex(this.Buses ,this.Busstatus),1);
   this.Drivers.splice(this.helper.findIndex(this.Drivers ,this.Driverstatus),1);

    //----------------------------------------------
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
      this.api.getAllStudentNotAssign(this.Assignment.AppointmentID)
        .subscribe((resGetAllStudentNotAssign: any ) => {
            this.booking = resGetAllStudentNotAssign;
            console.log(this.Assignment2)
            this.AssignmentService.getRideById(this.Assignment2.rideId)
              .subscribe((resRideById: any) => {
                  if(resRideById.bus == null && resRideById.emp == null){
                    console.log(1111111111);
                    this.dataAssign  = {
                      "id": this.Assignment2.rideId,
                      "emp": {
                        'id': this.Assignment2.Driver
                      },
                      "bus": {
                        "id": this.Assignment2.Bus
                      }
                    }
                    this.ArrayDataAssign.push( this.dataAssign);
                    this.AssignmentService.AssignRide(this.ArrayDataAssign)
                      .subscribe((dataAssign: any) => {
                          console.log( "Test : " );
                          console.log( dataAssign );

                        },
                        (err: any) => {
                          this.toastr.warning("Internal Server Error");

                        }
                      )
                    for (let j=0;j<this.Assignment2.capacity;j++){
                      this.dataBooking  = {
                        "id": this.booking[j].id,
                        "emp": {
                          'id': this.Assignment2.Driver
                        },
                        "bus": {
                          "id": this.Assignment2.Bus
                        },
                        "txRide": {
                          "id":  this.Assignment2.rideId
                        }
                      }
                      this.BookingToAssign.push(this.dataBooking);
                      if(this.booking.length == j+1){
                        break;
                      }
                    }
                    console.log( this.BookingToAssign );
                    console.log( this.dataAssign );
                    this.AssignBooking(this.BookingToAssign);
                    this.toastr.success('Added Successfully');
                    this.Assignment2 = [];

                  }else{
                    // console.log(this.Assignments[i]);
                    this.dataAssign  = {
                      "rideData": this.myDate,
                      "rideStatus": "process",
                      "appointment": {
                        "id":  this.Assignment2.AppointmentID
                      },
                      "emp": {
                        'id': this.Assignment2.Driver
                      },
                      "bus": {
                        "id": this.Assignment2.Bus
                      }
                    }
                    this.AssignmentService.CreateRide(this.dataAssign)
                      .subscribe((resCreateRide: any) => {
                          //console.log(resCreateRide)
                          for (let j=0;j<this.Assignment2?.capacity;j++){
                            this.dataBooking  = {
                              "id": this.booking[j].id,
                              "emp": {
                                'id': this.Assignment2.Driver
                              },
                              "bus": {
                                "id": this.Assignment2.Bus
                              },
                              "txRide" :{'id' : resCreateRide}

                            }
                            this.BookingToAssign.push(this.dataBooking);
                            if(this.booking.length -1 == j){
                              break;
                            }
                          }
                          console.log( this.BookingToAssign );
                          console.log( this.dataAssign );
                          this.AssignBooking(this.BookingToAssign);
                          this.toastr.success('Added Successfully');
                        },
                        (err: any) => {
                          this.toastr.warning("Internal Server Error");
                        }
                      )

                  }

                },
                (err: any) => {
                  this.toastr.warning("Internal Server Error");

                }
              )
            // this.Assignments = [];
            // this.ReturnAllAssignment();
          },
          (err: any) => {
            this.toastr.warning("Internal Server Error");

          }
        )
    this.ClearAssignment();
  }
  CreateRide(DataAssignRide : any) {
    this.AssignmentService.CreateRide(DataAssignRide)
      .subscribe((res: any) => {
         // console.log(res);
        },
        (err: any) => {
          this.toastr.warning("Internal Server Error");

        }
      )
  }

  AssignBooking(DataAssignBooking : any) {
    this.api.AssignBooking(DataAssignBooking)
      .subscribe((res: any) => {
        //  console.log(res);
        },
        (err: any) => {
          this.toastr.warning("Internal Server Error");

        }
      )
  }
  AssignRide(DataAssignRide : any) {
    this.AssignmentService.AssignRide(DataAssignRide)
      .subscribe((res: any) => {
         // console.log(res);
        },
        (err: any) => {
          this.toastr.warning("Internal Server Error");

        }
      )
  }

  GetRideById(Id : any) {
    this.AssignmentService.getRideById(Id)
      .subscribe((res: any) => {
            return res;
        },
        (err: any) => {
          this.toastr.warning("Internal Server Error");

        }
      )
  }

  ReturnAllAssignment() {
    this.Assignments = [];
    this.getAppointmentInProcess();
    this.getBuses();
    this.getDrivers();
  }
  BookingToAssign : any = [];
  ArrayDataAssign : any = [];
  dataBooking : any ;
  dataAssign : any ;
  booking : any ;
  ID : any =  {
    "id": 0
  };
  AddBooking() {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    console.log(this.Assignments)
    for (let i=0; i<this.Assignments.length;i++){
      this.api.getAllStudentNotAssign(this.Assignments[i].AppointmentID)
        .subscribe((resGetAllStudentNotAssign: any) => {
            this.booking = resGetAllStudentNotAssign;
            this.AssignmentService.getRideById(this.Assignments[i].rideId)
              .subscribe((resRideById: any) => {
                  if(resRideById.bus == null && resRideById.emp == null){
                    console.log(1111111111);
                    this.dataAssign  = {
                      "id": this.Assignments[i].rideId,
                      "emp": {
                        'id': this.Assignments[i].Driver
                      },
                      "bus": {
                        "id": this.Assignments[i].Bus
                      }
                    }
                    this.ArrayDataAssign.push( this.dataAssign);
                    this.AssignmentService.AssignRide(this.ArrayDataAssign)
                      .subscribe((dataAssign: any) => {
                          console.log( "Test : " );
                          console.log( dataAssign );

                        },
                        (err: any) => {
                          this.toastr.warning("Internal Server Error");

                        }
                      )
                    for (let j=0;j<this.Assignments[i].capacity;j++){
                      this.dataBooking  = {
                        "id": this.booking[j].id,
                        "emp": {
                          'id': this.Assignments[i].Driver
                        },
                        "bus": {
                          "id": this.Assignments[i].Bus
                        },
                        "txRide": {
                          "id":  this.Assignments[i].rideId
                        }
                      }
                      this.BookingToAssign.push(this.dataBooking);
                      if(this.booking.length == j+1){
                        break;
                      }
                    }
                    console.log( this.BookingToAssign );
                    console.log( this.dataAssign );
                    this.AssignBooking(this.BookingToAssign);
                    this.toastr.success('Added Successfully');
                    this.Assignments = [];

                  }else{
                   // console.log(this.Assignments[i]);
                    this.dataAssign  = {
                      "rideData": this.myDate,
                      "rideStatus": "process",
                      "appointment": {
                        "id":  this.Assignments[i].AppointmentID
                      },
                      "emp": {
                        'id': this.Assignments[i].Driver
                      },
                      "bus": {
                        "id": this.Assignments[i].Bus
                      }
                    }
                   this.AssignmentService.CreateRide(this.dataAssign)
                      .subscribe((resCreateRide: any) => {
                        //console.log(resCreateRide)
                          for (let j=0;j<this.Assignments[i]?.capacity;j++){
                            this.dataBooking  = {
                              "id": this.booking[j].id,
                              "emp": {
                                'id': this.Assignments[i].Driver
                              },
                              "bus": {
                                "id": this.Assignments[i].Bus
                              },
                              "txRide" :{'id' : resCreateRide}

                            }
                            this.BookingToAssign.push(this.dataBooking);
                            if(this.booking.length -1 == j){
                              this.Assignments = [];
                              break;
                            }
                          }
                           console.log( this.BookingToAssign );
                           console.log( this.dataAssign );
                           this.AssignBooking(this.BookingToAssign);
                          this.toastr.success('Added Successfully');
                        },
                        (err: any) => {
                          this.toastr.warning("Internal Server Error");
                        }
                      )



                  }

                },
                (err: any) => {
                  this.toastr.warning("Internal Server Error");

                }
              )
           // this.Assignments = [];
           // this.ReturnAllAssignment();
          },
          (err: any) => {
            this.toastr.warning("Internal Server Error");

          }
        )
    }
    //this.Assignments = [];
  }
}
