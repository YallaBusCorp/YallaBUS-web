import {EmployeeModule} from "../employee.module";

export class DriverModule {
  "id" : any | null;
  "driverLicenceNumber": string | null;
  "driverLicenceExpirationDate": Date  | null;
  "driverLicenceExpirationDateAlarm": Date  | null;
  "emp": EmployeeModule;
}

