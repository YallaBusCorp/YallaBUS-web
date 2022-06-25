import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TownService} from "../../servies/Towns/town.service";
import {ToastrService} from "ngx-toastr";
import {UniversityService} from "../../servies/Universities/university.service";
import {environment} from "../../../environments/environment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppointmentInterface, AppointmentModule} from "../../models/appointment/appointment.module";
import {AppointmentService} from "../../servies/Appointments/appointment.service";
import { DatePipe } from '@angular/common';
import {HelperService} from "../../Helper/helper.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UserData} from "../test/test.component";
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'appointmentStartTime', 'appointmentType', 'isActive' ,'Action'];
  dataSource: MatTableDataSource<AppointmentInterface>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  Appointments: any = [];
  theDateNow: any = new Date;
  AppointmentModule: AppointmentModule | any;
  ShowAddbutton : boolean =true;
  constructor(
    private AppointmentApi: AppointmentService,
    private toastr: ToastrService,
    private  datePipe:DatePipe,
    private hepler : HelperService
  ) {

  }

  ngOnInit(): void {
    this.getAppointments();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  SearchAndPagination (){
    this.dataSource = new MatTableDataSource(this.Appointments);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getAppointments() {
    this.AppointmentApi.getAppointments()
      .subscribe( (res : any) => {
          this.Appointments = res;
          this.SearchAndPagination ();
        },
        (err : any) => {
          this.toastr.warning((err.statusText ?err.statusText : (err.error ? err.error : "Internal Server Error")));

        }
      )
  }

  AddAppointmentButton(){
    this.ShowAddbutton = true;
    this.formValues.reset();
  }

  formValues = new FormGroup({
    appointmentType: new FormControl('', [Validators.required]),
    appointmentStartTime: new FormControl('', [Validators.required]),
    isActive : new FormControl(''),
  });

  get appointmentType(): any {
    return this.formValues.get('appointmentType');
  }

  get appointmentStartTime(): any {
    return this.formValues.get('appointmentStartTime');
  }

  get isActive(): any {
    return this.formValues.get('isActive');
  }


  validation() {

    if (this.formValues.status == "VALID") {
      return true;
    }
     return false;
  }

  //Start Get All Details
  getDetails() {
    this.AppointmentModule.id = this.AppointmentModule.id ? this.AppointmentModule.id :null;
    if(this.ShowAddbutton == true)
      this.AppointmentModule.appointmentStartTime =this.appointmentStartTime.value + ':00';
    else{
     // let Now =  this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
     // let time = new Date(Now + 'T' +this.appointmentStartTime.value);
     // let timeFormat =  this.datePipe.transform(time, 'HH:MM:SS');
      console.log(this.appointmentStartTime.value , this.AppointmentModule.appointmentStartTime )
      this.AppointmentModule.appointmentStartTime =
        (this.AppointmentModule.appointmentStartTime == this.appointmentStartTime.value ) ?
      this.AppointmentModule.appointmentStartTime  :this.appointmentStartTime.value + ':00';
    }
    this.AppointmentModule.appointmentType = this.appointmentType?.value;
    this.AppointmentModule.isActive = (this.ShowAddbutton == true) ? true :
      (this.isActive?.value != null && this.isActive?.value != false ) ? true : false;
    this.AppointmentModule.company = { "id" :  environment.Token };
  }
  //End Get All Details

  //Start Save Appointment
  SaveAppointment() {
    this.AppointmentModule = new AppointmentModule;
     console.log(this.AppointmentModule);
      if (this.validation()) {
        this.getDetails();
        this.AppointmentApi.PostAppointments(this.AppointmentModule)
          .subscribe((res : any) => {
              this.toastr.success('Added Successfully');
              let ref = document.getElementById('close-button');
              ref?.click();
              this.AppointmentModule.id = res.id;
              this.Appointments.push(this.AppointmentModule);
              this.SearchAndPagination ();
            },
            (err : any) => {
              console.log(err);
              this.toastr.warning(err.error ? err.error : "wrong in Server");
            }
          )
      } else {
        this.toastr.info('Please fill in the data correctly');
      }
  }
  //End Save Appointment


 public isActiveButton :boolean = true;
  onEdit(row : any){
    this.ShowAddbutton = false;
    this.AppointmentModule = new AppointmentModule;
    this.AppointmentModule.id = Number(row.id);
    this.formValues.controls['appointmentStartTime'].setValue(row.appointmentStartTime);
    this.AppointmentModule.appointmentStartTime = row.appointmentStartTime;
    this.formValues.controls['appointmentType'].setValue(row.appointmentType);
    this.formValues.controls['isActive'].setValue(row.isActive);
    this.isActiveButton =row.isActive;
  }

  UpdateAppointment() {
    this.getDetails();
    if (this.validation()) {
        this.AppointmentApi.UpdateAppointments(this.AppointmentModule)
          .subscribe((res:any) => {
              this.toastr.success('Updated Successfully');
              let ref = document.getElementById('close-button');
              ref?.click();
             this.Appointments.splice(this.hepler.findIndex(this.Appointments ,this.AppointmentModule.id),1);
             this.Appointments.push(this.AppointmentModule);
              this.SearchAndPagination ();
              //   this.getAppointments();
            },
            (err:any) => {
              this.toastr.warning(err.error ? err.error : "wrong in Server");
            }
          )
      } else {
        this.toastr.info('Please fill in the data correctly');
      }

  }

  DeleteAppointment(id:number){
    this.AppointmentApi.DeleteAppointment(id)
      .subscribe((res:any) =>{
          this.toastr.success('Delete Successfully');
          this.Appointments.splice(this.hepler.findIndex(this.Appointments ,id),1);
          this.SearchAndPagination ();
        },
        (err : any)=>{
          this.toastr.warning(err.statusText);
        }
      )
  }



}

