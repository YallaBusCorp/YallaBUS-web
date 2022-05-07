import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EmployeeModule} from "../../models/employee/employee.module";
import {ToastrService} from "ngx-toastr";
import {DatePipe} from "@angular/common";
import {EmployeeService} from "../../servies/Employee/employee.service";
import {environment} from "../../../environments/environment";
import {AdminModule} from "../../models/employee/admin/admin.module";
import {DriverModule} from "../../models/employee/driver/driver.module";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  SuperVisors: any;
  Admins: any;
  Drivers: any;
  LK_Employees: any;
  EmployeeModule: EmployeeModule | any;
  AdminModule: AdminModule | any;
  DriverModule: DriverModule | any;
  ShowAddbutton : boolean =true;
  valueempLk : any;
  constructor(
    private api: EmployeeService,
    private toastr: ToastrService,
    private  datePipe:DatePipe,
  ) { }

  ngOnInit(): void {
    this.getSuperVisors();
    this.getAdmins();
    this.getDrivers();
    this.getLK_Employees();
  }
  getSuperVisors() {
    this.api.getSupervisors()
      .subscribe( (res : any) => {
          this.SuperVisors = res;
        },
        (err : any) => {
          this.toastr.warning((err.statusText ?err.statusText : (err.error ? err.error : "Internal Server Error")));

        }
      )
  }
  getAdmins() {
    this.api.getAdmins()
      .subscribe( (res : any) => {
          this.Admins = res;
        },
        (err : any) => {
          this.toastr.warning((err.statusText ?err.statusText : (err.error ? err.error : "Internal Server Error")));

        }
      )
  }
  getDrivers() {
    this.api.getDrivers()
      .subscribe( (res : any) => {
          this.Drivers = res;

        },
        (err : any) => {
          this.toastr.warning((err.statusText ?err.statusText : (err.error ? err.error : "Internal Server Error")));

        }
      )
  }
  getLK_Employees() {
    this.api.getLK_Employees()
      .subscribe( (res : any) => {
          this.LK_Employees = res;

        },
        (err : any) => {
          this.toastr.warning((err.statusText ?err.statusText : (err.error ? err.error : "Internal Server Error")));

        }
      )
  }

  AddButton() {
    this.ShowAddbutton = true;
    this.valueempLk = null;
    this.formValues.reset();
  }
  formValues = new FormGroup({
    empCode: new FormControl('', [Validators.required]),
    empName: new FormControl('', [Validators.required]),
    empPhone: new FormControl('', [Validators.required]),
    empNationalId: new FormControl('', [Validators.required]),
    empSalary: new FormControl('', [Validators.required]),
    empLk: new FormControl('', [Validators.required]),
    empStartDate: new FormControl('', [Validators.required]),
    driverLicenceNumber: new FormControl('', ),
    driverLicenceExpirationDate: new FormControl('', ),
    username: new FormControl('', ),
    password: new FormControl('', ),
  });
  get empCode(): any {
    return this.formValues.get('empCode');
  }
  get empPhone(): any {
    return this.formValues.get('empPhone');
  }
  get empName(): any {
    return this.formValues.get('empName');
  }
  get empLk(): any {
    return this.formValues.get('empLk');
  }
  get empNationalId(): any {
    return this.formValues.get('empNationalId');
  }
  get empSalary(): any {
    return this.formValues.get('empSalary');
  }
  get empStartDate(): any {
    return this.formValues.get('empStartDate');
  }
  get driverLicenceNumber(): any {
    return this.formValues.get('driverLicenceNumber');
  }
  get driverLicenceExpirationDate(): any {
    return this.formValues.get('driverLicenceExpirationDate');
  }
  get username(): any {
    return this.formValues.get('username');
  }
  get password(): any {
    return this.formValues.get('password');
  }
  validation() {

    if (this.formValues.status == "VALID") {
      return true;
    }
    return false;
  }

  //Start Get All Details
  getEmpDetails(){
    this.EmployeeModule.id = this.EmployeeModule.id ? this.EmployeeModule.id :null;
    this.EmployeeModule.empCode =  this.EmployeeModule.empCode !=null ?
      this.EmployeeModule.empCode : this.empCode.value;
    this.EmployeeModule.empPhone =  this.EmployeeModule.empPhone !=null ?
      this.EmployeeModule.empPhone : this.empPhone.value;
    this.EmployeeModule.empName =  this.EmployeeModule.empName !=null ?
      this.EmployeeModule.empName : this.empName.value;
    this.EmployeeModule.empNationalId =  this.EmployeeModule.empNationalId !=null ?
      this.EmployeeModule.empNationalId : this.empNationalId.value;
    this.EmployeeModule.empSalary =  this.EmployeeModule.empSalary !=null ?
      this.EmployeeModule.empSalary : this.empSalary.value;
    this.EmployeeModule.empStartDate =  this.EmployeeModule.empStartDate !=null ?
      this.EmployeeModule.empStartDate : this.empStartDate.value;
    this.EmployeeModule.empLk = { "id" : this.empLk?.value };
    this.EmployeeModule.company = { "id" :  environment.Token };
  }
  getAdminDetails() {
    this.AdminModule.id = this.AdminModule.id ? this.AdminModule.id :null;
    this.AdminModule.emp = this.EmployeeModule;
    this.AdminModule.username =this.username?.value;
      this.AdminModule.password = this.password?.value;

  }
  getDriverDetails() {
    this.DriverModule.id = this.DriverModule.id ? this.DriverModule.id :null;
    this.DriverModule.emp = this.EmployeeModule;
    this.DriverModule.driverLicenceNumber =  this.driverLicenceNumber?.value;
    this.DriverModule.driverLicenceExpirationDate =  this.driverLicenceExpirationDate?.value;

  }
  //End Get All Details

  SaveEmployee() {
    this.EmployeeModule = new EmployeeModule;
    this.getEmpDetails();
    if (this.validation()) {
      if(this.empLk.value ==1){
        this.AdminModule = new AdminModule;
        this.getAdminDetails();
        this.PostAdmin();
      }else  if(this.empLk.value ==2){
        this.PostSupervisor();
      }else  if(this.empLk.value ==3){
        this.DriverModule = new DriverModule;
        this.getDriverDetails();
        this.PostDriver();
      }else{
        this.toastr.info('Please fill in the data correctly');
      }
    } else {
      this.toastr.info('Please fill in the data correctly');
    }
   }
  PostSupervisor(){
    this.api.PostSuperVisor(this.EmployeeModule)
      .subscribe((res : any) => {
          this.toastr.success('Added Successfully');
          let ref = document.getElementById('close-button');
          ref?.click();
          this.getSuperVisors();
        },
        (err : any) => {
          console.log(err);
          this.toastr.warning(err.error.error ? err.error.error : "wrong in Server");
        }
      )
  }
  PostAdmin(){
    if(
      this.username.value != null && this.password.value != null ||
      this.username.value >0  && this.password.value >0
    ){
      this.api.PostAdmin(this.AdminModule)
        .subscribe((res : any) => {
            this.toastr.success('Added Successfully');
            let ref = document.getElementById('close-button');
            ref?.click();
            this.getAdmins();
          },
          (err : any) => {
            console.log(err);
            this.toastr.warning(err.error.error ? err.error.error : "wrong in Server");
          }
        )
    }else{
      this.toastr.info('Please fill All data');
    }

  }
  PostDriver(){
    if(this.driverLicenceNumber.value != null  && this.driverLicenceExpirationDate.value != null){
    this.api.PostDriverInfo(this.DriverModule)
      .subscribe((res : any) => {
          this.toastr.success('Added Successfully');
          let ref = document.getElementById('close-button');
          ref?.click();
          this.getDrivers();
        },
        (err : any) => {
          console.log(err);
          this.toastr.warning(err.error.error ? err.error.error : "wrong in Server");
        }
      )
  }else{
      this.toastr.info('Please fill All data');
    }
  }




  onEdit(row : any){
    console.log(row);
    this.ShowAddbutton = false;
    this.EmployeeModule = new EmployeeModule();
    if(row.empLk && row.empLk.id ==2){
      this.valueempLk = 2;
      this.EmployeeModule.id = Number(row.id);
      this.formValues.controls['empCode'].setValue(row.empCode);
      this.formValues.controls['empName'].setValue(row.empName);
      this.formValues.controls['empPhone'].setValue(row.empPhone);
      this.formValues.controls['empNationalId'].setValue(row.empNationalId);
      this.formValues.controls['empLk'].setValue(row.empLk.id);
      this.formValues.controls['empStartDate'].setValue(row.empStartDate);
      this.formValues.controls['empSalary'].setValue(row.empSalary);
    }else{
      this.EmployeeModule.id = Number(row.emp.id);
      this.formValues.controls['empCode'].setValue(row.emp.empCode);
      this.formValues.controls['empName'].setValue(row.emp.empName);
      this.formValues.controls['empPhone'].setValue(row.emp.empPhone);
      this.formValues.controls['empNationalId'].setValue(row.emp.empNationalId);
      this.formValues.controls['empLk'].setValue(row.emp.empLk.id);
      this.formValues.controls['empStartDate'].setValue(row.emp.empStartDate);
      this.formValues.controls['empSalary'].setValue(row.emp.empSalary);
      if(row.emp.empLk &&row.emp.empLk.id == 3){
        this.DriverModule = new DriverModule();
        this.DriverModule.id = Number(row.id);
        this.formValues.controls['driverLicenceNumber'].setValue(row.driverLicenceNumber);
        this.formValues.controls['driverLicenceExpirationDate'].setValue(row.driverLicenceExpirationDate);
        this.valueempLk = 3;

      }else if(row.emp.empLk && row.emp.empLk.id == 1){
        this.AdminModule = new AdminModule();
        this.AdminModule.id = Number(row.id);
        console.log(this.AdminModule.id, row.id);

        this.formValues.controls['username'].setValue(row.username);
        this.formValues.controls['password'].setValue(row.password);
        this.valueempLk = 1;
      }

    }

  }
  UpdateEmployee() {
    this.getEmpDetails();

    if (this.validation()) {
      if(this.empLk.value ==1){
        this.getAdminDetails();
        this.UpdateAdmin();
        console.log(this.AdminModule);

      }else  if(this.empLk.value ==2){
        this.UpdateSupervisor();
        console.log(this.EmployeeModule);
      }else  if(this.empLk.value ==3){
        this.getDriverDetails();
        this.UpdateDriver();
        console.log(this.DriverModule);
      }else{
        this.toastr.info('Please fill in the data correctly');
      }
    } else {
      this.toastr.info('Please fill in the data correctly');
    }
  }
  UpdateSupervisor(){
    this.api.UpdateSuperVisor(this.EmployeeModule)
      .subscribe((res : any) => {
          this.toastr.success('Updated Successfully');
          let ref = document.getElementById('close-button');
          ref?.click();
          this.getSuperVisors();
        },
        (err : any) => {
          console.log(err);
          this.toastr.warning(err.error.error ? err.error.error : "wrong in Server");
        }
      )
  }
  UpdateAdmin(){
    if(
      this.username.value != null && this.password.value != null ||
      this.username.value >0  && this.password.value >0
    ){
      this.api.UpdateAdmin(this.AdminModule)
        .subscribe((res : any) => {
            this.toastr.success('Updated Successfully');
            let ref = document.getElementById('close-button');
            ref?.click();
            this.getAdmins();
          },
          (err : any) => {
            console.log(err);
            this.toastr.warning(err.error.error ? err.error.error : "wrong in Server");
          }
        )
    }else{
      this.toastr.info('Please fill All data');
    }

  }
  UpdateDriver(){
    if(this.driverLicenceNumber.value != null  && this.driverLicenceExpirationDate.value != null){
      this.api.UpdateDriverInfo(this.DriverModule)
        .subscribe((res : any) => {
            this.toastr.success('Updated Successfully');
            let ref = document.getElementById('close-button');
            ref?.click();
            this.getDrivers();
          },
          (err : any) => {
            console.log(err);
            this.toastr.warning(err.error.error ? err.error.error : "wrong in Server");
          }
        )
    }else{
      this.toastr.info('Please fill All data');
    }
  }

  changeempLk() {
    this.valueempLk =Number(this.empLk.value);
  }

  DeleteEmployee(row : any){
    this.api.DeleteAppointment((row.empLk && row.empLk.id ==2) ? row.id : row.emp.id)
      .subscribe((res:any) =>{
          this.toastr.success('Delete Successfully');
          if((row.empLk && row.empLk.id ==2))
            this.getSuperVisors();
          else{
            if((row.emp.empLk.id ==3))
              this.getDrivers();
            else if((row.emp.empLk.id ==1))
              this.getAdmins();
            else
              this.toastr.warning("sorry Can't Delete");

          }

        },
        (err : any)=>{
          this.toastr.warning(err.statusText);
        }
      )
  }
}
