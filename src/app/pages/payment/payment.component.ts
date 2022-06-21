import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {PaymentService} from "../../servies/Payment/payment.service";
import {PaymentModule} from "../../models/payment/payment.module";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  Payments: any;
  theDateNow: any = new Date;
  PaymentModule: PaymentModule | any;
  ShowAddbutton : boolean =true;
  constructor(
    private PaymentApi: PaymentService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.getPayments();
  }


  getPayments() {
    this.PaymentApi.getPayments()
      .subscribe( (res : any) => {
          this.Payments = res;

        },
        (err : any) => {
          this.toastr.warning((err.statusText ?err.statusText : (err.error ? err.error : "Internal Server Error")));

        }
      )
  }


}
