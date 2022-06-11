import {CompanyModule} from "../company/company.module";

export class BusModule {
  "id" : any | null;
  "busUid": string;
  "phone": string;
  "model" : string;
  "capacity": string;
  "busLicenceExpirationDate": Date;
  "busLicenceNumber" : string;
  "company": CompanyModule;
  "isActive" : boolean;
  "active" : boolean;

}
