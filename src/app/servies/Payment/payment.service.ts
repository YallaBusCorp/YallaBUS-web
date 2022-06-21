import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppointmentModule} from "../../models/appointment/appointment.module";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {PaymentModule} from "../../models/payment/payment.module";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  getPayments() {
    return this.http.get<PaymentModule>(`${environment.UrlWebsite}/payment/company/get-all?id=`
      +environment.Token
    ).pipe(
      map((res:any)=>{
          return res;

        }
      ));
  }
}
