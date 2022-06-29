import {Component, OnInit, ViewChild} from '@angular/core';
import {StudentService} from "../../servies/Student/student.service";
import {StudentInterface, StudentModule, SubscriptionRenew} from "../../models/student/student.module";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TownService} from "../../servies/Towns/town.service";
import {UniversityService} from "../../servies/Universities/university.service";
import {ToastrService} from "ngx-toastr";
import {DatePipe} from "@angular/common";
import {environment} from "../../../environments/environment";

import {FirebaseService} from "../../servies/firebase/firebase.service";
import {HelperService} from "../../Helper/helper.service";

import firebase from "firebase";
import initializeApp = firebase.initializeApp;
import getFirestore  = firebase.firestore;
import getAnalytics  = firebase.analytics;
import auth = firebase.auth;
import {LoginComponent} from "../login/login.component";
import {MatTableDataSource} from "@angular/material/table";
import {AppointmentInterface} from "../../models/appointment/appointment.module";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
let app;
if (!firebase.apps.length) {
  app = initializeApp(environment.firebase);
}else {
  app =  firebase.app(); // if already initialized, use that one
}
const analytisc = getAnalytics(app);
const db = getFirestore(app);

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: any ;
  Towns: any;
  Universities: any;
  theDateNow: any = new Date;
  StudentModule: StudentModule | any;
  ShowAddbutton : boolean =true;
  showOTPbutton : boolean = true;
  constructor(
    private StudentApi: StudentService,
    private FirebaseService : FirebaseService,
    private TownsApi: TownService,
    private toastr: ToastrService,
    private UniversityApi: UniversityService,
    private hepler : HelperService
  ) {
  }

  windowRef: any;
  ngOnInit(): void {
    this.getStudents();
    this.getTwons();
    this.getUniversities();
    this.windowRef = this.FirebaseService.windowRef;
    setTimeout(()=> {
      this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
        'size': 'invisible'
      });
    },2000);

  }
  isRecaptchaValid() {
    return (this.windowRef.recaptchaVerifier.getResponse(this.windowRef.recaptchaWidgetId).length > 0);
  }
  displayedColumns: string[] = ['id', 'stdName', 'stdPhone', 'universityName','endSubscriptionDate' ,'Action'];
  dataSource: MatTableDataSource<StudentInterface>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  SearchAndPagination(){
    this.dataSource = new MatTableDataSource(this.students);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  getStudents() {
    this.StudentApi.getStudents()
      .subscribe((res : any) => {
          this.students = res;
          this.SearchAndPagination();
        },
        (err : any) => {
          this.toastr.warning((err.statusText ? err.statusText :(err.status ? err.status:
            (err.error ? err.error : "Internal Server Error"))));

        }
      )
  }

  getTwons() {
    this.TownsApi.getTowns(Number(environment.Token))
      .subscribe((res : any) => {
          this.Towns = res;
        },
        (err : any) => {
          this.toastr.warning((err.statusText ? err.statusText :(err.status ? err.status:
            (err.error ? err.error : "Internal Server Error"))));
        }
      )
  }


  getUniversities() {
    this.UniversityApi.getUniversities(Number(environment.Token))
      .subscribe((res : any) => {
          this.Universities = res;

        },
        (err : any) => {
          this.toastr.warning((err.statusText ? err.statusText :(err.status ? err.status:
            (err.error ? err.error : "Internal Server Error"))));
        }
      )
  }

  AddStudentButton(){
    this.ShowAddbutton = true;
    this.showOTPbutton = true;
    this.formValues.reset();
  }

  formValues = new FormGroup({
    stdName: new FormControl('', [Validators.required]),
    OTP: new FormControl(),
    stdPhone: new FormControl('', [Validators.required]),
    university: new FormControl('', [Validators.required]),
    town: new FormControl('', [Validators.required]),
    endSubscriptionDate: new FormControl(null, [Validators.required]),
  });

  get stdName(): any {
    return this.formValues.get('stdName');
  }

  get OTP(): any {
    return this.formValues.get('OTP');
  }

  get stdPhone(): any {
    return this.formValues.get('stdPhone');
  }

  get university(): number | any {
    return this.formValues.get('university');
  }

  get town(): number | any {
    return this.formValues.get('town');
  }

  get endSubscriptionDate(): Date | any {
    return this.formValues.get('endSubscriptionDate');
  }

  codeUser: string | any ;

  validation(Stu: StudentModule) {
    function validationEmpty(col: any) {
      return col != null && col.length > 0 ? true : false;
    }
    function validationNull(col: any) {
      return col != null ? true : false;
    }
    if (this.formValues.status == "VALID" &&
      validationEmpty(this.codeUser || Stu.stdUid)
    ) {
      return true;
    }
    return false;

  }

  //Start Get All Details
  getDetails() {

    let SubscriptionDate = new Date(this.endSubscriptionDate.value);
    let pipe = new DatePipe('en-US');
     this.StudentModule.id = this.StudentModule.id ? this.StudentModule.id :null;
      this.StudentModule.stdName = this.stdName?.value;
      this.StudentModule.stdUid = this.StudentModule.stdUid ? this.StudentModule.stdUid : this.codeUser;
      this.StudentModule.stdPhone = this.stdPhone?.value[0] != '+' &&this.stdPhone?.value[1] != '2'  ?
                                            "+2" + this.stdPhone?.value : this.stdPhone?.value ;
    let  townName= this.hepler.searshItem(this.Towns , this.town?.value);
      // @ts-ignore
      this.StudentModule.town = this.town?.value ? { "id" : this.town?.value , "townName" : townName.townName }: null;
      let  universityName= this.hepler.searshItem(this.Universities , this.university?.value) ;

    // @ts-ignore
    this.StudentModule.university = this.university?.value ? { "id" : this.university?.value ,"universityName" : universityName.universityName }: null;
      this.StudentModule.company = { "id" :  environment.Token };
      this.StudentModule.endSubscriptionDate = this.endSubscriptionDate.value ?
            pipe.transform(
              (SubscriptionDate.setDate(SubscriptionDate.getDate() + 30)), 'yyyy-MM-dd') : null;
      this.StudentModule.isSubscribed = true;
      this.StudentModule.isActive = true;
  }
  //End Get All Details


  //Start Save Student
  SaveStudent() {
    if (this.codeUser != null) {
      this.StudentModule = new StudentModule;
      this.getDetails();
      if (this.validation(this.StudentModule)) {
        this.StudentApi.PostStudents(this.StudentModule)
          .subscribe((res : any) => {
              this.toastr.success('Added Successfully');
              let ref = document.getElementById('close-button');
              ref?.click();
              this.StudentModule.id = res.id;
              this.students.push(this.StudentModule);
              this.SearchAndPagination();
            },
            (err : any) => {
              console.log(err);
              this.toastr.warning(err.error ? err.error : "wrong in Server");
            }
          )
      } else {
        this.toastr.info('Please fill in the data correctly');
      }
    } else {
      this.toastr.info('Please finished Phone Validation correctly');
    }
  }
  //End Save Student
  PhoneRow : any;
  onEdit(row: any){
    this.showOTPbutton = false;
    this.ShowAddbutton = false;
    this.StudentModule = new StudentModule;
    this.StudentModule.id = Number(row.id);
    this.formValues.controls['stdName'].setValue(row.stdName);
    this.formValues.controls['stdPhone'].setValue(row.stdPhone);
    this.PhoneRow = row.stdPhone;
    this.StudentModule.stdUid = row.stdUid;
    this.formValues.controls['town'].setValue(row.town.id);
    this.formValues.controls['university'].setValue(row.university.id);

    let SubscriptionDate = new Date(row.endSubscriptionDate);
    let pipe = new DatePipe('en-US');
    this.formValues.controls['endSubscriptionDate'].setValue( row.endSubscriptionDate !=null ?
      pipe.transform(
        (SubscriptionDate.setDate(SubscriptionDate.getDate() - 30)), 'yyyy-MM-dd') : null);
  }
  UpdateStudent() {
    this.getDetails();
      if (this.validation(this.StudentModule)) {
        this.StudentApi.UpdateStudents(this.StudentModule)
          .subscribe((res : any) => {
              this.toastr.success('Updated Successfully');
              let ref = document.getElementById('close-button');
              ref?.click();
                this.students.splice(this.hepler.findIndex(this.students ,this.StudentModule.id),1);
                this.students.push(this.StudentModule);
                this.SearchAndPagination();
            },
            (err : any) => {
              console.log(err);
              this.toastr.warning(err.error ? err.error : "wrong in Server");
            }
          )
      } else {
        this.toastr.info('Please fill in the data correctly');
      }
    console.log(this.students);

  }

  DeleteStudent(id:number){
    this.StudentApi.DeleteStudent(id)
      .subscribe(res =>{
          this.toastr.success('Delete Successfully');
          this.students.splice(this.hepler.findIndex(this.students ,id),1);
          this.SearchAndPagination();
        },
        (err : any)=>{
          this.toastr.warning(err.statusText);
        }
      )
  }



  SendOTP() {
    let appVerifier = this.windowRef.recaptchaVerifier;
    if (this.stdPhone.value != null) {
      auth().signInWithPhoneNumber("+20" + this.stdPhone.value, appVerifier).then(
        (result :any) => {
          this.windowRef.confirmationResult = result;
          this.toastr.success('Send SMS To Your Number Successfully');
        }).catch((error : any) => {
        this.toastr.success(error);
      });
    } else {
      this.toastr.info('Please fill in the Phone correctly');
    }
    this.codeUser = null;
  }
  TestOTP() {
    if(this.OTP.value != null){
      let code: string = this.OTP.value;
      this.windowRef.confirmationResult.confirm(code).then(
        (res: any) => {
          db.collection("Users").doc(res.user.uid).set({
            "role" : 'Student',
            "UID" : res.user.uid
          });
          this.codeUser = res.user.uid;
          this.toastr.success('confirmation Result Successfully');
        }).catch((err: any) => {
        console.log(err);
      });
    }else{
      this.toastr.info('Please fill in the code correctly');
    }
    auth().signOut().then(
      (res2 :any) => {
        console.log(res2);
      }).catch((error : any) => {
        this.toastr.info(error);
      }
    )
  }

  OTPButtonShow() {
    this.showOTPbutton = true;
  }




  formValuesRenew = new FormGroup({
    endSubscriptionDate: new FormControl(null, [Validators.required]),
  });

  onRenew(id :number){
    this.StudentModule = new StudentModule;
    this.StudentModule.id = Number(id);
  }
  get endSubscriptionDateRenew(): Date | any {
    return this.formValuesRenew.get('endSubscriptionDate');
  }

  DataRenew :SubscriptionRenew | any;
  private getRenewDetails() {
    let SubscriptionDate = new Date(this.endSubscriptionDateRenew.value);
    let pipe = new DatePipe('en-US');
    this.DataRenew.std = {
    "id" : this.StudentModule.id ? this.StudentModule.id :null,
    "endSubscriptionDate" : this.endSubscriptionDateRenew.value ?
      pipe.transform(
        (SubscriptionDate.setDate(SubscriptionDate.getDate() + 30)), 'yyyy-MM-dd') : null,
      "isSubscribed" : true,
      "isActive" : true
    }
    this.StudentModule.id = this.DataRenew.std.id;
    this.StudentModule.SubscriptionDate = this.DataRenew.std.endSubscriptionDate;
  }


  RenewStudent() {
    this.DataRenew = new SubscriptionRenew;
    this.getRenewDetails();
    if (this.formValuesRenew.status == "VALID") {
      this.StudentApi.RenewStudents(this.DataRenew)
        .subscribe((res : any) => {
            this.toastr.success('Renew Student Successfully');
            let ref = document.getElementById('close-button-Renew');
            ref?.click();
            let index = this.hepler.findIndex(this.students ,this.StudentModule.id);
            this.students[index].endSubscriptionDate = this.DataRenew.std.endSubscriptionDate;
            this.students[index].isSubscribed = this.DataRenew.std.isSubscribed;
            this.students[index].isActive = this.DataRenew.std.isActive;
            this.SearchAndPagination();
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
}
