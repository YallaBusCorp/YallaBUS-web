import {Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from "../../servies/Employee/employee.service";
import {ToastrService} from "ngx-toastr";
import {DatePipe} from "@angular/common";
import {HelperService} from "../../Helper/helper.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminModule} from "../../models/employee/admin/admin.module";
import {CompanyService} from "../../servies/Company/company.service";
import {CompanyModule} from "../../models/company/company.module";
import {environment} from "../../../environments/environment";
import {EmployeeModule} from "../../models/employee/employee.module";


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  Companies: any;
  AdminModule: AdminModule | any;
  EmployeeModule: EmployeeModule | any;
  CompanyModule: CompanyModule | any;
  ShowAddbutton : boolean =true;
  constructor(
    private api: EmployeeService,
    private CompanyService: CompanyService,
    private toastr: ToastrService,
    private  datePipe:DatePipe,
    private hepler : HelperService
  ) { }
  data : any = [];
  ngOnInit(): void {
    this.getCompanies();
  }
  getCompanies() {
    this.CompanyService.getAll()
      .subscribe( (res : any) => {
          this.Companies = res;
        },
        (err : any) => {
          this.toastr.warning((err.statusText ?err.statusText : (err.error ? err.error : "Internal Server Error")));

        }
      )
  }
  AddButton() {
    this.ShowAddbutton = true;
    this.formValues.reset();
  }
  formValues = new FormGroup({
    companyName: new FormControl('', [Validators.required]),
    companyPhone: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    empNationalId: new FormControl('', [Validators.required]),
    companyLocation: new FormControl('', [Validators.required]),
    facebookURL: new FormControl('', [Validators.required]),
    empStartDate: new FormControl('', [Validators.required]),
  });
  get companyName(): any {
    return this.formValues.get('companyName');
  }
  get companyPhone(): any {
    return this.formValues.get('companyPhone');
  }
  get description(): any {
    return this.formValues.get('description');
  }
  public get empNationalId(): any {
    return this.formValues.get('empNationalId');
  }
  get companyLocation(): any {
    return this.formValues.get('companyLocation');
  }
  get facebookURL(): any {
    return this.formValues.get('facebookURL');
  }
  get empStartDate(): any {
    return this.formValues.get('empStartDate');
  }
  //Start Get All Details
  getDetails(){
    this.CompanyModule.id = null;
    this.CompanyModule.companyPhone =   this.companyPhone.value;
    this.CompanyModule.companyName =  this.companyName.value;
    this.CompanyModule.description =   this.description.value;
    this.CompanyModule.companyLocation =   this.companyLocation.value;
    this.CompanyModule.facebookURL =   this.facebookURL.value;
    this.CompanyModule.imgURL =   '';



    this.EmployeeModule.id = this.EmployeeModule.id ? this.EmployeeModule.id :null;
      this.EmployeeModule.empCode =  '112555';
    this.EmployeeModule.empPhone =   this.companyPhone.value;
    this.EmployeeModule.empName =   this.companyName.value;
    this.EmployeeModule.empNationalId =  this.empNationalId.value;
    this.EmployeeModule.empSalary =  1000;
    this.EmployeeModule.empStartDate =  this.empStartDate.value;
    this.EmployeeModule.empLk = { "id" : 1 };

    this.AdminModule.id = null;
    this.AdminModule.emp = this.EmployeeModule;
    this.AdminModule.username = this.companyName.value;
    this.AdminModule.password = "123456789";
  }
  //End Get All Details

  SaveCompany() {
    this.CompanyModule = new CompanyModule;
    this.EmployeeModule = new EmployeeModule;
    this.AdminModule = new AdminModule;
    if (this.formValues.status == "VALID") {
      this.getDetails();
      this.PostCompany();
      //this.PostAdmin();
      console.log(this.CompanyModule )
      console.log(this.AdminModule )
    } else {
      this.toastr.info('Please fill in the data correctly');
    }
  }
  PostCompany(){
    this.CompanyService.PostCompany(this.CompanyModule)
      .subscribe((res : any) => {
          this.toastr.success('Added Successfully');
          let ref = document.getElementById('close-button');
          ref?.click();
          this.EmployeeModule.company = { "id" :   res.id };
          this.Companies.push(this.CompanyModule);
          this.PostAdmin();
        },
        (err : any) => {
          console.log(err);
          this.toastr.warning(err.error.error ? err.error.error : "wrong in Server");
        }
      )
  }
  PostAdmin(){
    this.api.PostAdmin(this.AdminModule)
        .subscribe((res : any) => {
            //this.toastr.success('Added Successfully');
          },
          (err : any) => {
            console.log(err);
            this.toastr.warning(err.error.error ? err.error.error : "wrong in Server");
          }
        )
    }
}
