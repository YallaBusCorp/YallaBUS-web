import {CompanyModule} from "../company/company.module";

export class EmployeeModule {
  "empCode": string;
  "id" : any | null;
  "empName": string;
  "empNationalId": string;
  "empPhone": string;
  "empSalary": string;
  "empStartDate": Date | null;
  "empEndDate":  Date | null;
  "company": CompanyModule;
  "empLk": empLkInterface;
}
export interface empLkInterface {
  "id": number,
  "lkName": string,

}
