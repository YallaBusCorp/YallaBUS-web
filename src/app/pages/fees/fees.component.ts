import {AfterViewInit, Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../servies/Employee/employee.service";
import {FeesService} from "../../servies/fees/fees.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css']
})
export class FeesComponent implements OnInit {
  //AfterViewInit
  filterFees : any = "All";
  PendingFees : any;
  ApprovedFees : any;
  NotApprovedFees : any;
  AllFees : any;
  constructor(
    private api: FeesService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    //this.getPendingfees();
    this.getApprovedfees();
    this.getAllfees();
    this.getNotApprovedfees();

  }
  // ngAfterViewInit(){
  //   this.getApprovedfees();
  //   this.getAllfees();
  // }

  private getPendingfees() {
    this.api.getPendingfees()
      .subscribe( (res : any) => {
          this.PendingFees = res;
        },
        (err : any) => {
          this.toastr.warning((err.statusText ?err.statusText : (err.error ? err.error : "Internal Server Error")));
        }
      )
  }
  private getApprovedfees() {
    this.api.getApprovedfees()
      .subscribe( (res : any) => {
          this.ApprovedFees = res;
          console.log(this.ApprovedFees )

        },
        (err : any) => {
          this.toastr.warning((err.statusText ?err.statusText : (err.error ? err.error : "Internal Server Error")));
        }
      )
  }
  private getAllfees() {
    this.api.getAllfees()
      .subscribe( (res : any) => {
          this.AllFees = res;
        },
        (err : any) => {
          this.toastr.warning((err.statusText ?err.statusText : (err.error ? err.error : "Internal Server Error")));
        }
      )
  }
  private getNotApprovedfees() {
    this.api.getNotApprovedfees()
      .subscribe( (res : any) => {
          this.NotApprovedFees = res;
        },
        (err : any) => {
          this.toastr.warning((err.statusText ?err.statusText : (err.error ? err.error : "Internal Server Error")));
        }
      )
  }
  ApprovedFee(id : any,bool : boolean) {
    this.api.ApprovedFee(id,bool)
      .subscribe(() =>{
          if(bool ==true)
            this.toastr.success('Approved Successfully');
          else
            this.toastr.success(' Not Approved Successfully');

          this.getPendingfees();
          this.getApprovedfees();
          this.getAllfees();

        },
        (err : any)=>{
          this.toastr.warning(err.statusText);
        }
      )
  }
}
