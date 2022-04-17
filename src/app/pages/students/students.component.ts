import { Component, OnInit } from '@angular/core';
import {StudentService} from "../../servies/Student/student.service";
import {StudentInterface, StudentModule} from "../../models/student/student.module";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TownService} from "../../servies/Towns/town.service";
import {UniversityService} from "../../servies/Universities/university.service";
import {ToastrService} from "ngx-toastr";
import {DatePipe} from "@angular/common";
import {environment} from "../../../environments/environment";
import * as firebase from 'firebase';
import {auth} from "firebase";

// import {getAuth} from "@angular/fire/auth";
// import {signOut} from "@angular/fire/auth";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: any;
  Towns: any;
  Universities: any;
  theDateNow: any = new Date;
  StudentModule: StudentModule | any;
  ShowAddbutton : boolean =true;
  showOTPbutton : boolean = true;
  constructor(
    private StudentApi: StudentService,
    private TownsApi: TownService,
    private toastr: ToastrService,
    private UniversityApi: UniversityService,
  ) {
  }

  windowRef: any;
  ngOnInit(): void {
    this.getStudents();
    this.getTwons();
    this.getUniversities();

    this.windowRef = this.StudentApi.windowRef;
    setTimeout(()=> {
      this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
        'size': 'invisible'
      });
    },2000);

  }


  getStudents() {
    this.StudentApi.getStudents(Number(environment.Token))
      .subscribe(res => {
          this.students = res;
        },
        err => {
          this.toastr.warning(err);
        }
      )
  }

  getTwons() {
    this.TownsApi.getTowns(Number(environment.Token))
      .subscribe(res => {
          this.Towns = res;
        },
        err => {
          this.toastr.warning(err);
        }
      )
  }

  getUniversities() {
    this.UniversityApi.getUniversities(Number(environment.Token))
      .subscribe(res => {
          this.Universities = res;
        },
        err => {
          this.toastr.warning(err);
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

  validation(Stu: StudentModule) {
    function validationEmpty(col: string) {
      return col != null && col.length > 0 ? true : false;
    }
    function validationNull(col: any) {
      return col != null ? true : false;
    }
    if (validationEmpty(Stu.stdName) &&
      validationEmpty(Stu.stdPhone) &&
      validationEmpty(this.codeUser || Stu.code) &&
      validationNull(Stu.town.id) &&
      validationNull(Stu.company.id) &&
      validationNull(Stu.university.id) &&
      validationNull(Stu.endSubscriptionDate)
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
      this.StudentModule.code = this.StudentModule.code ? this.StudentModule.code : this.codeUser;
      this.StudentModule.stdPhone = this.stdPhone?.value[0] != '+' &&this.stdPhone?.value[1] != '2'  ?
                                            "+2" + this.stdPhone?.value : this.stdPhone?.value ;
      this.StudentModule.town = { "id" : this.town?.value };
      this.StudentModule.university = { "id" : this.university?.value };
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
    this.StudentModule = new StudentModule;
    this.getDetails();
    if (this.codeUser != null) {
      if (this.validation(this.StudentModule)) {
        this.StudentApi.PostStudents(this.StudentModule)
          .subscribe(res => {
              this.toastr.success('Added Successfully');
              let ref = document.getElementById('close-button');
              ref?.click();
              this.getStudents();
            },
            res => {
              console.log(res);
              this.toastr.warning(res.error ? res.error.error : "wrong in Server");
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
    this.StudentModule.code = row.code;
    this.formValues.controls['town'].setValue(row.town.id);
    this.formValues.controls['university'].setValue(row.university.id);
    this.formValues.controls['endSubscriptionDate'].setValue(row.endSubscriptionDate);
  }
  UpdateStudent() {
    this.getDetails();
      // console.log(this.StudentModule.stdPhone, this.PhoneRow);
    if (this.StudentModule.stdPhone == this.PhoneRow) {
      if (this.validation(this.StudentModule)) {
        this.StudentApi.UpdateStudents(this.StudentModule)
          .subscribe(res => {
              this.toastr.success('Updated Successfully');
              let ref = document.getElementById('close-button');
              ref?.click();
              this.getStudents();
            },
            res => {
              console.log(res);
              this.toastr.warning(res.error ? res.error.error : "wrong in Server");
            }
          )
      } else {
        this.toastr.info('Please fill in the data correctly');
      }
    } else {
      this.toastr.info('Please finished Phone Validation correctly');
    }
  }

  DeleteStudent(id:number){
    this.StudentApi.DeleteStudent(id)
      .subscribe(res =>{
          this.toastr.success('Delete Successfully');
          this.getStudents();
        },
        (res : any)=>{
        console.log(res,id);
          this.toastr.warning(res.statusText);
        }
      )
  }



  codeUser: string | any = null;
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
    let code: string = this.OTP.value;
    this.windowRef.confirmationResult.confirm(code).then(
      (res: any) => {
        this.codeUser = res.user.uid;
        this.toastr.success('confirmation Result Successfully');
        console.log(res);
        auth().signOut().then(
          (result :any) => {
           // console.log(result, auth());
          //  this.toastr.success('sign Out Successfully');
          }).catch((error : any) => {
            this.toastr.info(error);
          }
        )
        // signOut(res.user.uid).then(() => {
        // });
      }).catch((err: any) => {
      console.log(err);
    });


  }

  OTPButtonShow() {
    this.showOTPbutton = true;
  }
}
