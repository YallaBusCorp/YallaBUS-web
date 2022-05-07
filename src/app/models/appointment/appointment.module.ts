import {CompanyModule} from "../company/company.module";

export class AppointmentModule {
  "id" : any | null;
  "appointmentStartTime": string;
  "appointmentType": string;
  "isActive" : boolean;
  "company": CompanyModule;
}
export interface AppointmentInterface {
  "id" : any | null;
  "appointmentStartTime": string;
  "appointmentType": string;
  "isActive" : boolean;
  "company": CompanyModule;
}

