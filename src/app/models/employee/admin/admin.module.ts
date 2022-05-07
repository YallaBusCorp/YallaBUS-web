import {EmployeeModule} from "../employee.module";

export class AdminModule {
  "id" : any | null;
  "emp": EmployeeModule;
  "username": string | null;
  "password": string  | null;
  "accessToken": string  | null;
}

