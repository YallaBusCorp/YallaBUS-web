import {StudentModule} from "../student/student.module";
import {TownModule} from "../town/town.module";
// @ts-ignore
import {UniversityModule} from "../university/university.module";

export class PaymentModule {
    "id":  any | null;
   "std": StudentModule;
    "town": TownModule;
    "university": UniversityModule;
    "stdName":string;
    "stdPhone":string;
    "endSubscriptionDate": Date;
    "isSubscribed": boolean;
    "stdUid": string;
    "isActive": boolean;
    "paymentStartDate": Date;
    "paymentEndDate": Date;
    "paymentCode": string | null;
    "paymentPrice": number;
    "paymentMethodType": string;
}
