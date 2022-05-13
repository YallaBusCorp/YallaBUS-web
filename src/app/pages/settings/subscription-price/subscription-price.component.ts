import { Component, OnInit } from '@angular/core';
import {AppointmentService} from "../../../servies/Appointments/appointment.service";
import {ToastrService} from "ngx-toastr";
import {DatePipe} from "@angular/common";
import {SubscriptionPriceService} from "../../../servies/subscriptionPrice/subscription-price.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {SubscriptionPriceModule} from "../../../models/subscription-price/subscription-price.module";

@Component({
  selector: 'subscription-price',
  templateUrl: './subscription-price.component.html',
  styleUrls: ['./subscription-price.component.css']
})
export class SubscriptionPriceComponent implements OnInit {
  subscriptionPrices: any;
  SubscriptionPriceModule: SubscriptionPriceModule | any;

  constructor(
    private api:SubscriptionPriceService ,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.getSubscriptionPrice();
  }


  getSubscriptionPrice() {
    this.api.getSubscriptionPrice()
      .subscribe( (res : any) => {
          this.subscriptionPrices = res;
        },
        (err : any) => {
          this.toastr.warning((err.statusText ?err.statusText : (err.error ? err.error : "Internal Server Error")));
        }
      )
  }

  AddNewsubscription() {
    this.formValues.reset();
  }
  formValues = new FormGroup({
    subscriptionPrice: new FormControl('', [Validators.required]),
  });
  get subscriptionPrice(): any {
    return this.formValues.get('subscriptionPrice');
  }
  validation() {
    if (this.formValues.status == "VALID") {
      return true;
    }
    return false;
  }
  //Start Get All Details
  getDetails() {

    this.SubscriptionPriceModule.id = null;
    this.SubscriptionPriceModule.subscriptionPrice = this.subscriptionPrice?.value;
    this.SubscriptionPriceModule.company = { "id" :  environment.Token };
  }
  //End Get All Details

  SaveSubscriptionPrice() {
    this.SubscriptionPriceModule = new SubscriptionPriceModule;
    this.getDetails();
    if (this.validation()) {
      this.api.PostSubscriptionPrice(this.SubscriptionPriceModule)
        .subscribe((res : any) => {
            this.toastr.success('Added Successfully');
            let ref = document.getElementById('close-button');
            ref?.click();
            this.getSubscriptionPrice();
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
