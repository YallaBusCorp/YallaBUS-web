import { Injectable } from '@angular/core';
import {AppointmentModule} from "../../models/appointment/appointment.module";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {empLkInterface, EmployeeModule} from "../../models/employee/employee.module";
import {DriverModule} from "../../models/employee/driver/driver.module";
import {AdminModule} from "../../models/employee/admin/admin.module";
import {StudentModule} from "../../models/student/student.module";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getCountEmployees() {
    return this.http.get<StudentModule>(`${environment.UrlWebsite}/employee/get-count/company/active?id=`
      +environment.Token
    ).pipe(
      map((res:any)=>{
          return res;
        }
      ));
  }
  getSupervisors() {
    return this.http.get<EmployeeModule>(`${environment.UrlWebsite}/employee/company/supervisor/active?id=`
      +environment.Token
    ).pipe(
      map((res:any)=>{
          return res;

        }
      ));
  }
  getDrivers() {
    return this.http.get<DriverModule>(`${environment.UrlWebsite}/driverInfo/company/active?id=`
      +environment.Token
    ).pipe(
      map((res:any)=>{
          return res;

        }
      ));
  }
  getAvailableDrivers() {
    return this.http.get<DriverModule>(`${environment.UrlWebsite}/employee/company/driver/available?id=`
      +environment.Token
    ).pipe(
      map((res:any)=>{
          return res;

        }
      ));
  }

  getAdmins() {
    return this.http.get<AdminModule>(`${environment.UrlWebsite}/admin/company/active?id=`
      +environment.Token
    ).pipe(
      map((res:any)=>{
          return res;

        }
      ));
  }

  getLK_Employees() {
    return this.http.get<empLkInterface>(`${environment.UrlWebsite}/lkEmployee`).pipe(
      map((res:any)=>{
          return res;
        }
      ));
  }

  PostSuperVisor(data: any) {
    return this.http.post<EmployeeModule>(`${environment.UrlWebsite}/employee/save-employee`,
      data
    )
      .pipe(map((res:any)=>{
        return res;
      }));
  }
  UpdateSuperVisor(data:any) {
    return this.http.put<EmployeeModule>(`${environment.UrlWebsite}/employee/update-supervisor`,
      data
    )
      .pipe(map((res:any)=>{
        return res;
      }));
  }
  PostDriverInfo(data: any) {
    return this.http.post<DriverModule>(`${environment.UrlWebsite}/driverInfo/save-driverInfo`,
      data
    )
      .pipe(map((res:any)=>{
        return res;
      }));
  }
  UpdateDriverInfo(data:any) {
    return this.http.put<DriverModule>(`${environment.UrlWebsite}/driverInfo/update-driverInfo`,
      data
    )
      .pipe(map((res:any)=>{
        return res;
      }));
  }
  PostAdmin(data: any) {
    return this.http.post<AdminModule>(`${environment.UrlWebsite}/admin/save-admin`,
      data
    )
      .pipe(map((res:any)=>{
        return res;
      }));
  }
  UpdateAdmin(data:any) {
    return this.http.put<AdminModule>(`${environment.UrlWebsite}/admin/update-admin`,
      data
    )
      .pipe(map((res:any)=>{
        return res;
      }));
  }

  DeleteAppointment(id:number) {
    return this.http.put(`${environment.UrlWebsite}/employee/delete-employee?id=`+id,true)
      .pipe(map((res:any)=>{
            return res;
          },
          (err : any)=>{
            return err;
          }
        )
      );
  }
}
