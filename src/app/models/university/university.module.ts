import {CompanyModule} from "../company/company.module";

export class UniversityModule {
  "id" : any | null;
  "universityName": String;
  "isActive" : boolean;
  "company": CompanyModule;
}
