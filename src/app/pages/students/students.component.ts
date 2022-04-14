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
  StudentModule: StudentInterface | any;

  constructor(
    private StudentApi: StudentService,
    private TownsApi: TownService,
    private toastr: ToastrService,
    private UniversityApi: UniversityService,
  ) {

  }

  windowRef: any;
  firebaseApp :any;
  ngOnInit(): void {
    this.firebaseApp = firebase.initializeApp(environment.firebase);
    this.windowRef = this.StudentApi.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible'
    });
    this.getStudents();
    this.getTwons();
    this.getUniversities();
  }


  getStudents() {
    this.StudentApi.getStudents(1)
      .subscribe(res => {
          //console.log(res);
          this.students = res;
          console.log(this.theDateNow);
        },
        err => {
          alert(err);
        }
      )
  }

  AddStudent() {

  }

  getTwons() {
    this.TownsApi.getTowns(1)
      .subscribe(res => {
          this.Towns = res;
        },
        err => {
          alert(err);
        }
      )
  }

  getUniversities() {
    this.UniversityApi.getUniversities(1)
      .subscribe(res => {
          this.Universities = res;
          // console.log(this.Universities);
        },
        err => {
          alert(err);
        }
      )
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


  getDetails() {
    let SubscriptionDate = new Date(this.endSubscriptionDate.value);
    let pipe = new DatePipe('en-US');
    this.StudentModule = {
      'id': null,
      'stdName': this.stdName?.value,
      'code': this.codeUser,
      'stdPhone': "+2" + this.stdPhone?.value,
      town: {
        id: this.town?.value
      }, university: {
        id: this.university?.value
      }, company: {
        id:  environment.Token
      },
      endSubscriptionDate: this.endSubscriptionDate.value ?
        pipe.transform(
          (SubscriptionDate.setDate(SubscriptionDate.getDate() + 30)), 'yyyy-MM-dd') : null,
      isSubscribed: true
    }
  }


  onSubmit() {
    this.StudentModule = new StudentModule;
    this.getDetails();
    // console.log(this.StudentModule);
    if (this.codeUser != null) {
      if (this.validation(this.StudentModule)) {
        this.StudentApi.PostStudents(this.StudentModule)
          .subscribe(res => {
              this.toastr.success('Added Successfully');
              let ref = document.getElementById('close-button');
              ref?.click();
              this.formValues.reset();
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

  validation(Stu: StudentModule) {
    function validationEmpty(col: string) {
      return col != null && col.length > 0 ? true : false;
    }

    function validationNull(col: any) {
      return col != null ? true : false;
    }

    if (validationEmpty(Stu.stdName) &&
      validationEmpty(Stu.stdPhone) &&
      validationEmpty(this.codeUser) &&
      validationNull(Stu.town.id) &&
      validationNull(Stu.company.id) &&
      validationNull(Stu.university.id) &&
      validationNull(Stu.endSubscriptionDate)
    ) {
      return true;
    }
    return false;

  }


  SendOTP() {
    let appVerifier = this.windowRef.recaptchaVerifier;
    if (this.stdPhone.value != null) {
      this.firebaseApp.auth().signInWithPhoneNumber("+20" + this.stdPhone.value, appVerifier).then(
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

  codeUser: string | any = null;

  TestOTP() {
    let code: string = this.OTP.value;
    this.windowRef.confirmationResult.confirm(code).then(
      (res: any) => {
        this.codeUser = res.user.uid;
        this.toastr.success('confirmation Result Successfully');
        console.log(res);
        // signOut(res.user.uid).then(() => {
        // });
      }).catch((err: any) => {
      console.log(err);
    });


  }


}
