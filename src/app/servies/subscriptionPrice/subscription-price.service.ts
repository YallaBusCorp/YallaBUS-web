import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppointmentModule} from "../../models/appointment/appointment.module";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {SubscriptionPriceModule} from "../../models/subscription-price/subscription-price.module";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionPriceService {

  constructor(private http: HttpClient) { }

  getSubscriptionPrice() {
    return this.http.get<SubscriptionPriceModule>(`${environment.UrlWebsite}/subscriptionPrice/company/get-all?id=`
      +environment.Token
    ).pipe(
      map((res:any)=>{
          return res;

        }
      ));
  }

  PostSubscriptionPrice(data:any) {
    return this.http.post<AppointmentModule>(`${environment.UrlWebsite}/subscriptionPrice/save-subscriptionPrice`,
      data
    )
      .pipe(map((res:any)=>{
        return res;
      }));
  }
}
