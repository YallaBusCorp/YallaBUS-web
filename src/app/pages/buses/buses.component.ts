import { Component, OnInit } from '@angular/core';
import {BusService} from "../../servies/Bus/Bus.service";
import {ToastrService} from "ngx-toastr";
import * as firebase from "firebase";
import {environment} from "../../../environments/environment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {auth} from "firebase";
import {BusModule} from "../../models/bus/bus.module";
import {FirebaseService} from "../../servies/firebase/firebase.service";

@Component({
  selector: 'app-buses',
  templateUrl: './buses.component.html',
  styleUrls: ['./buses.component.css']
})
export class BusesComponent implements OnInit {

  buses: any;
  theDateNow: any = new Date;
  BusModule: BusModule| any;
  ShowAddbutton : boolean =true;
  showOTPbutton : boolean = true;
  constructor(
    private BusApi: BusService,
    private toastr: ToastrService,
    private FirebaseService : FirebaseService,
  ) {
  }

  windowRef: any;
  ngOnInit(): void {
    this.getbus();
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


  getbus() {
    this.BusApi.getBuses()
      .subscribe((res : any) => {
          this.buses = res;
        },
        (err : any) => {
          this.toastr.warning((err.statusText ? err.statusText :(err.status ? err.status:
            (err.error ? err.error : "Internal Server Error"))));

        }
      )
  }


  AddBusButton(){
    this.ShowAddbutton = true;
    this.showOTPbutton = true;
    this.formValues.reset();
  }

  formValues = new FormGroup({
    busCode: new FormControl('', ),
    OTP: new FormControl(),
    phone: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    capacity: new FormControl('', [Validators.required]),
    busLicenceNumber: new FormControl(null, [Validators.required]),
    busLicenceExpirationDate: new FormControl(null, [Validators.required]),
  });

  get busCode(): any {
    return this.formValues.get('busCode');
  }
  get OTP(): any {
    return this.formValues.get('OTP');
  }
  get phone(): any {
    return this.formValues.get('phone');
  }
  get model():  any {
    return this.formValues.get('model');
  }
  get capacity(): any {
    return this.formValues.get('capacity');
  }
  get busLicenceExpirationDate(): Date | any {
    return this.formValues.get('busLicenceExpirationDate');
  }
  get busLicenceNumber(): any {
    return this.formValues.get('busLicenceNumber');
  }

  codeUser: string | any ;

  validation(bus: BusModule) {
    function validationEmpty(col: any) {
      return col != null && col.length > 0 ? true : false;
    }

    if (this.formValues.status == "VALID" &&
      validationEmpty(this.codeUser || bus.busCode)
    ) {
      return true;
    }
    return false;

  }

  //Start Get All Details
  getDetails() {
    let pipe = new DatePipe('en-US');
    this.BusModule.id = this.BusModule.id ? this.BusModule.id :null;
    this.BusModule.model = this.model?.value;
    this.BusModule.capacity = this.capacity?.value;
    this.BusModule.busLicenceNumber = this.busLicenceNumber?.value;
    this.BusModule.busLicenceExpirationDate = this.busLicenceExpirationDate?.value;
    this.BusModule.busCode = this.BusModule.busCode ? this.BusModule.busCode : this.codeUser;
    this.BusModule.phone = this.phone?.value[0] != '+' &&this.phone?.value[1] != '2'  ?
      "+2" + this.phone?.value : this.phone?.value ;
    this.BusModule.company = { "id" :  environment.Token };
    this.BusModule.isActive = true;
    this.BusModule.active = true;
  }
  //End Get All Details

  //Start Save Bus
  SaveBus() {
    this.BusModule = new BusModule;
    this.getDetails();
    if (this.codeUser != null) {
      if (this.validation(this.BusModule)) {
        this.BusApi.PostBus(this.BusModule)
          .subscribe((res : any) => {
              this.toastr.success('Added Successfully');
              let ref = document.getElementById('close-button');
              ref?.click();
              this.getbus();
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
  //End Save Bus
  onEdit(row: any){
    this.showOTPbutton = false;
    this.ShowAddbutton = false;
    this.BusModule = new BusModule;
    this.BusModule.id = Number(row.id);
    this.formValues.controls['phone'].setValue(row.phone);
    this.formValues.controls['model'].setValue(row.model);
    this.BusModule.busCode = row.busCode;
    this.formValues.controls['capacity'].setValue(row.capacity);
    this.formValues.controls['busLicenceNumber'].setValue(row.busLicenceNumber);
    this.formValues.controls['busLicenceExpirationDate'].setValue(row.busLicenceExpirationDate);
  }
  UpdateBus() {
    this.getDetails();
    console.log(this.BusModule);
    if (this.validation(this.BusModule)) {
      this.BusApi.UpdateBus(this.BusModule)
        .subscribe((res : any) => {
            this.toastr.success('Updated Successfully');
            let ref = document.getElementById('close-button');
            ref?.click();
            this.getbus();
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

  DeleteBus(id:number){
    this.BusApi.DeleteBus(id)
      .subscribe(res =>{
          this.toastr.success('Delete Successfully');
          this.getbus();
        },
        (err : any)=>{
          this.toastr.warning(err.statusText);
        }
      )
  }



  SendOTP() {
    let appVerifier = this.windowRef.recaptchaVerifier;
    if (this.phone.value != null) {
      auth().signInWithPhoneNumber("+20" + this.phone.value, appVerifier).then(
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
             console.log(result, auth());
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
