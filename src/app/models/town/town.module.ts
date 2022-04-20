import {CompanyModule} from "../company/company.module";

export class TownModule {
  "id" : any | null;
  "townName": String;
  "isActive" : boolean;
  "company": CompanyModule;
}

